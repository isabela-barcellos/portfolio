// Aplica o tema salvo antes da primeira pintura (evita piscar). Arquivo externo por causa do CSP.
try {
  var t = localStorage.getItem("tema");
  if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
} catch (e) { /* sem armazenamento: segue o tema do sistema */ }
