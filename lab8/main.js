//1
function passarPorCima() {

}


// Seleciona todos os botões com atributo data-color e adiciona um evento de clique
document.querySelectorAll("button[data-color]").forEach((button) => {
    button.addEventListener("click", () => {
        const color = button.dataset.color; // Obtém a cor do atributo data-color
        document.getElementById('pinta-me').style.color = color; // Altera a cor
    });
});



// 3
function showText() {
    let inputText = document.getElementById('inputText').value; 
    document.getElementById('displayText').innerText = inputText; 

    let colors = ['red', 'blue', 'green', 'yellow'];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById('inputText').style.backgroundColor = randomColor;
}

// 4
// Detecta mudanças no select e altera a cor do fundo
document.querySelector('#colorSelect').onchange = function () {
    document.querySelector('body').style.backgroundColor = this.value;
};


// 5
let countValue = 0;

function count() { 
    countValue++; 
    document.getElementById('countDisplay').innerText = countValue; 
}

function submitNomeIdade() {
    let nome = document.getElementById("nome").value;
    let idade = document.getElementById("idade").value;
    let greetingDiv = document.getElementById("greeting");

    if (nome && idade) {
        greetingDiv.innerHTML += `<p>Olá, o ${nome} tem ${idade}!</p>`;
    } else {
        alert("Por favor, insira ambos Nome e Idade.");
    }
}

// Ponto 7: Contador Automático
let autoCount = 0;
function startAutoCounter() {
    setInterval(() => {
        autoCount++;
        document.getElementById("autoCounter").innerText = autoCount;
    }, 1000);
}

// Iniciar contador automático ao carregar a página
window.onload = startAutoCounter;




