---
titulo: Ecoa Fono — exercícios de fonoaudiologia em casa
resumo: Aba do app da Care Plus para o paciente fazer em casa os exercícios das sessões de fonoaudiologia, com guia por voz e câmera que confere o movimento.
contexto: FIAP Challenge NEXT 2026 · Care Plus · grupo de 5 pessoas
resultado_destaque: 1º lugar no NEXT, em 24/10/2026
papel: Desenvolvimento completo (mobile, web e back-end), orquestrando agentes de IA no Maestri
stack: [React Native, Expo, TypeScript, MediaPipe, Node.js]
ordem: 1
categoria: faculdade
selo: "Challenge FIAP · 1º lugar NEXT"
resumo_curto: Exercícios de fonoaudiologia em casa, com guia por voz e câmera.
capa: home.png
repositorio: https://github.com/Challenge-CarePlus/Sprint4_Mobile
producao: https://careplus-ecoa-fono.vercel.app
rascunho: false
galeria:
  - { arquivo: home.png, alt: "Tela inicial do Ecoa com o hero azul-marinho e os cartões Exercícios e Configurações", legenda: "Tela inicial" }
  - { arquivo: trilhas.png, alt: "Escolha de trilha: infantil, dicção e oratória, fortalecimento orofacial", legenda: "Três trilhas, 5 exercícios cada" }
  - { arquivo: adultos.png, alt: "Prévia do exercício Alongamento de mandíbula na trilha de adultos", legenda: "Trilha de adultos" }
  - { arquivo: infantil.png, alt: "Prévia do exercício Sorriso largo na trilha infantil, com cores do kit infantil", legenda: "Trilha infantil" }
  - { arquivo: idosos.png, alt: "Prévia do exercício Abertura e fechamento de boca com letra ampliada", legenda: "Trilha de idosos, letra ampliada" }
---

## Problema
Quem faz fonoaudiologia tem sessões semanais, mas precisa repetir os exercícios em casa, sozinho e sem saber se o movimento está certo.

## Papel
Desenvolvi o produto inteiro (mobile, web e back-end) em um grupo de 5 pessoas, orquestrando agentes de IA no Maestri e validando cada entrega.

## Decisões
- **Visão no aparelho:** o MediaPipe para web não roda em React Native. Usei uma WebView local e invisível que recebe os quadros da câmera e devolve os pontos do rosto. As imagens nunca saem do aparelho.
- **Dizer o que a câmera não vê:** o MediaPipe não enxerga língua nem diafragma. Seis exercícios usam um indicador facial aproximado, e o app avisa isso ao paciente.
- **Privacidade por padrão:** bloqueei por CSP o envio de estatísticas de uso do MediaPipe. Vídeos e treinos ficam só no servidor próprio.
- **Três trilhas:** infantil, adultos e idosos, com texto maior e tema próprio, em vez de uma interface única.
- **Design system próprio**, com tema claro, escuro e a variante infantil.

## Resultado
1º lugar no FIAP Challenge NEXT 2026. 15 exercícios em 3 trilhas e 173 testes automatizados no back-end.

## Aprendizados
- Avisar o usuário do que o sistema não consegue medir é parte do produto, não um detalhe técnico.
- Rodar a visão computacional no aparelho mudou a arquitetura, e deixou a conversa sobre privacidade mais simples.
- Testes e navegador não substituem o aparelho físico. **O que falta:** validar em aparelho físico, testar com 3 a 5 pessoas e calibrar os limiares de movimento com rostos reais.
