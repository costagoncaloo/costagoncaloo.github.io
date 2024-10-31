// Função para mudar de cor
function changeColor(color) { 
    document.getElementById('colorBox').style.backgroundColor = color; } 


// 
function showText() { 
    let inputText = document.getElementById('inputText').value; 
    document.getElementById('displayText').innerText = inputText; } 


// Function to submit color from input 
function submitColor() { 
    let color = document.getElementById('colorInput').value; 
    document.getElementById('colorBox').style.backgroundColor = color; } 


// Função para contagem 
function count() { 4
    countValue++; 
    document.getElementById('countDisplay').innerText = countValue; }