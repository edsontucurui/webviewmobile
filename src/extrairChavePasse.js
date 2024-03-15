// Extrai o valor do parâmetro "chavepasse" da URL
const urlParams = new URLSearchParams(window.location.search);
window.chavePasse = urlParams.get('chavePasse');

// Exibe o valor na tela
const resultadoDiv = document.getElementById('resultado');
resultadoDiv.innerHTML = window.chavePasse;
