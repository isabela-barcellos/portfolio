# Avaliação do agente de conteúdo

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

## Limites (importantes)
- 8 casos e uma execução por versão: é um sinal, não uma medida estatística.
- O **v2 foi escrito depois de ver as falhas do v1**. O 8/8 mostra que essas falhas foram corrigidas; não mostra que o agente generaliza para casos novos.
- O corretor é por regras: não distingue citar de usar uma palavra (foi o que reprovou o v1 no caso de tom) e não avalia qualidade do texto.
- Isto avalia um **agente de redação**. Os testes do verificador de vazamento (`tests/verificador.test.mjs`) são outra coisa: testam uma barreira de segurança, não um modelo.
