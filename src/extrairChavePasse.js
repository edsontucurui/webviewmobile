// Extrai o valor do parâmetro "chavePasse" da URL
const urlParams = new URLSearchParams(window.location.search);
const chavePasse = urlParams.get('chavePasse');

// // Exibe o valor na tela
const resultadoDiv = document.getElementById('resultado');
resultadoDiv.innerHTML = chavePasse;
// // Exporta a chavePasse para ser usada em outros arquivos
export { chavePasse };


// function extrairChavePasse() {
//   // Simulando a extração do parâmetro chavePasse da URL
//   const urlParams = new URLSearchParams(window.location.search);
//   const chavePasse = urlParams.get('chavePasse');
//   const resultadoDiv = document.getElementById('resultado');
//   resultadoDiv.innerHTML = chavePasse;
//   return chavePasse;
// }

// export { extrairChavePasse };
