function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items-container');

    cartItemsContainer.innerHTML = '';

    //Recuperando produtos do localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verificando se o carrinho está vazio
    if (cart.length === 0) {
        // Mensagem de carrinho vazio
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Seu carrinho está vazio. Adicione produtos ao seu carrinho.';
        emptyCartMessage.className = 'empty-cart-message';
        emptyCartMessage.style.whiteSpace = 'pre-line';

        const addButton = document.createElement('button');
        addButton.textContent = 'CONTINUAR COMPRANDO';
        addButton.className = 'empty-cart-button';
        addButton.addEventListener('click', () => {
            window.location.href = '/index.html';
        });

        emptyCartMessage.appendChild(addButton);
        cartItemsContainer.appendChild(emptyCartMessage);
    } else {

        const headerCartElement = document.createElement('div');
        headerCartElement.className = 'header-cart';
        headerCartElement.innerHTML = `
            <div class="header-item">Product</div>
            <div class="header-item">Price</div>
            <div class="header-item">Quantity</div>
            <div class="header-item">Subtotal</div>
        `;
        cartItemsContainer.appendChild(headerCartElement);

        // Produtos exibidos abaixo do header-cart
        const cartItemsContent = document.createElement('div');
        cartItemsContent.className = 'cart-items-content';
        cartItemsContainer.appendChild(cartItemsContent);

        // Iterando sobre cada item do carrinho para exibir os detalhes
        cart.forEach(product => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');

            cartItemElement.innerHTML = `
                <div class="info-product">
                    <div class="title-image">
                        <a href="#" target="_blank"><img src="${product.image}" alt="${product.title}" class="cart-item-image"></a>
                        <p>${product.title}</p>
                    </div>
                    <div class="info-details">
                        <p class="price">R$${product.price}</p>
                        <select id="quantity-${product.id}" class="item-quantity">
                            ${generateQuantityOptions(product.quantity)}
                        </select>
                        <p id="total-price-${product.id}" class="total-price">R$${(product.price * product.quantity).toFixed(2)}</p>
                    </div>
                </div>
            `;

            cartItemsContent.appendChild(cartItemElement);

            // Adiciona evento onchange ao seletor de quantidade
            const quantitySelect = document.getElementById(`quantity-${product.id}`);
            quantitySelect.addEventListener('change', () => {
                updateTotalPrice(product.id);
            });
        });
    }
}

// Função para atualizar o preço total com base na quantidade selecionada
function updateTotalPrice(productId) {
    const quantitySelect = document.getElementById(`quantity-${productId}`);
    if (!quantitySelect) {
        console.error(`Element with ID "quantity-${productId}" not found.`);
        return;
    }

    const selectedQuantity = parseInt(quantitySelect.value, 10); 

    const product = getProductById(productId); 

    if (!product) {
        console.error(`Product with ID "${productId}" not found.`);
        return;
    }

    if (isNaN(selectedQuantity) || selectedQuantity <= 0) {
        console.error(`Invalid quantity selected for product ID "${productId}".`);
        return;
    }

    const totalPriceElement = document.getElementById(`total-price-${productId}`);
    if (!totalPriceElement) {
        console.error(`Element with ID "total-price-${productId}" not found.`);
        return;
    }

    const totalPrice = product.price * selectedQuantity;
    totalPriceElement.textContent = `R$${totalPrice.toFixed(2)}`;

    updateCartItemQuantity(productId, selectedQuantity);
}

function getProductById(productId) {

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find(item => item.id === productId);
    return product;
}

// Função auxiliar para gerar opções de quantidade
function generateQuantityOptions(selectedQuantity) {
    const maxQuantity = 10; // Definir a quantidade máxima permitida
    let options = '';

    for (let i = 1; i <= maxQuantity; i++) {
        if (i === selectedQuantity) {
            options += `<option value="${i}" selected>${i}</option>`;
        } else {
            options += `<option value="${i}">${i}</option>`;
        }
    }

    return options;
}

// Chama a função para exibir os itens do carrinho quando a página do carrinho carregar
window.onload = displayCartItems;
