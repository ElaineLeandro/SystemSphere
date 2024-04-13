
 // Suponha que você tenha uma função para verificar se o carrinho está vazio
 function isCarrinhoVazio() {
    // Lógica para verificar se o carrinho está vazio
    // Exemplo: verificar se a quantidade de itens no carrinho é zero
    return quantidadeDeItensNoCarrinho === 0; // Substitua quantidadeDeItensNoCarrinho pelo código correto
}

// Quando a página carregar, verifique se o carrinho está vazio
document.addEventListener('DOMContentLoaded', function() {
    // Se o carrinho estiver vazio, exiba a mensagem e os botões
    if (isCarrinhoVazio()) {
        document.getElementById('carrinho-vazio').style.display = 'block';
    } else {
        document.getElementById('carrinho-vazio').style.display = 'none';
    }
});

