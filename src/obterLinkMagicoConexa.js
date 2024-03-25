//homo
// const token = '503b69dd23ededb1dc928d245996134e';
//prod
const token = 'b193fd508bb3f5b2356819f7bf6eff4e';

async function obterLinkMagicoConexa(id) {
  //homo
  // const url = `https://hml-api.conexasaude.com.br/integration/enterprise/patients/generate-magiclink-access-app/${id}`;
  //prod
  const url = `https://api.conexasaude.com.br/integration/enterprise/patients/generate-magiclink-access-app/{id}`;


  const config = {
    headers: {
      token: token
    }
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao obter link mágico da Conexa');
    }

    const link = data.object.linkMagicoApp;

    return link;
  } catch (error) {
    console.error('Erro ao obter link mágico da Conexa:', error.message);
    return null;
  }
}

module.exports = { obterLinkMagicoConexa };
