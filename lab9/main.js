document.addEventListener("DOMContentLoaded", () => {
    const listaProdutos = document.getElementById('lista-produtos');
    carregarProdutos(produtos, listaProdutos);
    renderizarCesto();
});

function carregarProdutos(produtos) {
    const listaProdutos = document.getElementById("lista-produtos");
    produtos.forEach(produto => {
        const artigo = criarProduto(produto);
        listaProdutos.appendChild(artigo);
    });
}

function criarProduto(produto) {
    const artigo = document.createElement('article');
    
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
    botao.textContent = " + Adicionar ao Cesto";
    botao.onclick = () => adicionarAoCesto(produto);

    artigo.appendChild(titulo);
    artigo.appendChild(imagem);
    artigo.appendChild(preco);
    artigo.appendChild(descricao);
    artigo.appendChild(botao);

    return artigo;
}

function adicionarAoCesto(produto) {
    const cesto = JSON.parse(localStorage.getItem('cesto')) || [];
    cesto.push(produto);
    localStorage.setItem('cesto', JSON.stringify(cesto));
    renderizarCesto();
}

function removerDoCesto(index) {
    const cesto = JSON.parse(localStorage.getItem('cesto')) || [];
    cesto.splice(index, 1); // Remove o item do cesto
    localStorage.setItem('cesto', JSON.stringify(cesto)); // Atualiza o localStorage
    renderizarCesto(); // Re-renderiza o cesto
}

function renderizarCesto() {
    const cestoContainer = document.getElementById('produtos-cesto');
    const precoTotalContainer = document.getElementById('preco-total');
    cestoContainer.innerHTML = ''; // Limpa o cesto antes de renderizar
    let precoTotal = 0;

    const cesto = JSON.parse(localStorage.getItem('cesto')) || [];
    
    cesto.forEach((produto, index) => {
        // Cria o artigo do cesto
        const artigoCesto = document.createElement('article');
        
        const imagem = document.createElement('img');
        imagem.src = produto.image;
        imagem.alt = produto.title;
        imagem.width = 100;

        const titulo = document.createElement('h3');
        titulo.textContent = produto.title;

        const preco = document.createElement('p');
        preco.innerHTML = `<strong>Preço:</strong> €${produto.price}`;

        precoTotal += produto.price;

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = "Remover";
        botaoRemover.onclick = () => removerDoCesto(index); // Passa o índice para remover o produto correto

        artigoCesto.appendChild(imagem);
        artigoCesto.appendChild(titulo);
        artigoCesto.appendChild(preco);
        artigoCesto.appendChild(botaoRemover);

        cestoContainer.appendChild(artigoCesto);
    });

    precoTotalContainer.textContent = `Preço Total: €${precoTotal.toFixed(2)}`;
}

function criaProdutoCesto(produto) {
    const artigoCesto = document.createElement('article');
    
    const imagem = document.createElement('img');
    imagem.src = produto.image;
    imagem.alt = produto.title;
    imagem.width = 100;

    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;

    const preco = document.createElement('p');
    preco.innerHTML = `<strong>Preço:</strong> €${produto.price}`;

    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = "Remover";
    botaoRemover.onclick = () => removerDoCesto(produto);

    artigoCesto.appendChild(titulo);
    artigoCesto.appendChild(imagem);
    artigoCesto.appendChild(preco);
    artigoCesto.appendChild(botaoRemover);

    return artigoCesto;
}




function atualizarPrecoTotal(cesto) {
    const cestoContainer = document.getElementById('produtos-cesto');
    const precoTotal = cesto.reduce((total, produto) => total + produto.price, 0);

    const elementoPrecoTotal = document.createElement('p');
    elementoPrecoTotal.innerHTML = `<strong>Preço Total:</strong> €${precoTotal.toFixed(2)}`;
    elementoPrecoTotal.style.fontWeight = 'bold';

    cestoContainer.appendChild(elementoPrecoTotal);
}


