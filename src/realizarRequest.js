
let linkMagicoGlobal;
let origemData;

function realizarRequest(event) {
    // Altera o texto do link para "Carregando..."
    document.getElementById('openLinkButtonConexa').innerText = 'Carregando...';

    // Desativar o evento de clique após o primeiro clique    
    document.getElementById('openLinkButtonConexa').removeEventListener('click', realizarRequest);

    // Impede o comportamento padrão do link
    event.preventDefault();
   


    // Parametros Mobile
    const instanciaApp = '1';
    const chavePasse = window.chavePasse;
    const chaveFuncionalidade = '731bd214-9de0-4b0c-9d63-e549296552f3';
    const Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlzIjoiY2hhdmVQYXNzZSIsImtleSI6IjY1MmQ3MDA2LTgwMjctNDM2Ni05MWQ1LTk2Njk0NjkxMWRlMCIsImlhdCI6MTcxMDMzNTE5NCwiZXhwIjozMjg4MjE1MTk0LCJhdWQiOiJhbGwifQ.hscnU0FSJCuy9QSyRgSygBd_stTsP7UtCW-dUTpKWyU';

    const url = `https://api.mosiaomnichannel.com.br/clientes/chavePasse/usuario?instanciaApp=${instanciaApp}&chavePasse=${chavePasse}&chaveFuncionalidade=${chaveFuncionalidade}`;
    const url_sistema = `https://api.mosiaomnichannel.com.br/clientes/chavePasse/sistema?instanciaApp=${instanciaApp}&chavePasse=${chavePasse}&chaveFuncionalidade=${chaveFuncionalidade}`;

    const config = {
        headers: {
            'Authorization': `${Authorization}`
        }
    };

    // Parametros Conexa
    const token = 'b193fd508bb3f5b2356819f7bf6eff4e';
    const config_conexa = {
        headers: {
            'token': token
        }
    };

    // Requisição chaveÚnica
    fetch(url, config)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const chaveUnica = data.data.chaveUnica; // Obter chaveUnica da resposta
            origemData = data.data.origem; // Armazenar origemData
            exibirChaveUnica(chaveUnica); // Passar chaveUnica para a função

            // Requisição com Origem do Sistema
            return fetch(url_sistema, config)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    origemData = data.data.origem; // Atualizar origemData com o valor de url_sistema

                    // Requisição ID Conexa com a chaveUnica
                    return fetch(`https://api.conexasaude.com.br/integration/enterprise/patients/cpf/${chaveUnica}`, config_conexa)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            const id = data.object.patient.id;
                            exibirChaveUnica(id, chaveUnica); // Passar chaveUnica para a função

                            // Requisição LinkMagico com o ID do paciente
                            return fetch(`https://api.conexasaude.com.br/integration/enterprise/patients/generate-magiclink-access-app/${id}`, config_conexa)
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data);
                                    let linkMagico;
                                    if (origemData === 'mobile') {
                                        linkMagico = data.object.linkMagicoApp;
                                    } else if (origemData === 'web') {
                                        linkMagico = data.object.linkMagicoWeb;
                                    }
                                    // document.getElementById('openLinkButtonConexa').href = linkMagico;
                                    // linkMagicoGlobal = linkMagico;
                                    // exibirChaveUnica(id, chaveUnica, linkMagico); // Passar chaveUnica e linkMagico para a função
                                                                        // Redireciona para o linkMagico
                                    window.location.href = linkMagico;
                                })
                                .catch(error => {
                                    console.error('Ocorreu um erro na requisição do linkMagico:', error);
                                });

                        })
                        .catch(error => {
                            console.error('Ocorreu um erro na requisição do id conexa:', error);
                        });

                })
                .catch(error => {
                    console.error('Ocorreu um erro na requisição da origem do sistema mobile:', error);
                });

        })
        .catch(error => {
            console.error('Ocorreu um erro na requisição da chaveunica do usuário logado mobile:', error);
        });
}

function exibirChaveUnica(id, chaveUnica, linkMagico) {
    const chaveUnicaDisplay = document.getElementById('chaveUnica');
    chaveUnicaDisplay.innerText = `Chave Única: ${chaveUnica} - ID do Paciente: ${id} - Origem: ${origemData} - Link Mágico: ${linkMagico}`;
}

// Adicionar evento de clique ao botão openLinkButtonConexa
document.getElementById('openLinkButtonConexa').addEventListener('click', realizarRequest);