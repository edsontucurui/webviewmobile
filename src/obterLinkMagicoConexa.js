const token = '503b69dd23ededb1dc928d245996134e';

async function obterLinkMagicoConexa(id) {
  const url = `https://hml-api.conexasaude.com.br/integration/enterprise/patients/generate-magiclink-access-app/{id}`;

  const config = {
    headers: {
      token: token
    }
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao obter beneficiário da Conexa');
    }

    const link = data.object.linkMagicoApp;


    return { link };
  } catch (error) {
    console.error('Erro ao obter beneficiário da Conexa:', error.message);
    return null;
  }
}

export { obterLinkMagicoConexa };
