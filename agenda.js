document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.questions');
    const inputCliente = document.querySelector('#cliente')
    const sendButton = document.querySelector('#sendButton')
    questions.forEach((item) => {
        item.classList.toggle("active")
    });
    inputCliente.classList.toggle("active")
    sendButton.classList.toggle("active")
});
