// Variável global para armazenar o link mágico
let linkMagicoGlobal;

function realizarRequest() {
    const instanciaApp = '1';
//    const chavePasse = document.getElementById('chavePasseInput').value;
    const chavePasse = window.chavePasse; // Obtendo a chavePasse diretamente de extrairChavePasse.js    
    const chaveFuncionalidade = '731bd214-9de0-4b0c-9d63-e549296552f3';
    const Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlzIjoiY2hhdmVQYXNzZSIsImtleSI6IjY1MmQ3MDA2LTgwMjctNDM2Ni05MWQ1LTk2Njk0NjkxMWRlMCIsImlhdCI6MTcxMDMzNTE5NCwiZXhwIjozMjg4MjE1MTk0LCJhdWQiOiJhbGwifQ.hscnU0FSJCuy9QSyRgSygBd_stTsP7UtCW-dUTpKWyU';
  
    const url = `https://api.mosiaomnichannel.com.br/clientes/chavePasse/usuario?instanciaApp=${instanciaApp}&chavePasse=${chavePasse}&chaveFuncionalidade=${chaveFuncionalidade}`;
//  const url = `https://api.mosiaomnichannel.com.br/clientes/chavePasse/grupoFamiliar?instanciaApp=${instanciaApp}&chavePasse=${chavePasse}&chaveFuncionalidade=${chaveFuncionalidade}`;
//  const url = `https://api.mosiaomnichannel.com.br/clientes/chavePasse/sistema?instanciaApp=${instanciaApp}&chavePasse=${chavePasse}&chaveFuncionalidade=${chaveFuncionalidade}`;

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

  fetch(url, config)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const chaveUnica = data.data.chaveUnica;
      document.getElementById('chaveUnica').innerText = `Chave Única: ${chaveUnica}`;
      
      // Chamando a função para obter o beneficiário da Conexa
      obterBeneficiarioConexa(chaveUnica)
        .then(result => {
          console.log('Beneficiário da Conexa:', result);
          const id = result.id;
          console.log(result);
          console.log(result.id);
          document.getElementById('chaveUnica').innerText += `\nID do Beneficiário: ${id}`;
        })
        .catch(err => {
          console.error('Erro ao obter beneficiário da Conexa:', err.message);
        });
    })
    .catch(error => {
      console.error('Ocorreu um erro:', error);
    });
}

function exibirChaveUnica(data) {
  const chaveUnica = data.data.chaveUnica;
  document.getElementById('chaveUnica').innerText = `Chave Única: ${chaveUnica}`;
}

// Exportando a função realizarRequest para ser usada em outros arquivos se necessário
module.exports = { realizarRequest };
