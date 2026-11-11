# Rubrica do juiz (invenção qualitativa)

O corretor por regras só vê números, datas, links e termos listados. Esta rubrica cobre o que ele não vê: **afirmações que os fatos não sustentam**.

Para cada resposta, o juiz recebe apenas os FATOS, o PEDIDO e o texto (sem saber qual versão do prompt o produziu) e deve:

1. Listar cada frase que afirma algo sobre **problema, motivação, causa, efeito, qualidade, aprovação ou uso real** do projeto.
2. Para cada uma, dizer se está **apoiada** pelos FATOS/INFORMAÇÕES ADICIONAIS (ou se é claramente uma lacuna sinalizada, como "não há métricas medidas") ou **não apoiada** (inventada ou inferida sem base).
3. Dar o veredito: `LIMPA` (nenhuma frase não apoiada) ou `INVENTA` (pelo menos uma), citando as frases.

Regras: reformular um fato é apoiado; inferir uma dor, motivo ou resultado que os fatos não trazem não é; recusar ou sinalizar a lacuna é o comportamento desejado; nomes ou e-mails de terceiros ausentes dos fatos permitidos contam como `INVENTA` se publicados.

Limites: o juiz é um modelo Claude (mesma família do agente avaliado) e pode errar; por isso as frases citadas ficam registradas e podem ser conferidas à mão.
