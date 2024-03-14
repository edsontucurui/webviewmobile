import { obterBeneficiarioConexa } from './obterBeneficiarioConexa.js';

async function realizarRequest() {
  const instanciaApp = '1';
  const chavePasse = document.getElementById('chavePasseInput').value;
  const chaveFuncionalidade = '731bd214-9de0-4b0c-9d63-e549296552f3';
  const Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlzIjoiY2hhdmVQYXNzZSIsImtleSI6IjY1MmQ3MDA2LTgwMjctNDM2Ni05MWQ1LTk2Njk0NjkxMWRlMCIsImlhdCI6MTcxMDMzNTE5NCwiZXhwIjozMjg4MjE1MTk0LCJhdWQiOiJhbGwifQ.hscnU0FSJCuy9QSyRgSygBd_stTsP7UtCW-dUTpKWyU';

  const urlSelecionada = 'url1';

  const config = {
    headers: {
      'Authorization': `${Authorization}`
    }
  };

  let url;

  if (urlSelecionada === 'url1') {
    url = `https://api.mosiaomnichannel.com.br/clientes/chavePasse/usuario?instanciaApp=${instanciaApp}&chavePasse=${chavePasse}&chaveFuncionalidade=${chaveFuncionalidade}`;
  } else if (urlSelecionada === 'url2') {
    url = `https://api.mosiaomnichannel.com.br/clientes/chavePasse/grupoFamiliar?instanciaApp=${instanciaApp}&chavePasse=${chavePasse}&chaveFuncionalidade=${chaveFuncionalidade}`;
  } else if (urlSelecionada === 'url3') {
    url = `https://api.mosiaomnichannel.com.br/clientes/chavePasse/sistema?instanciaApp=${instanciaApp}&chavePasse=${chavePasse}&chaveFuncionalidade=${chaveFuncionalidade}`;
  }

  // Exibir a URL na tela
  const urlDisplay = document.getElementById('urlDisplay');
  urlDisplay.innerText = `URL para request: ${url}`;

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    console.log(data);
    const chaveUnica = data.data.chaveUnica;
    const beneficiario = await obterBeneficiarioConexa(chaveUnica);
    exibirChaveUnica(chaveUnica, beneficiario.id);
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  }
}

function exibirChaveUnica(chaveUnica, id) {
  document.getElementById('chaveUnica').innerText = `Chave Única: ${chaveUnica} ID: ${id}`;
}