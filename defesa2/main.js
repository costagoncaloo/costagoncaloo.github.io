let produtosOriginais = [];

document.addEventListener("DOMContentLoaded", () => {
    const listaProdutos = document.getElementById('lista-produtos');
    const selectCategorias = document.getElementById('filtro-categorias');
    const ordenarPreco = document.getElementById('ordenar-preco');
    const inputPesquisa = document.getElementById('pesquisa-produto');
    const botaoCompra = document.getElementById("botao-compra");
    const botaoRemoveTudo = document.getElementById("botao-remove-tudo");
    const botaoMenosInfo = document.getElementById("botao-menos-info");

    obterCategorias()
        .then(categorias => {
            carregarCategorias(categorias);
        })
        .catch(err => {
            console.error("Erro ao obter categorias:", err);
        });

    obterProdutos()
        .then(produtos => {
            produtosOriginais = [...produtos];
            carregarProdutos(produtos);
        })
        .catch(err => {
            console.error("Erro ao obter produtos:", err);
            listaProdutos.innerHTML = "<p>Erro ao carregar produtos. Por favor, tente novamente mais tarde.</p>";
        });

    selectCategorias.addEventListener('change', () => {
        const categoriaSelecionada = selectCategorias.value;
        filtrarProdutosPorCategoria(categoriaSelecionada);
    });

    ordenarPreco.addEventListener('change', () => {
        const ordem = ordenarPreco.value; 
        ordenarProdutosPorPreco(ordem);
    });

    inputPesquisa.addEventListener('input', () => {
        const pesquisa = inputPesquisa.value.trim().toLowerCase(); // Obtém o texto digitado e normaliza para lowercase
        pesquisarProdutos(pesquisa);
    });

    botaoCompra.addEventListener('click', finalizarCompra);

    botaoRemoveTudo.addEventListener('click', removerTudoDoCesto);

    botaoMenosInfo.addEventListener('click', menosInfo());
    
    

    renderizarCesto();
});
function menosInfo() {
    const descricoes = document.querySelectorAll('descricao-produto');
    descricoes.forEach(descricao =>
        descricao.style.display = 'none' 
    )
}

function ordenarProdutosPorPreco(ordem) {
    const listaProdutos = document.getElementById('lista-produtos');
    let produtos;

    if (ordem === "none") {
        produtos = produtosOriginais;
    } else {
        produtos = JSON.parse(listaProdutos.dataset.produtos); 
        produtos.sort((a, b) => {
            if (ordem === 'asc') {
                return a.price - b.price; 
            } else if (ordem === 'desc') {
                return b.price - a.price; 
            }
        });
    }

    carregarProdutos(produtos); 
}
function pesquisarProdutos(pesquisa) {
    const listaProdutos = document.getElementById("lista-produtos");

    if (!pesquisa) {
        carregarProdutos(produtosOriginais);
    } else {
        const produtosFiltrados = produtosOriginais.filter(produto =>
            produto.title.toLowerCase().includes(pesquisa) ||
            produto.description.toLowerCase().includes(pesquisa)
        );

        carregarProdutos(produtosFiltrados); 
    }
}



async function obterCategorias() {
    const url = "https://deisishop.pythonanywhere.com/categories/";
    try {
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status}`);
        }
        const categorias = await resposta.json();
        console.log("Categorias obtidas da API:", categorias); 
        return categorias.map(c => c.trim());  
    } catch (erro) {
        console.error("Erro ao obter categorias da API:", erro);
        throw erro;
    }
}

function carregarCategorias(categorias) {
    const selectCategorias = document.getElementById('filtro-categorias');
    selectCategorias.innerHTML = '';

    const opcaoTodas = document.createElement('option');
    opcaoTodas.value = ''; 
    opcaoTodas.textContent = "Todas as categorias";
    selectCategorias.appendChild(opcaoTodas);

    categorias.forEach(categoria => {
        const opcao = document.createElement('option');
        opcao.value = categoria.trim();
        opcao.textContent = categoria.trim(); 
        selectCategorias.appendChild(opcao);
    });
}




async function obterProdutos() {
    const url = "https://deisishop.pythonanywhere.com/products/";
    try {
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status}`);
        }
        const produtos = await resposta.json();

        return produtos.map(produto => ({
            ...produto,
            category: produto.category.trim() 
        }));
    } catch (erro) {
        console.error("Erro ao obter os produtos da API:", erro);
        throw erro;
    }
}



