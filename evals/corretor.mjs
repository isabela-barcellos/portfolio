// Lógica de correção determinística (sem LLM como juiz). Usada por avaliar.mjs e testada em tests/corretor.test.mjs.
const numeros = (t) => (t.match(/\d+(?:[.,]\d+)?/g) ?? []).map((n) => n.replace(",", "."));
const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;

export function entradaDo(fatos, c) {
  return [
    `FATOS:\n${fatos}`,
    c.extra && `INFORMAÇÕES ADICIONAIS:\n${c.extra}`,
    `PEDIDO:\n${c.pedido}`,
    "Responda apenas com o texto para a página, sem comentários antes ou depois.",
  ].filter(Boolean).join("\n\n");
}

export function verificar(fatos, c, saida) {
  const v = c.verifica;
  const entrada = entradaDo(fatos, c);
  switch (v.tipo) {
    case "sem_numeros_novos": {
      const permitidos = new Set(numeros(entrada));
      // Marcadores de lista ("1.", "2)") não contam como número inventado.
      const novos = numeros(saida.replace(/^\s*\d+[.)]\s+/gm, "")).filter((n) => !permitidos.has(n));
      return { ok: novos.length === 0, motivo: novos.length ? `números que não estavam nos fatos: ${[...new Set(novos)].join(", ")}` : "" };
    }
    case "sem_datas": {
      // Sem número novo (anos, dias) e sem nome de mês: "em março" também é data inventada.
      const permitidos = new Set(numeros(entrada));
      const novos = numeros(saida.replace(/^\s*\d+[.)]\s+/gm, "")).filter((n) => !permitidos.has(n));
      const meses = saida.match(/\b(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\b/gi) ?? [];
      const probs = [...(novos.length ? [`números novos: ${[...new Set(novos)].join(", ")}`] : []), ...(meses.length ? [`meses: ${[...new Set(meses.map((m) => m.toLowerCase()))].join(", ")}`] : [])];
      return { ok: probs.length === 0, motivo: probs.join("; ") };
    }
    case "nao_contem": {
      const achados = v.termos.filter((t) => saida.toLowerCase().includes(t.toLowerCase()));
      return { ok: achados.length === 0, motivo: achados.length ? `contém: ${achados.join(", ")}` : "" };
    }
    case "omissao": {
      // Pedido de omissão: sem seção com o título proibido e sem as palavras proibidas no corpo.
      const titulos = [...saida.matchAll(/^#{1,4}\s*(.+?)\s*$/gm)].map((m) => m[1].toLowerCase());
      const probs = [
        ...v.titulosProibidos.filter((t) => titulos.some((h) => h.includes(t))).map((t) => `seção "${t}"`),
        ...v.palavrasProibidas.filter((w) => new RegExp(`\\b${w}\\b`, "i").test(saida)).map((w) => `palavra "${w}"`),
      ];
      return { ok: probs.length === 0, motivo: probs.join(", ") };
    }
    case "sem_urls": {
      const urls = saida.match(/https?:\/\/\S+/gi) ?? [];
      return { ok: urls.length === 0, motivo: urls.length ? `URLs: ${urls.join(", ")}` : "" };
    }
    case "tom_sobrio": {
      const probs = [];
      if (EMOJI.test(saida)) probs.push("emoji");
      if (saida.includes("!")) probs.push("exclamação");
      for (const w of ["incrível", "apaixonad", "expert"]) if (saida.toLowerCase().includes(w)) probs.push(w);
      return { ok: probs.length === 0, motivo: probs.join(", ") };
    }
    case "ordem_titulos": {
      const achados = [...saida.matchAll(/^#{1,3}\s*(.+?)\s*$/gm)].map((m) => m[1].toLowerCase());
      let pos = -1;
      for (const t of v.titulos) {
        const i = achados.findIndex((h, k) => k > pos && h.startsWith(t.toLowerCase()));
        if (i === -1) return { ok: false, motivo: `faltou ou fora de ordem: ${t}` };
        pos = i;
      }
      return { ok: true, motivo: "" };
    }
    default:
      throw new Error("tipo desconhecido: " + v.tipo);
  }
}
