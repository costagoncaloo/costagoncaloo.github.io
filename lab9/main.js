// Espera o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {
    const listaProdutos = document.getElementById('lista-produtos');
    carregarProdutos(produtos, listaProdutos);
});


// Função para carregar os produtos
function carregarProdutos(produtos) {
    const listaProdutos = document.getElementById("lista-produtos");
    // Mostra os produtos no console para verificação
    produtos.forEach(produto => {
        console.log(produto.id, produto.title);
    });

    // Agora chama a função para renderizar os produtos
    produtos.forEach(produto => {
        const artigo = criarProduto(produto);
        // Adiciona o artigo no contêiner de produtos
        listaProdutos.appendChild(artigo);
    });
}

// Função para criar um elemento produto
function criarProduto(produto) {
    // Cria o elemento <article> para o produto
    const artigo = document.createElement('article');
    
    // Cria os elementos HTML necessários para o produto
    const imagem = document.createElement('img');
    imagem.src = produto.image;
    imagem.alt = produto.title;
    imagem.width = 150;
    
    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;

    const descricao = document.createElement('p');
    descricao.textContent = produto.description;

    const preco = document.createElement('p');
    preco.innerHTML = `<strong>Preço:</strong> €${produto.price}`;

    const botao = document.createElement('button');
    botao.textContent = "Adicionar ao Cesto";
    botao.onclick = () => adicionarAoCesto(produto.id);

    // Adiciona os elementos ao <article>
    artigo.appendChild(imagem);
    artigo.appendChild(titulo);
    artigo.appendChild(descricao);
    artigo.appendChild(preco);
    artigo.appendChild(botao);

    return artigo;
}

// Função para adicionar o produto ao cesto
function adicionarAoCesto(id) {
    const produto = produtos.find(produto => produto.id === id);
    const cestoContainer = document.getElementById('produtos-cesto');

    // Cria um elemento <article> para o cesto
    const artigoCesto = document.createElement('article');
    
    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;

    const preco = document.createElement('p');
    preco.innerHTML = `<strong>Preço:</strong> €${produto.price}`;

    // Adiciona o produto ao cesto
    artigoCesto.appendChild(titulo);
    artigoCesto.appendChild(preco);

    cestoContainer.appendChild(artigoCesto);
}

