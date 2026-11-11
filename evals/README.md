# Avaliação do agente de conteúdo

## Summary (English)

A small, honest evaluation of a content-writing agent: 8 adversarial cases on fictional data, graded by deterministic rules (no LLM as judge, and the grader has its own tests). Three prompt versions scored 6/8, 6/8 and 8/8. Because v2 was written after seeing v1's failures, it was then **frozen (hash in `congelado.json`)** and run three times on 4 new cases: 4/4, 4/4, 4/4. Limits: tiny samples, one model family, and a rule-based grader that cannot tell quoting a word from using it (a fifth case exists only to show this).

Avalia um agente que escreve textos de páginas de portfólio a partir de fatos autorizados. É uma avaliação **pequena e honesta**, não uma estatística.

- `casos.json`: 8 casos adversariais com dados **fictícios** (inventar métrica, publicar telefone e endereço, vazar nome confidencial, ignorar pedido de omissão, tom, ordem das seções, link inexistente, instrução escondida em documento) e os três prompts avaliados (`v0`, `v1`, `v2`).
- `corretor.mjs`: correção **determinística por regras**, sem outro modelo como juiz. Tem testes próprios em `tests/corretor.test.mjs`.
- `avaliar.mjs`: `node evals/avaliar.mjs montar v2` imprime o prompt completo que o agente recebe; `node evals/avaliar.mjs corrigir v2` corrige `respostas-v2.json` e grava `resultado-v2.md`.
- `respostas-*.json` e `resultado-*.md`: as respostas reais do agente e o resultado de cada versão.

## Como foi rodado
Cada versão foi respondida por um agente separado (um modelo Claude em um subagente), que recebeu só o prompt e os 8 casos, sem acesso às regras de correção. **Uma execução por versão.**

| Versão | O que mudou | Passou |
|---|---|---|
| v0 | prompt curto, sem regras | 6/8 |
| v1 | sete regras explícitas | 6/8 |
| v2 | omissão com prioridade sobre a estrutura; explicação sem repetir o que foi recusado | 8/8 |

## Casos novos (para testar se o v2 generaliza)
Escritos **depois** de o prompt v2 ficar pronto, sem ajustá-lo a eles. O hash do prompt v2 foi gravado em `congelado.json` antes de qualquer resposta; `avaliar.mjs` recusa rodar se o prompt mudar. Execuções: `node evals/avaliar.mjs corrigir v2 novos 1` (e 2, 3); v0 e v1 uma vez cada.

| Versão | Execuções | Passou (corretor) | Leitura das respostas |
|---|---|---|---|
| v0 | 1 | 3/4 | a falha é real: publicou o e-mail de uma colega |
| v1 | 1 | 2/4 | as 2 falhas são do corretor: o agente recusou o cargo inflado e o comparativo inventado, mas citou os termos ao explicar; o comportamento estava correto |
| v2 | 3 | 4/4 · 4/4 · 4/4 | sem falhas e sem variação entre as execuções |

O quinto caso (`n5-limite-citar-vs-usar`) pede para **listar** as palavras proibidas e não entra no placar: o corretor o reprova (cita as palavras), e na leitura humana as respostas não têm emoji nem exclamação. Existe para documentar o limite do corretor.

## Limites (importantes)
- 8 casos (e 4 novos) e poucas execuções: é um sinal, não uma medida estatística. Nas três execuções do v2 nos casos novos não houve variação, mas três execuções não bastam para afirmar estabilidade.
- O **v2 foi escrito depois de ver as falhas do v1**; por isso os casos novos e o prompt congelado. Nos casos novos, o que distingue o v2 do v1 é não repetir os termos recusados; nenhum dos dois inventou fatos.
- O corretor é por regras: não distingue citar de usar uma palavra (foi o que reprovou o v1 no caso de tom) e não avalia qualidade do texto.
- Isto avalia um **agente de redação**. Os testes do verificador de vazamento (`tests/verificador.test.mjs`) são outra coisa: testam uma barreira de segurança, não um modelo.
