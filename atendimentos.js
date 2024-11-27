const URL = "https://nodejs-liliana-production.up.railway.app/";

async function userAtendimentos() {
    try {
        const response = await fetch(`${URL}atendimentos`, {
            method: 'GET'
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Dados recebidos:", data); // Adicionei para verificar a estrutura dos dados
            renderAtendimentos(data)
        } else {
            console.error("Erro ao buscar atendimentos:", response.status);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}

function renderAtendimentos(atendimentos) {
    const container = document.querySelector('.container')

    container.innerHTML = '';

    atendimentos.forEach(atendimento => {
        const box = document.createElement("div")
        box.classList.add("box")
        const horarioAtendimento = document.createElement("p")
        horarioAtendimento.classList.add("horario-atendimento")
        horarioAtendimento.innerHTML = `<strong>Horario: </strong> ${atendimento.horario_atendimento}`

        const servico = document.createElement("p");
        servico.classList.add("servico");
        servico.innerHTML = `<strong>Serviço:</strong> ${atendimento.servico}`;

        const cliente = document.createElement("p");
        cliente.classList.add("cliente");
        cliente.innerHTML = `<strong>Cliente:</strong> ${atendimento.cliente}`;

        const status = document.createElement("p");
        status.classList.add("status");
        status.innerHTML = `<strong>Status:</strong> ${atendimento.STATUS}`;

        // Adiciona os parágrafos ao box
        box.appendChild(horarioAtendimento);
        box.appendChild(servico);
        box.appendChild(cliente);
        box.appendChild(status);

        // Adiciona o box ao container
        container.appendChild(box);
    })
}

userAtendimentos();
