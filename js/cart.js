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
            let price = Number(product.price);
            console.log("preco", price);
            let quantity = Number(product.quantity);
            console.log("quantidade", quantity);
            let subtotal = price * quantity;

            cartItemElement.innerHTML = `
                <div class="info-product">
                    <div class="title-image">
                        <a href="#" target="_blank"><img src="${product.image}" alt="${product.title}" class="cart-item-image"></a>
                        <p>${product.title}</p>
                    </div>
                    <div class="info-details">
                        <p class="price">R$${price.toFixed(2)}</p>
                        <select id="quantity-${product.id}" class="item-quantity">
                            ${generateQuantityOptions(product.quantity)}
                        </select>
                        <p id="total-price-${product.id}" class="total-price">R$${(subtotal).toFixed(2)}</p>
                    </div>
                </div>
            `;

            cartItemsContent.appendChild(cartItemElement);

            const quantitySelect = document.getElementById(`quantity-${product.id}`);
            quantitySelect.addEventListener('change', () => {
                updateTotalPrice(product.id);
            });

            updateTotalPrice(product.id);
        });
    }

    // div buttons  for product
    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'button-container';

    // Botão 1
    const addButtonReturn = document.createElement('button');
    addButtonReturn.textContent = 'Return To Shop';
    addButtonReturn.className = 'btnReturn';
    addButtonReturn.addEventListener('click', () => {
        window.location.href = '/index.html';
    });

    buttonDiv.appendChild(addButtonReturn);

    // Botão 2
    const addButtonUpdate = document.createElement('button');
    addButtonUpdate.textContent = 'Update Cart';
    addButtonUpdate.className = 'btnUpdate';
    addButtonUpdate.addEventListener('click', () => {
        window.location.href = 'cart.html';
    });

    buttonDiv.appendChild(addButtonUpdate);

    cartItemsContainer.appendChild(buttonDiv);

    //Container payment
    const paymentContainer = document.createElement('div')
    paymentContainer.className = 'paymentContainer';

    //testing
    const discountSection = document.createElement('div');
    discountSection.className = 'discountSection';
    // Inuput code for discount
    const inputCode = document.createElement('input');
    inputCode.placeholder = 'Coupon Code';
    inputCode.type = 'text';
    inputCode.className = 'inputCode';

    //Button Code apply discount
    const applyButton = document.createElement('button');
    applyButton.textContent = 'Apply Coupon';
    applyButton.className = 'btnApply';
    applyButton.addEventListener('click', applyCoupon);

    // Function to apply discounts
    function applyCoupon() {
        const couponCode = inputCode.value; // Obtém o valor do campo de código
        const finalAmount = applyDiscount(couponCode);
        window.location.href = 'checkout.html?amount=' + finalAmount;
    }

    discountSection.appendChild(inputCode);
    discountSection.appendChild(applyButton);
    paymentContainer.appendChild(discountSection);

    cartItemsContainer.appendChild(paymentContainer);

    // Seccion "Cart Total"
    const cartFlex = document.createElement('div');
    cartFlex.className = 'cartFlex';

    const cartTotalTitle = document.createElement('h3');
    cartTotalTitle.textContent = 'Cart Total';
    cartFlex.appendChild(cartTotalTitle);

    // Calculate the total
    let subtotal = 0;
    cart.forEach(product => {
        subtotal += product.price * product.quantity;
    });

    const shippingFee = 10; // Value of shipping
    const totalAmount = subtotal + shippingFee;

    const subtotalElement = document.createElement('p');
    subtotalElement.textContent = `Subtotal: R$${subtotal.toFixed(2)}`;
    cartFlex.appendChild(subtotalElement);

    const hr1 = document.createElement('hr');
    hr1.className = 'cart-divider';
    cartFlex.appendChild(hr1);

    const shippingFeeElement = document.createElement('p');
    shippingFeeElement.textContent = `Shipping Fee: R$${shippingFee.toFixed(2)}`;
    cartFlex.appendChild(shippingFeeElement);

    const hr2 = document.createElement('hr');
    hr2.className = 'cart-divider';
    cartFlex.appendChild(hr2);

    const totalAmountElement = document.createElement('p');
    totalAmountElement.textContent = `Total: R$${totalAmount.toFixed(2)}`;
    cartFlex.appendChild(totalAmountElement);

    // Botão para finalizar a compra
    const checkoutButton = document.createElement('button');
    checkoutButton.textContent = 'Proceed to Checkout';
    checkoutButton.className = 'btnCheckout';
    checkoutButton.addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });
    cartFlex.appendChild(checkoutButton);
    paymentContainer.appendChild(cartFlex);
    cartItemsContainer.appendChild(paymentContainer);

}

function updateCartItemQuantity(productId, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find(item => item.id === productId);

    if (!product) {
        console.error(`Product with ID "${productId}" not found.`);
        return;
    }

    product.quantity = quantity;

    localStorage.setItem('cart', JSON.stringify(cart));
}


function updateTotalPrice(productId) {
    const quantitySelect = document.getElementById(`quantity-${productId}`);
    console.log("quantitySelect", quantitySelect);
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
