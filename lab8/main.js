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

let countValue = localStorage.getItem('countValue') ? parseInt(localStorage.getItem('countValue'), 10) : 0;

// Atualiza o contador na página ao carregar
document.getElementById('countDisplay').innerText = countValue;

function count() { 
    // Incrementa o contador
    countValue++; 
    
    // Atualiza o elemento na página
    document.getElementById('countDisplay').innerText = countValue; 
    
    // Salva o valor no Local Storage
    localStorage.setItem('countValue', countValue);
}


// 6
document.querySelector('#userForm').onsubmit = (e) => {
    // Evita o recarregamento da página
    e.preventDefault();

    // Obtém os valores dos inputs
    const nome = document.querySelector('#nome').value;
    const idade = document.querySelector('#idade').value;

    // Exibe a mensagem no div de saída
    const greetingDiv = document.querySelector('#greeting');
    greetingDiv.innerHTML = `<p>Olá, o ${nome} tem ${idade}!</p>`;
};


// 7
let autoCount = 0;
function startAutoCounter() {
    setInterval(() => {
        autoCount++;
        document.getElementById("autoCounter").innerText = autoCount;
    }, 1000);
}

// Iniciar contador automático ao carregar a página
window.onload = startAutoCounter;