function carregarProdutos(produtos) {
    const listaProdutos = document.getElementById("lista-produtos");
    listaProdutos.innerHTML = '';

    if (!produtos || produtos.length === 0) {
        console.log("Nenhum produto encontrado.");
        listaProdutos.innerHTML = "<p>Nenhum produto encontrado para esta categoria.</p>";
        return;
    }

    if (produtosOriginais.length === 0) {
        produtosOriginais = produtos;
    }

    produtos.forEach(produto => {
        const artigo = criarProduto(produto);
        listaProdutos.appendChild(artigo);
    });

    listaProdutos.dataset.produtos = JSON.stringify(produtos);
    console.log("Produtos carregados:", produtos);
}

function filtrarProdutosPorCategoria(categoriaSelecionada) {
    const listaProdutos = document.getElementById("lista-produtos");

    console.log("Filtrando produtos por categoria:", categoriaSelecionada);

    let produtosFiltrados;

    if (categoriaSelecionada === "") {
        produtosFiltrados = produtosOriginais;
    } else {
        produtosFiltrados = produtosOriginais.filter(produto => {
            console.log(`Comparando produto: ${produto.category} com filtro: ${categoriaSelecionada.trim()}`);
            return produto.category === categoriaSelecionada.trim(); 
        });
    }

    carregarProdutos(produtosFiltrados); 
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
    cesto.splice(index, 1);
    localStorage.setItem('cesto', JSON.stringify(cesto)); 
    renderizarCesto(); 
}
function removerTudoDoCesto() {
    localStorage.removeItem('cesto');
    renderizarCesto(); 
}

function renderizarCesto() {
    const cestoContainer = document.getElementById('produtos-cesto');
    const precoTotalContainer = document.getElementById('preco-total');
    cestoContainer.innerHTML = ''; 
    let precoTotal = 0;

    const cesto = JSON.parse(localStorage.getItem('cesto')) || [];
    
    cesto.forEach((produto, index) => {
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
        botaoRemover.onclick = () => removerDoCesto(index); 

        artigoCesto.appendChild(titulo);
        artigoCesto.appendChild(imagem);
        artigoCesto.appendChild(preco);
        artigoCesto.appendChild(botaoRemover);

        cestoContainer.appendChild(artigoCesto);
    });

    precoTotalContainer.textContent = `Preço Total: €${precoTotal.toFixed(2)}`; 
}

async function finalizarCompra() {
    const estudante = document.getElementById("estudante").checked;
    const cupao = document.getElementById("cupao").value.trim();
    const cesto = JSON.parse(localStorage.getItem('cesto')) || [];
    const produtosIds = cesto.map(produto => produto.id);

    if (produtosIds.length === 0) {
        alert("O cesto está vazio. Adicione produtos antes de finalizar a compra.");
        return;
    }

    const corpoPedido = {
        products: produtosIds,
        student: estudante,
        coupon: cupao
    };

    try {
        const resposta = await fetch("https://deisishop.pythonanywhere.com/buy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(corpoPedido)
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.error || "Erro ao processar a compra.");
        }

        const dados = await resposta.json();
        mostrarResultadoCompra(dados);

    } catch (erro) {
        console.error("Erro na compra:", erro.message);
        mostrarResultadoCompra({ error: erro.message });
    }
}

function mostrarResultadoCompra(resultado) {
    const resultadoCompra = document.getElementById("resultado-compra");
    resultadoCompra.innerHTML = "";

    if (resultado.error) {
        resultadoCompra.innerHTML = `
            <p style="color: red;">Erro: ${resultado.error}</p>
        `;
    } else {
        resultadoCompra.innerHTML = `
            <p><strong>Referência de Pagamento:</strong> ${resultado.reference}</p>
            <p><strong>Total a Pagar:</strong> €${resultado.totalCost}</p>
        `;
    }
}



