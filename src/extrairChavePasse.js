// Extrai o valor do parâmetro "chavePasse" da URL
const urlParams = new URLSearchParams(window.location.search);
const chavePasse = urlParams.get('chavePasse');

// // Exibe o valor na tela
const resultadoDiv = document.getElementById('resultado');
resultadoDiv.innerHTML = chavePasse;
<<<<<<< HEAD

=======
>>>>>>> 50b1f113a7b87e6c126875c9c920a665777e5c39

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
