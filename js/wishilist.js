// /// para excluir item do carrinho

// function deleteItem() {
//     let card = event.target.parentNode;
//     card.style.display = 'none';
// }

// ////para adicionar item ao carrinho

function adicionarItem() {
    alert('Item adicionado ao carrinho!')
}

///

let wishlistCount = 0;

    function deleteItem() {
        let card = event.target.parentNode;
        card.style.display = 'none';
        wishlistCount = Math.max(0, wishlistCount - 1); // Garante que wishlistCount nunca seja menor que zero
        let wishlist = document.getElementById('wishlist');
        wishlist.textContent = 'Wishlist(' + wishlistCount + ')';
    }

    function addToCart() {
        // Simulando adicionar o item ao carrinho
        alert('Item adicionado ao carrinho!');
        // Atualizar o contador da lista de desejos
        wishlistCount++;
        let wishlist = document.getElementById('wishlist');
        wishlist.textContent = 'Wishlist(' + wishlistCount + ')';
    }

    function moveToCart() {
        // Simulando mover todos os itens para o carrinho
        alert('Todos os itens foram movidos para o carrinho!');
        // Limpar a lista de desejos
        wishlistCount = 0;
        let wishlist = document.getElementById('wishlist');
        wishlist.textContent = 'Wishlist(0)';
    }