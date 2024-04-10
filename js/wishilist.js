// /// para excluir item do carrinho

// function deleteItem() {
//     let card = event.target.parentNode;
//     card.style.display = 'none';
// }

// ////para adicionar item ao carrinho

// function adicionarItem() {
//     alert('Item adicionado ao carrinho!')
// }

// ///

// let wishlistCount = 0;

//     function deleteItem() {
//         let card = event.target.parentNode;
//         card.style.display = 'none';
//         wishlistCount = Math.max(0, wishlistCount - 1); // Garante que wishlistCount nunca seja menor que zero
//         let wishlist = document.getElementById('wishlist');
//         wishlist.textContent = 'Wishlist(' + wishlistCount + ')';
//     }

//     function addToCart() {
//         // Simulando adicionar o item ao carrinho
//         alert('Item adicionado ao carrinho!');
//         // Atualizar o contador da lista de desejos
//         wishlistCount++;
//         let wishlist = document.getElementById('wishlist');
//         wishlist.textContent = 'Wishlist(' + wishlistCount + ')';
//     }

//     function moveToCart() {
//         // Simulando mover todos os itens para o carrinho
//         alert('Todos os itens foram movidos para o carrinho!');
//         // Limpar a lista de desejos
//         wishlistCount = 0;
//         let wishlist = document.getElementById('wishlist');
//         wishlist.textContent = 'Wishlist(0)';
//     }

// Variável para armazenar os itens no carrinho
let carrinhoItens = [];

function adicionarItem(itemId) {
    // Simular a lógica para adicionar o item ao carrinho
    carrinhoItens.push(itemId); // Adiciona o ID do item ao array de itens no carrinho
    console.log("Item adicionado ao carrinho:", itemId);
    updateCart(); // Atualiza a exibição do carrinho
}

function deleteItem(itemId) {
    // Simular a lógica para remover o item do carrinho
    const index = carrinhoItens.indexOf(itemId);
    if (index !== -1) {
        carrinhoItens.splice(index, 1); // Remove o item do array de itens no carrinho
        console.log("Item removido do carrinho:", itemId);
        updateCart(); // Atualiza a exibição do carrinho
    }
}

function moveToCart() {
    // Simular a lógica para mover todos os itens da lista de desejos para o carrinho
    console.log("Todos os itens movidos para o carrinho:", carrinhoItens);
    carrinhoItens = []; // Limpa a lista de itens no carrinho
    updateCart(); // Atualiza a exibição do carrinho
}

function updateCart() {
    const carrinhoVazio = document.getElementById('carrinho-vazio');
    const cartTotal = document.querySelector('.cart-total');
    const checkoutButton = document.querySelector('.checkout-button');

    if (carrinhoItens.length === 0) {
        // Carrinho está vazio, mostrar a mensagem e ocultar outros elementos
        carrinhoVazio.style.display = 'block';
        cartTotal.textContent = ''; // Limpar o conteúdo do total do carrinho
        checkoutButton.style.display = 'none'; // Ocultar o botão de checkout
    } else {
        // Carrinho tem itens, ocultar a mensagem de carrinho vazio e mostrar outros elementos
        carrinhoVazio.style.display = 'none';
        cartTotal.textContent = `Total do carrinho: ${carrinhoItens.length} itens`; // Exibir o total de itens no carrinho
        checkoutButton.style.display = 'block'; // Mostrar o botão de checkout
    }
}

function returnToShop() {
    // Simular a ação de voltar para a página inicial ou loja
    alert("Redirecionando para a página inicial...");
    // Implemente a lógica real de redirecionamento conforme necessário
}