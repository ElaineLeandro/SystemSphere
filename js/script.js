class Aluno {
    constructor(nome, turma, turno) {
        this.nome = nome;
        this.turma = turma;
        this.turno = turno;
        this.notas = [];
        this.media = 0;
    }

    adicionarNota(nota) {
        this.notas.push(nota);
    }

    calcularMedia() {
        let soma = 0;
        for (let i = 0; i < this.notas.length; i++) {
            soma += this.notas[i];
        }
        this.media = soma / this.notas.length;
    }

    getStatus() {
        if (this.media >= 7) {
            return "Aprovado";
        } else {
            return "Reprovado";
        }
    }

    exibirDetalhes() {
        return `Aluno: ${this.nome}, Turma: ${this.turma}, Turno: ${this.turno}, Média: ${this.media.toFixed(2)}, Status: ${this.getStatus()}`;
    }
}

function cadastrarAluno() {
    let nome = prompt("Insira o nome do aluno:");
    let turma = prompt("Insira a turma do aluno:");
    let turno = prompt("Insira o turno do aluno (Matutino, Vespertino ou Noturno):");

    return new Aluno(nome, turma, turno);
}

function exibirAlunos(alunos) {
    console.log("Alunos cadastrados:");
    alunos.forEach(aluno => console.log(aluno.exibirDetalhes()));
}

function main() {
    let alunos = [];

    while (true) {
        let cadastro = prompt("Selecione uma opção:\n1. Cadastrar novo aluno\n2. Encerrar");
        
        if (cadastro === "1") {
            let aluno = cadastrarAluno();
            let continuar = true;
            while (continuar) {
                let solicitarNota = prompt("Insira a nota do aluno (ou 'fim' para encerrar):");
                if (solicitarNota.toLowerCase() === 'fim') {
                    continuar = false;
                } else {
                    let nota = parseFloat(solicitarNota);
                    if (!isNaN(nota) && nota >= 0 && nota <= 10) {
                        aluno.adicionarNota(nota);
                    } else {
                        alert("Por favor, insira uma nota válida (entre 0 e 10) ou 'fim' para encerrar.");
                    }
                }
            }
            aluno.calcularMedia();
            alert(aluno.exibirDetalhes());
            alunos.push(aluno);
        } else if (cadastro === "2") {
            exibirAlunos(alunos);
            break;
        } else {
            alert("Opção inválida. Por favor, selecione novamente.");
        }
    }
}

main();