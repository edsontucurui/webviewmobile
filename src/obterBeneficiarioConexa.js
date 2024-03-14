const token = '503b69dd23ededb1dc928d245996134e';

async function obterBeneficiarioConexa(chaveUnica) {
  const url = `https://hml-api.conexasaude.com.br/integration/enterprise/patients/cpf/${chaveUnica}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'token': token
    }
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao obter beneficiário da Conexa');
    }

    const id = data.object.patient.id;
    const blocked = data.object.patient.blocked;

    return { id, blocked };
  } catch (error) {
    console.error('Erro ao obter beneficiário da Conexa:', error.message);
    return null;
  }
}

module.exports = { obterBeneficiarioConexa };
