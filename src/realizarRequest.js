import { extrairChavePasse } from './extrairChavePasse.js';
import { obterBeneficiarioConexa } from './obterBeneficiarioConexa.js';

function realizarRequest() {
  const instanciaApp = '1';
  const chaveFuncionalidade = '731bd214-9de0-4b0c-9d63-e549296552f3';
  const Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlzIjoiY2hhdmVQYXNzZSIsImtleSI6IjY1MmQ3MDA2LTgwMjctNDM2Ni05MWQ1LTk2Njk0NjkxMWRlMCIsImlhdCI6MTcxMDMzNTE5NCwiZXhwIjozMjg4MjE1MTk0LCJhdWQiOiJhbGwifQ.hscnU0FSJCuy9QSyRgSygBd_stTsP7UtCW-dUTpKWyU';

  // Obtendo a chavePasse
  // const chavePasse = extrairChavePasse();

  const chavePasse = '';

  const url = `https://api.mosiaomnichannel.com.br/clientes/chavePasse/usuario?instanciaApp=${instanciaApp}&chavePasse=${chavePasse}&chaveFuncionalidade=${chaveFuncionalidade}`;

  const config = {
    headers: {
      'Authorization': `${Authorization}`
    }
  };

  fetch(url, config)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const chaveUnica = data.data.chaveUnica;
      exibirChaveUnica(chaveUnica); // Exibir o ID e CPF concatenados
      // Chama a função para obter o beneficiário da Conexa com a chaveUnica obtida
      obterBeneficiarioConexa(chaveUnica)
        .then(beneficiario => {
          if (beneficiario) {
            console.log('Beneficiário da Conexa:', beneficiario);
            // Aqui você pode fazer o que quiser com o beneficiário da Conexa
          } else {
            console.error('Erro ao obter beneficiário da Conexa');
          }
        })
        .catch(error => {
          console.error('Erro ao obter beneficiário da Conexa:', error.message);
        });
    })
    .catch(error => {
      console.error('Ocorreu um erro:', error);
    });
}

function exibirChaveUnica(chaveUnica) {
  // Obtendo o ID e CPF
  const id = chaveUnica.id;
  const cpf = chaveUnica.cpf;

  // Exibindo na tela
  const idCpfDisplay = document.getElementById('idCpf');
  idCpfDisplay.innerText = `ID: ${id} | CPF: ${cpf}`;
}

realizarRequest(); // Executar a função quando o script é carregado
