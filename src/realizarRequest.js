const { obterBeneficiarioConexa } = require('./obterBeneficiarioConexa.js');
const { obterLinkMagicoConexa } = require('./obterLinkMagicoConexa.js');


async function realizarRequest() {
  const instanciaApp = '1';
  const chavePasse = document.getElementById('chavePasseInput').value;
  // const chavePasse = 'f7b1f24d-8e4e-4530-9250-37c877aa6292';
  const chaveFuncionalidade = '731bd214-9de0-4b0c-9d63-e549296552f3';
  const Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlzIjoiY2hhdmVQYXNzZSIsImtleSI6IjY1MmQ3MDA2LTgwMjctNDM2Ni05MWQ1LTk2Njk0NjkxMWRlMCIsImlhdCI6MTcxMDMzNTE5NCwiZXhwIjozMjg4MjE1MTk0LCJhdWQiOiJhbGwifQ.hscnU0FSJCuy9QSyRgSygBd_stTsP7UtCW-dUTpKWyU';

  const url = `https://api.mosiaomnichannel.com.br/clientes/chavePasse/usuario?instanciaApp=${instanciaApp}&chavePasse=${chavePasse}&chaveFuncionalidade=${chaveFuncionalidade}`;
  // const url = `https://api.mosiaomnichannel.com.br/clientes/chavePasse/grupoFamiliar?instanciaApp=${instanciaApp}&chavePasse=${chavePasse}&chaveFuncionalidade=${chaveFuncionalidade}`;              
  // const url = `https://api.mosiaomnichannel.com.br/clientes/chavePasse/sistema?instanciaApp=${instanciaApp}&chavePasse=${chavePasse}&chaveFuncionalidade=${chaveFuncionalidade}`;


  const config = {
    headers: {
      'Authorization': `${Authorization}`
    }
  };

  console.log('URL para request:', url); // Log da URL montada

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    console.log('Data recebida:', data); // Log dos dados recebidos

    const chaveUnica = data.data.chaveUnica;
    const beneficiario = await obterBeneficiarioConexa(chaveUnica);
    const linkMagico = await obterLinkMagicoConexa(beneficiario.id);

    console.log('Data recebida:', beneficiario.id);

    exibirChaveUnica(chaveUnica, beneficiario.id, linkMagico);

  } catch (error) {
    console.error('Ocorreu um erro:', error);
    // Exibir o erro na div de erro
    const erroDisplay = document.getElementById('erroDisplay');
    erroDisplay.textContent = `Ocorreu um erro: ${error.message}`;
  }
}

function exibirChaveUnica(chaveUnica, id, linkMagico) {
  console.log('Chave Única:', chaveUnica); // Log da chaveUnica
  console.log('ID:', id); // Log do ID
  console.log('Link Mágico:', linkMagico); // Log do Link Mágico  
  document.getElementById('chaveUnica').innerText = `Chave Única: ${chaveUnica} ID: ${id}`;
}


module.exports = { obterBeneficiarioConexa, obterLinkMagicoConexa, realizarRequest };

// Chamada da função para testar
// realizarRequest();
