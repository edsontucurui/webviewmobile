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
  
    const urlDisplay = document.getElementById('urlDisplay');
    urlDisplay.innerText = `URL para request: ${url}`;
  
    fetch(url, config)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const chaveUnica = data.data.chaveUnica; // Obter chaveUnica da resposta
        exibirChaveUnica(data);
        obterIdConexa(chaveUnica); // Chamar a segunda requisição com chaveUnica
      })
      .catch(error => {
        console.error('Ocorreu um erro:', error);
      });
  }
  
  function obterIdConexa(chaveUnica) {
    //const token = '503b69dd23ededb1dc928d245996134e'; //homologação
    const token = 'b193fd508bb3f5b2356819f7bf6eff4e'
    //const url = `https://hml-api.conexasaude.com.br/integration/enterprise/patients/cpf/${chaveUnica}`; // homologação
    const url = `https://api.conexasaude.com.br/integration/enterprise/patients/cpf/${chaveUnica}`;  
    const config = {
      headers: {
        'token': token
      }
    };
  
    fetch(url, config)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const id = data.object.patient.id;        
        exibirChaveUnica(id, chaveUnica); // Corrigido para passar id e chaveUnica como argumentos
        obterLinkMagicoConexa(id); // Chamar a terceira requisição com o ID do paciente
      })
      .catch(error => {
        console.error('Ocorreu um erro na segunda requisição:', error);
      });
  }
  
  function obterLinkMagicoConexa(id) {
    // const token = '503b69dd23ededb1dc928d245996134e'; //homologação
    const token = 'b193fd508bb3f5b2356819f7bf6eff4e'
    //const url = `https://hml-api.conexasaude.com.br/integration/enterprise/patients/generate-magiclink-access-app/${id}`; // homologação
    const url = `https://api.conexasaude.com.br/integration/enterprise/patients/generate-magiclink-access-app/${id}`; // produção  
    const config = {
      headers: {
        'token': token
      }
    };
  
    fetch(url, config)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const linkMagico = data.object.linkMagicoApp;     
        document.getElementById('openLinkButtonConexa').href = linkMagico;       
        linkMagicoGlobal = linkMagico;
        exibirChaveUnica(id, null, linkMagico); // Corrigido para passar id e linkMagico como argumentos
      })
      .catch(error => {
        console.error('Ocorreu um erro na terceira requisição:', error);
      });
  }
  
  function exibirChaveUnica(id, chaveUnica, linkMagico) {
    const chaveUnicaDisplay = document.getElementById('chaveUnica');
    // Concatenar a chave única, o ID do paciente e o link mágico e exibi-los na tela
    chaveUnicaDisplay.innerText = `Chave Única: ${chaveUnica} - ID do Paciente: ${id} - Link Mágico: ${linkMagico}`;
  }

// Função para abrir o link mágico
function abrirLinkMagico() {
    // Verifique se o link mágico está definido
    if (linkMagicoGlobal) {
        window.open(linkMagicoGlobal);
    } else {
        console.error('Link mágico não está disponível.');
    }
}