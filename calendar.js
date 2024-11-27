let selectedDay = null;
let selectedTime = null;
let selectedDate = null;
let timesDisponiveis = [];

function getDayName(date) {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return {
        days: days,
        getDayName: function (date) {
            return days[date.getDay()]
        }
    }
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${year}-${month}-${day}`
}


function atualizarHtmlComHorarios(horarios) {
    const horariosContainer = document.getElementById("horarios-container"); // Certifique-se de ter um elemento com esse ID
    horariosContainer.innerHTML = ""; // Limpa horários anteriores

    horarios.forEach(horario => {
        const horarioElement = document.createElement("div");
        horarioElement.textContent = horario; // Se os horários retornados forem como 'HH:mm', use isso; se forem 'HH:mm:ss', ajuste conforme necessário
        horariosContainer.appendChild(horarioElement);
    });
}


function createDayElement(dayNumber, isToday) {
    const dayDiv = document.createElement("div");
    dayDiv.className = "day";
    const dayName = getDayName(dayNumber).getDayName(dayNumber)
    dayDiv.addEventListener("click", function () {
        if (selectedDay) {
            selectedDay.classList.remove("selected")
        }
        // Marca o dia atual como selecionado
        this.classList.add("selected");
        selectedDay = this; // Armazena o dia selecionado
        selectedDate = new Date(dayNumber)

        if (selectedDate) {
            const data = document.getElementById('data').value = formatDate(selectedDate);
            olharHorarios(data)
            createTimeSlots()
        }
    });
    if (isToday) {
        dayDiv.id = "today"; // Adiciona um id especial para o dia de hoje
    }
    dayDiv.innerHTML = `${dayName}<br>${dayNumber.getDate()}`;
    return dayDiv;
}

function olharHorarios(dataSelecionada) {
    console.log(dataSelecionada)
    fetch(`${urlHorarios}?data=${dataSelecionada}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('A requisição não foi concluida com sucesso');
            }
            return response.json();
        })
        .then(horarios => {
            timesDisponiveis = horarios
            createTimeSlots(dataSelecionada)
        })
        .catch(error => console.error('Erro:', error));
}

// Função para gerar os horários
function createTimeSlots() {
    const timeSlotsContainer = document.getElementById("time-slot");
    timeSlotsContainer.innerHTML = ''; // Limpa os horários anteriores

    times = timesDisponiveis

    times.forEach(time => {
        const timeDiv = document.createElement("div");
        timeDiv.className = "time-slot";
        timeDiv.innerHTML = time;

        timeDiv.addEventListener("click", function () {
            if (selectedTime) {
                selectedTime.classList.remove("selected")
            }
            this.classList.add("selected");
            selectedTime = this;
            const horarioInput = document.getElementsByClassName('horario')
            if (horarioInput) {

                horarioInput.value = time;
            }
        });
        timeSlotsContainer.appendChild(timeDiv);
    });
}


function updateCalendar() {
    const calendar = document.getElementById("calendar");
    const today = new Date();
    for (let i = 0; i < 11; i++) {
        const futureDay = new Date();
        futureDay.setDate(today.getDate() + i);
        if (futureDay.getDay() === 1 || futureDay.getDay() === 0) {
            continue
        }
        const dayDiv = createDayElement(futureDay, i === 0); // Marca o primeiro dia como "hoje"
        calendar.appendChild(dayDiv);
    }
}




// Função que chama as duas funções de inicialização
function init() {
    updateCalendar();
    createTimeSlots();
}

// Executa a função quando o DOM estiver completamente carregado
window.onload = init;
