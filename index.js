let urlCreate = `https://nodejs-liliana-production.up.railway.app/criar/atendimento`;
let urlHorarios = `https://nodejs-liliana-production.up.railway.app/horarios-disponiveis`;
const atendimentoForm = document.querySelector('#atendimentoForm');

let nome = "";
let servico = "";
let outrosDados = {};

atendimentoForm.addEventListener('submit', function (e) {
    e.preventDefault()
    if (!nome) {
        nome = document.getElementById('cliente').value;
        const inputNome = document.querySelector('#cliente');
        const divResposta = document.querySelector('.resposta');
        const resposta = document.querySelector('.resposta-phrase');
        const questionResposta = document.querySelector('.resposta-question');
        const sendButton = document.querySelector('#sendButton');

        // Altera visibilidade do botão e da entrada de nome
        sendButton.classList.toggle("inactive");
        inputNome.classList.toggle("inactive");
        resposta.classList.toggle("active")
        resposta.innerHTML = ` Seja bem vindo, ${nome};`
        questionResposta.innerHTML = ` Como vai, ${nome}! Está tudo bem?`
        divResposta.classList.toggle("active");

        return; // Pausa a execução para esperar o próximo clique no botão após o nome
    }

    // Captura o serviço se ainda não estiver armazenado

    if (!servico) {
        const selectedServico = document.querySelector('input[name="servico"]:checked');

        if (selectedServico) {
            servico = selectedServico.value;
            const cardService = document.querySelector('.card')
            const cardResponse = document.querySelector('.card-response')
            const lastResponse = document.querySelector('.container-last-response')
            cardResponse.innerHTML = `${servico}`
            cardResponse.classList.toggle("active")
            cardService.classList.toggle("inactive")
            lastResponse.classList.toggle("active")
            // Agora você pode proceder para capturar a data e o horário
        } else {
            return; // Pausa se nenhum serviço foi selecionado
        }
    } else {
        // Captura data e horário
        const data = document.getElementById('data')?.value;
        const horario = document.getElementsByClassName('horario')?.value;

        console.log(data, horario)
        if (!data || !horario) {
            return;
        }

        let atendimentoData = {
            DATA: data, // Formata a data
            horario_atendimento: horario,
            servico: servico,
            cliente: nome
        };

        fetch(urlCreate, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(atendimentoData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao fazer o POST');
                }
                return response.json();
            })
            .then(data => {
                window.location = '/agenda.html'
            })
            .catch(error => {
                console.log('Erro:', error);
                alert('Erro ao agendar atendimento.');
            });
    }
}
    // Envio do atendimento para o servidor

);


