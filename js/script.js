class Produto {
    constructor(id, nome, preco, categoria) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
    }
}

class Carrinho {
    constructor() {
        this.produtos = [];
    }

    adicionarProduto (produto) {
        this.produtos.push({ ...produto });
    }

    removerProduto (id) {
        this.produtos = this.produtos.filter(produto => produto.id !== id);
    }

    calcularTotal () {
        return this.produtos.reduce((total, produto) => total + produto.preco, 0);
    }
}

class Usuario {
    constructor(nome) {
        this.nome = nome;
        this.carrinho = new Carrinho();
    }
}

let produtos = [
    new Produto(1, "Monitor", 760, "Monitores e suportes"),
    new Produto(2, "Teclado", 50, "Mouses e teclados"),
    new Produto(3, "Mouse", 30, "Mouses e teclados"),
    new Produto(4, "Notebook", 2500, "Computadores"),
    new Produto(5, "Impressora", 400, "Impressoras"),
    new Produto(6, "Webcam", 75, "Videoconferência")
];

let usuario = new Usuario(prompt("Digite seu nome"));

while (true) {
    let opcao = prompt("Selecione uma opção:\n1. Adicionar produto ao carrinho\n2. Remover produto do carrinho\n3. Exibir carrinho\n4. Efetuar compra\n5. Ver produtos disponíveis\n6. Sair");


    if (opcao === '1') {
        let id = parseInt((prompt("Digite o id do produto que deseja adicionar ao carrinho:")));
        let produto = produtos.find(produtos => produtos.id === id);

        (produto ? (() => { usuario.carrinho.adicionarProduto(produto); alert("Produto adicionado com sucesso"); })()
            : alert("Produto não encontrado. Por favor, insira um id válido."));
    }
    else if (opcao === '2') {
        let id = parseInt((prompt("Digite o id do produto que deseja remover do carrinho:")));
        usuario.carrinho.removerProduto(id);
        alert("Produto removido do carrinho com sucesso!");
    }
    else if (opcao === '3') {
        const produtosNoCarrinho = usuario.carrinho.produtos.map(produto => {
            const { id, nome, preco, categoria } = produto;
            return `ID: ${id}, Nome: ${nome}, Preço: R$ ${preco.toFixed(2)}, Categoria: ${categoria}`;
        })

        const totalCarrinho = usuario.carrinho.calcularTotal().toFixed(2)

        const mensagemCarrinho = [
            "Produtos no carrinho",
            ...produtosNoCarrinho,
            `Total: R$ ${totalCarrinho}`
        ].join("\n")

        alert(mensagemCarrinho);
    }
    else if (opcao === '4') {
        let total = usuario.carrinho.calcularTotal();
        let metodoPagamento = prompt('Digite o método de pagamento (1 para dinheiro, 2 para cartão):');
        let resumo = 'Compra finalizada.\nNome: ' + usuario.nome + '\nTotal Da Compra: ' + total + '\nMétodo de pagamento: ' + (metodoPagamento === '1' ? 'Dinheiro' : 'Cartão') + '\nProdutos:\n';
        for (let produto of usuario.carrinho.produtos) {
            resumo += 'Id: ' + produto.id + ', Nome: ' + produto.nome + ', Preço: ' + produto.preco + ', Categoria: ' + produto.categoria + '\n';
        }
        alert(resumo);
        usuario.carrinho = new Carrinho();
    }
    else if (opcao === '5') {
        alert("Produtos disponíveis:\n" + produtos.map(produto => `ID: ${produto.id}, Nome: ${produto.nome}, Preço: R$ ${produto.preco.toFixed(2)}, Categoria: ${produto.categoria}`).join("\n"));
    }
    else if (opcao === '6') {
        alert("Saindo do sistema. Até logo!");
        break;
    }
    else {
        alert("Opção inválida. Por favor, selecione novamente.");
    }
}

// 