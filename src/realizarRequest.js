function realizarRequest() {
  const instanciaApp = '1';
  const chavePasse = document.getElementById('chavePasseInput').value;
  const chaveFuncionalidade = '731bd214-9de0-4b0c-9d63-e549296552f3';
  const Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlzIjoiY2hhdmVQYXNzZSIsImtleSI6ImE2OTIyZWRmLWE3ZTQtNGZjYy04NDlhLTQxNTUxMDg0NDRhMSIsImlhdCI6MTcxMDMzMjA0NCwiZXhwIjozMjg4MjEyMDQ0LCJhdWQiOiJhbGwifQ.ARTrpEjqAws2LEpLdBTG8s25HuvcMMk6qhNY7aLxEuI';
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

  fetch(url, config)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      formatJSON(data);
    })
    .catch(error => {
      console.error('Ocorreu um erro:', error);
    });
}
