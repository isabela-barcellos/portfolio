# Pré-registro: conjunto `novos2`

Escrito e publicado no git **antes** de qualquer resposta a estes casos (veja a ordem em `git log`).

- Casos: `casos.json` → `conjuntos.novos2` (projeto fictício diferente, sem problema declarado nos fatos).
- Prompt avaliado: o v2 **congelado** (`congelado.json`, sem alteração).
- Execução: `node evals/rodar.mjs <versão> novos2 <n>`: um processo `claude -p` por caso, sem ferramentas e em pasta vazia fora do repositório.
- Planejado: v2 três vezes e v1 uma vez; o v0 não é reexecutado.
- Correção: (a) corretor por regras; (b) juiz cego com a rubrica `rubrica-juiz.md` nos casos marcados `julgado`, com as respostas embaralhadas e sem rótulo de versão.
- Expectativa registrada de antemão: o corretor deve passar quase tudo; o juiz é o que pode reprovar o v2 em invenção qualitativa (m1, m2, m5).
- Os resultados serão publicados como saírem, inclusive se forem ruins. O prompt v2 não será alterado.
