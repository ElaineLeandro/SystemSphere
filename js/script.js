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



// class Usuario {
//     constructor(nome, id, email) {
//         this.nome = nome;
//         this.id = id;
//         this.email = email;
//         this.carrinho = new Carrinho();
//     }

//     adicionarNota (nota) {
//         this.notas.push(nota);
//     }

//     calcularMedia () {
//         let soma = 0;
//         for (let i = 0; i < this.notas.length; i++) {
//             soma += this.notas[i];
//         }
//         this.media = soma / this.notas.length;
//     }

//     getStatus () {
//         if (this.media >= 7) {
//             return "Aprovado";
//         } else {
//             return "Reprovado";
//         }
//     }

//     exibirDetalhes () {
//         return `Aluno: ${this.nome}, Turma: ${this.turma}, Turno: ${this.turno}, Média: ${this.media.toFixed(2)}, Status: ${this.getStatus()}`;
//     }
// }

// function cadastrarAluno () {
//     let nome = prompt("Insira o nome do aluno:");
//     let turma = prompt("Insira a turma do aluno:");
//     let turno = prompt("Insira o turno do aluno (Matutino, Vespertino ou Noturno):");

//     return new Aluno(nome, turma, turno);
// }

// function exibirAlunos (alunos) {
//     console.log("Alunos cadastrados:");
//     alunos.forEach(aluno => console.log(aluno.exibirDetalhes()));
// }

// function main () {
//     let alunos = [];

//     while (true) {
//         let cadastro = prompt("Selecione uma opção:\n1. Cadastrar novo aluno\n2. Encerrar");

//         if (cadastro === "1") {
//             let aluno = cadastrarAluno();
//             let continuar = true;
//             while (continuar) {
//                 let solicitarNota = prompt("Insira a nota do aluno (ou 'fim' para encerrar):");
//                 if (solicitarNota.toLowerCase() === 'fim') {
//                     continuar = false;
//                 } else {
//                     let nota = parseFloat(solicitarNota);
//                     if (!isNaN(nota) && nota >= 0 && nota <= 10) {
//                         aluno.adicionarNota(nota);
//                     } else {
//                         alert("Por favor, insira uma nota válida (entre 0 e 10) ou 'fim' para encerrar.");
//                     }
//                 }
//             }
//             aluno.calcularMedia();
//             alert(aluno.exibirDetalhes());
//             alunos.push(aluno);
//         } else if (cadastro === "2") {
//             exibirAlunos(alunos);
//             break;
//         } else {
//             alert("Opção inválida. Por favor, selecione novamente.");
//         }
//     }
// }

main();