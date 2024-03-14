function realizarRequest() {
  const instanciaApp = '1';
  const chavePasse = document.getElementById('chavePasseInput').value;
  const chaveFuncionalidade = '731bd214-9de0-4b0c-9d63-e549296552f3';
  const Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlzIjoiY2hhdmVQYXNzZSIsImtleSI6IjY1MmQ3MDA2LTgwMjctNDM2Ni05MWQ1LTk2Njk0NjkxMWRlMCIsImlhdCI6MTcxMDMzNTE5NCwiZXhwIjozMjg4MjE1MTk0LCJhdWQiOiJhbGwifQ.hscnU0FSJCuy9QSyRgSygBd_stTsP7UtCW-dUTpKWyU';

  const urlSelecionada = 'url1'; // Mantendo a lógica de urlSelecionada

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
      const chaveUnica = data.data.chaveUnica; // Obter chaveUnica da resposta
      exibirChaveUnica(data);
      realizarSegundaRequest(chaveUnica); // Chamar a segunda requisição com chaveUnica
    })
    .catch(error => {
      console.error('Ocorreu um erro:', error);
    });
}

function realizarSegundaRequest(chaveUnica) {
  const token = '503b69dd23ededb1dc928d245996134e';
  const url = `https://hml-api.conexasaude.com.br/integration/enterprise/patients/cpf/${chaveUnica}`;
  const config = {
    headers: {
      'token': token
    }
  };

  fetch(url, config)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      exibirChaveUnica(data.object.patient.id, chaveUnica);
      realizarTerceiraRequest(data.object.patient.id); // Chamar a terceira requisição com o ID do paciente
    })
    .catch(error => {
      console.error('Ocorreu um erro na segunda requisição:', error);
    });
}

function realizarTerceiraRequest(id) {
  const token = '503b69dd23ededb1dc928d245996134e';
  const url = `https://hml-api.conexasaude.com.br/integration/enterprise/patients/generate-magiclink-access-app/${id}`;
  const config = {
    headers: {
      'token': token
    }
  };

  fetch(url, config)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      exibirChaveUnica(null, null, data.object.linkMagicoApp); // Exibir o linkMagicoApp
    })
    .catch(error => {
      console.error('Ocorreu um erro na terceira requisição:', error);
    });
}

function exibirChaveUnica(patientId, chaveUnica, linkMagicoApp) {
  const chaveUnicaDisplay = document.getElementById('chaveUnica');
  // Concatenar a chave única, o ID do paciente e o link mágico e exibi-los na tela
  chaveUnicaDisplay.innerText = `Chave Única: ${chaveUnica} - ID do Paciente: ${patientId} - Link Mágico: ${linkMagicoApp}`;
}
