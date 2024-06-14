let linkMagicoGlobal;
let origemData;
let loadTimeout;

function realizarRequest(event) {
    // Impede o comportamento padrão do link se houver um evento
    if (event) {
        event.preventDefault();
        event.target.innerText = 'Carregando...';
    }

    // Altera o texto do link para "Carregando..." se houver um link com esse id
    const button = document.getElementById('openLinkButtonConexa');
    if (button) {
        button.innerText = 'Carregando...';
    }

    // Mostra a mensagem e o botão de tentativa novamente após 10 segundos
    clearTimeout(loadTimeout);
    loadTimeout = setTimeout(() => {
        document.getElementById('manualLoadMessage').style.display = 'block';
        document.getElementById('retryButton').style.display = 'block';
    }, 10000);

    // Parametros Mobile
    const instanciaApp = '1'; // sandbox
    //const instanciaApp = '2'; // produção    
    const chavePasse = window.chavePasse;
    const chaveFuncionalidade = '731bd214-9de0-4b0c-9d63-e549296552f3';
    //const chaveFuncionalidade = 'd8a26aad-c78f-4f82-b061-947b9cbb4e57';
	const Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlzIjoiY2hhdmVQYXNzZSIsImtleSI6IjY1MmQ3MDA2LTgwMjctNDM2Ni05MWQ1LTk2Njk0NjkxMWRlMCIsImlhdCI6MTcxMDMzNTE5NCwiZXhwIjozMjg4MjE1MTk0LCJhdWQiOiJhbGwifQ.hscnU0FSJCuy9QSyRgSygBd_stTsP7UtCW-dUTpKWyU';

    //prod
    //const Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlzIjoiY2hhdmVQYXNzZSIsImtleSI6IjQwYTg3YTY0LTIxZDAtNDZjMS1iMWVmLWRkMGFiZDVkMTRjOSIsImlhdCI6MTcxNDE0MjUyNywiZXhwIjozMjkyMDIyNTI3LCJhdWQiOiJhbGwifQ.B692cmxTIFAQUPLNGqiIXUeW1RAuOKobJwj1Lz8MuLw';


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
                                    
                                    // Redireciona para o linkMagico
                                    window.location.href = linkMagico;

                                })
                                .catch(error => {
                                    console.error('Ocorreu um erro na requisição do linkMagico:', error);
                                    document.getElementById('manualLoadMessage').style.display = 'block';
                                    document.getElementById('retryButton').style.display = 'block';
                                });

                        })
                        .catch(error => {
                            console.error('Ocorreu um erro na requisição do id conexa:', error);
                            document.getElementById('manualLoadMessage').style.display = 'block';
                            document.getElementById('retryButton').style.display = 'block';
                        });

                })
                .catch(error => {
                    console.error('Ocorreu um erro na requisição da origem do sistema mobile:', error);
                    document.getElementById('manualLoadMessage').style.display = 'block';
                    document.getElementById('retryButton').style.display = 'block';
                });

        })
        .catch(error => {
            console.error('Ocorreu um erro na requisição da chaveunica do usuário logado mobile:', error);
            document.getElementById('manualLoadMessage').style.display = 'block';
            document.getElementById('retryButton').style.display = 'block';
        });
}

function exibirChaveUnica(id, chaveUnica, linkMagico) {
    const chaveUnicaDisplay = document.getElementById('chaveUnica');
    chaveUnicaDisplay.innerText = `Usuário: ${chaveUnica} `;    
}
