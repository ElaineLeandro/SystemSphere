class Produto {
    constructor(id, nome, preco) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
    }
}

class Carrinho {
    constructor() {
        this.produtos = [];
    }

    adicionarProduto (produto) {
        this.produtos.push(produto);
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
    new Produto(1, "Camiseta", 50, "Vestuário"),
    new Produto(2, "Tv", 150, "Eletronicos"),
    new Produto(3, "Pasta de dente", 30, "Saude"),
    new Produto(4, "Garrafa de vinho", 130, "Bebidas"),
    new Produto(5, "Iphone", 3000, "Celulares"),
    new Produto(6, "Salgadinho", 20, "Comida")
];

let usuario = new Usuario(prompt("Digite seu nome"));


while (true) {
    let opcao = prompt("Selecione uma opção:\n1. Adicionar produto ao carrinho\n2. Remover produto do carrinho\n3. Exibir carrinho\n4. Efetuar compra");


    if (opcao === '1') {
        let id = parseInt((prompt("Digite o id do produto que deseja adicionar ao carrinho:")));
        let produto = produtos.find(produtos => produtos.id === id);
        if (produto) {
            usuario.carrinho.adicionarProduto(produto);
            alert("Produto adicionado ao carrinho com sucesso!");
        } else {
            alert("Produto não encontrado. Por favor, insira um id válido.");
        }
    }
    else if (opcao === '2') {
        let id = parseInt((prompt("Digite o id do produto que deseja remover do carrinho:")));
        usuario.carrinho.removerProduto(id);
        alert("Produto removido do carrinho com sucesso!");
    }
    else if (opcao === '3') {
        alert("Produtos no carrinho:\n" + usuario.carrinho.produtos.map(produto => `ID: ${produto.id}, Nome: ${produto.nome}, Preço: R$ ${produto.preco.toFixed(2)}`).join("\n") + "\nTotal: R$ " + usuario.carrinho.calcularTotal().toFixed(2));
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
    else {
        alert("Opção inválida. Por favor, selecione novamente.");
    }
}
