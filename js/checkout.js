const telefoneInput = document.getElementById('telefone');

telefoneInput.addEventListener('input', function(event) {
    const apenasDigitos = this.value.replace(/\D/g, '');
    
    if (apenasDigitos.length > 0) {
        this.value = apenasDigitos.replace(/^(\d{2})(\d{5})(\d{4}).*/, '$1-$2-$3');
    } else {
        this.value = '';
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("formulario"); // Obtém o formulário
    const salvarInfoCheckbox = document.getElementById("salvar_info"); // Obtém a caixa de seleção de salvar informações
    const confirmarEnvioBtn = document.getElementById("confirmarEnvio"); // Obtém o botão de confirmação de envio

    // Função para salvar os dados no localStorage
    function salvarDadosLocalStorage() {
        const dados = {
            nome: formulario.nome.value,
            nome_empresa: formulario.nome_empresa.value,
            endereco: formulario.endereco.value,
            complemento: formulario.complemento.value,
            cidade: formulario.cidade.value,
            telefone: formulario.telefone.value,
            email: formulario.email.value,
            produtos: JSON.parse(localStorage.getItem('cart')) || [], // Obtém os produtos do carrinho
            total: calcularTotalCart() // Calcula o total do carrinho
        };
        localStorage.setItem("dadosFaturamento", JSON.stringify(dados));
        console.log("Dados salvos no localStorage."); // Informa que os dados foram salvos no localStorage
    }

    // Função para calcular o total do carrinho
    function calcularTotalCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || []; // Obtém o carrinho
        return cart.reduce((total, product) => {
            return total + (Number(product.price) * Number(product.quantity)); // Calcula o total do carrinho
        }, 0);
    }

    // Função para enviar o formulário
    function enviarFormulario() {
        console.log("Formulário enviado!"); // Informa que o formulário foi enviado
    }

    // Função para validar se uma forma de pagamento já está selecionada
    function validarFormasDePagamento() {
        const formaCartao = document.getElementById('pagamento-cartao');
        const formaDinheiro = document.getElementById('pagamento-dinheiro');
        return !(formaCartao.checked && formaDinheiro.checked); // Retorna true se apenas uma forma de pagamento estiver selecionada
    }

    // Função para atualizar o total na página de checkout
    function updateCheckoutTotal() {
        let cart = JSON.parse(localStorage.getItem('cart')) || []; // Obtém o carrinho
        let total = 0;
        cart.forEach(product => {
            const price = Number(product.price);
            const quantity = Number(product.quantity);
            const subtotal = price * quantity;
            total += subtotal; // Calcula o total
        });
        const totalAPagarElement = document.getElementById('total-a-pagar');
        totalAPagarElement.textContent = `Total a Pagar: R$${total.toFixed(2)}`; // Atualiza o elemento HTML com o total a pagar
    }

    // Função para exibir os itens do carrinho no checkout
    function displayCartItemsInCheckout() {
        const checkoutProductsContainer = document.getElementById('cart-items-container');
        checkoutProductsContainer.innerHTML = '';
        let cart = JSON.parse(localStorage.getItem('cart')) || []; // Obtém o carrinho
        cart.forEach(product => {
            const checkoutProductElement = document.createElement('div');
            checkoutProductElement.classList.add('checkout-product');
            const totalPrice = product.price * product.quantity; // Calcula o preço total do produto
            checkoutProductElement.innerHTML = `
                <div class="cart-item">
                    <img src="${product.image}" alt="${product.title}" class="cart-item-image">
                    <div class="cart-item-description">
                        <p>${product.title}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <p>${product.quantity}</p>
                    </div>
                    <div class="cart-item-price">
                        <p>R$${totalPrice.toFixed(2)}</p>
                    </div>
                </div>
            `;
            checkoutProductsContainer.appendChild(checkoutProductElement); // Adiciona o elemento do produto ao contêiner de produtos no checkout
        });
        updateCheckoutTotal(); // Atualiza o total na página de checkout
    }

    confirmarEnvioBtn.addEventListener("click", function(event) {
        event.preventDefault(); // Impede o envio do formulário antes da validação
        if (!validarFormasDePagamento()) {
            alert("Por favor, selecione apenas uma forma de pagamento."); // Exibe um alerta se ambas as formas de pagamento estiverem selecionadas
            return;
        }
        if (salvarInfoCheckbox.checked) {
            salvarDadosLocalStorage(); // Salva os dados no localStorage se a caixa de seleção estiver marcada
        }
        enviarFormulario(); // Envia o formulário
        alert("Compra efetuada com sucesso!"); // Exibe um alerta informando que a compra foi efetuada com sucesso
    });

    // Evento de clique nas formas de pagamento
    const formasDePagamento = document.querySelectorAll('input[name^="pagamento"]');
    formasDePagamento.forEach(forma => {
        forma.addEventListener('click', function(event) {
            if (!validarFormasDePagamento()) {
                event.preventDefault(); // Impede a seleção se ambas as formas de pagamento estiverem selecionadas
            }
        });
    });

    // Verifica se há dados salvos no localStorage ao carregar a página
    if (localStorage.getItem("dadosFaturamento")) {
        const dadosSalvos = JSON.parse(localStorage.getItem("dadosFaturamento"));
        formulario.nome.value = dadosSalvos.nome;
        formulario.nome_empresa.value = dadosSalvos.nome_empresa;
        formulario.endereco.value = dadosSalvos.endereco;
        formulario.complemento.value = dadosSalvos.complemento;
        formulario.cidade.value = dadosSalvos.cidade;
        formulario.telefone.value = dadosSalvos.telefone;
        formulario.email.value = dadosSalvos.email;
        salvarInfoCheckbox.checked = true; // Marca a opção "Salvar informações" como selecionada
    }

    displayCartItemsInCheckout(); // Exibe os itens do carrinho no checkout
});















