import { obterBeneficiarioConexa } from './obterBeneficiarioConexa.js';
import { obterLinkMagicoConexa } from './obterLinkMagicoConexa.js';

function realizarRequest() {
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

  const urlDisplay = document.getElementById('urlDisplay');
  urlDisplay.innerText = `URL para request: ${url}`;

  fetch(url, config)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      exibirChaveUnica(data);
    })
    .catch(error => {
      console.error('Ocorreu um erro:', error);
    });
}

function exibirChaveUnica(data) {
  const chaveUnica = data.data.chaveUnica;
  document.getElementById('chaveUnica').innerText = `Chave Única: ${chaveUnica}`;

  // Chamando a função para obter o beneficiário com a Chave Única
  obterBeneficiarioConexa(chaveUnica)
    .then(beneficiario => {
      if (beneficiario) {
        // Exibindo o ID do beneficiário na tela
        document.getElementById('beneficiarioId').innerText = `ID do Beneficiário: ${beneficiario.id}`;

        // Chamando a função para obter o link mágico com o ID do beneficiário
        obterLinkMagicoConexa(beneficiario.id)
          .then(linkMagico => {
            if (linkMagico) {
              // Exibindo o Link Mágico na tela
              const linkMagicoDiv = document.getElementById('linkMagicoDiv');
              linkMagicoDiv.innerHTML = `<a id="conexaLink" href="${linkMagico.link}" target="_blank">Clique Conexa</a>`;
            }
          })
          .catch(error => {
            console.error('Erro ao obter o link mágico:', error.message);
          });
      }
    })
    .catch(error => {
      console.error('Erro ao obter o beneficiário da Conexa:', error.message);
    });
}

export { realizarRequest };
