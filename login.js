const URL = "https://nodejs-liliana-production.up.railway.app/"


async function loginUser(email, password){
    const response = await fetch(`${URL}auth/login`, {
        method: 'POST',
        headers: {'Content-Type':  'application/json'},
        body: JSON.stringify({email, password})
    })
    const data = await response.json()
    if(response.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = '/atendimentos.html'
        console.log("Login realizado com sucesso")
    }
    else {
        alert("Não foi possivel realizar login")
    }
}

document.getElementById("loginform").addEventListener("submit", async function (event) {
    event.preventDefault()

    const email = event.target.email.value;
    const password = event.target.password.value;

    await loginUser(email, password)
})

async function fetchUserData(userId) {
    const token = localStorage.getItem('token');

    if (!token) {
        alert("Você precisa fazer login.");
        return;
    }

    const response = await fetch(`${URL}user/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        const data = await response.json();
    } else if (response.status === 401) {
        alert("Acesso negado: faça login novamente.");
    } else {
        alert("Erro ao buscar dados.");
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login.html'; // Redireciona para a página de login
    }

    try {
        const decodedToken = jwt_decode(token)
        const userID = decodedToken.id
        fetchUserData(userID)
    }catch(error) {
        console.error(error)
    }
});