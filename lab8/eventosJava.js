// Seleciona os elementos da imagem e da descrição
const artistImage = document.getElementById("artistImage");
const descricao = document.getElementById("descricao");

// Função para mostrar o texto e ocultar a imagem
artistImage.addEventListener("mouseover", function() {
    artistImage.style.display = "none";   // Oculta a imagem
    descricao.style.display = "block";    // Mostra a descrição
});

// Função para ocultar o texto e mostrar a imagem novamente
descricao.addEventListener("mouseleave", function() {
    descricao.style.display = "none";     // Oculta a descrição
    artistImage.style.display = "block";  // Mostra a imagem
});
