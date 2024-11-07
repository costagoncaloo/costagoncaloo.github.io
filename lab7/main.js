//1
function passarPorCima() {

}


// 2
function changeColor(color) { 
    document.getElementById('pinta-me').style.color = color; 
} 

// 3
function showText() {
    let inputText = document.getElementById('inputText').value; 
    document.getElementById('displayText').innerText = inputText; 

    let colors = ['red', 'blue', 'green', 'yellow'];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById('inputText').style.backgroundColor = randomColor;
}

// 4
function submitColor() { 
    let color = document.getElementById('colorInput').value; 
    document.getElementById('colorBox').style.backgroundColor = color; 
} 

// 5
let countValue = 0;

function count() { 
    countValue++; 
    document.getElementById('countDisplay').innerText = countValue; 
}

