function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items-container');
  
    // Limpa o container de itens do carrinho
    cartItemsContainer.innerHTML = '';
  
    // Recupera os itens do carrinho do localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    if(cart.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Carrinho vazio.',
        text: 'Seu carrinho está vazio. Adicione itens antes de continuar.',
        showConfirmButton: true,
        confirmButtonText: 'OK'
      });
    } else {
      cart.forEach(product => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
      
        // Constrói o HTML para exibir o item do carrinho
      cartItemElement.innerHTML = `
      <div class="info-product">
        <div class="tittle-image">
        <a href="#" target="blank"><img src="${product.image}" alt="${product.title}" class="cart-item-image"></a>
        <p>${product.title}</p>
        </div>
        
        <div class="info-details">
          <p>R$${product.price}</p>
          <select id="quantity-${product.id}" class="item-quantity"">
            ${generateQuantityOptions(product.quantity)}
          </select>
          <p id="total-price-${product.id}" class="total-price">R$${(product.price * product.quantity).toFixed(2)}</p>
          </div>
      </div>
    `;
  
  cartItemsContainer.appendChild(cartItemElement);
  // Adiciona evento onchange ao seletor de quantidade
  const quantitySelect = document.getElementById(`quantity-${product.id}`);
  quantitySelect.addEventListener('change', () => {
    updateTotalPrice(product.id);
  });
  });
    }
      // Atualiza o preço total com base na quantidade selecionada
      function updateTotalPrice() {
        const quantitySelect = document.getElementById(`quantity-${product.id}`);
        const selectedQuantity = parseInt(quantitySelect.value, 10); // Obtém a quantidade selecionada como um número inteiro
        const totalPrice = product.price * selectedQuantity;
        totalPriceElement.textContent = `Total: R$${totalPrice.toFixed(2)}`;
      }
  
  }
  
  
  // Função para atualizar o preço total com base na quantidade selecionada
  function updateTotalPrice(productId) {
    const quantitySelect = document.getElementById(`quantity-${productId}`);
    const selectedQuantity = parseInt(quantitySelect.value, 10); // Obtém a quantidade selecionada como um número inteiro
  
    const product = getProductById(productId); // Supondo que você tenha uma função para obter o produto pelo ID
  
    if (product && !isNaN(product.price) && !isNaN(selectedQuantity)) {
      const totalPriceElement = document.getElementById(`total-price-${productId}`);
      const totalPrice = product.price * selectedQuantity;
      totalPriceElement.textContent = `Total: R$${totalPrice.toFixed(2)}`;
    }
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
  
   // Ao carregar a página, verifica se o carrinho está vazio e exibe o SweetAlert se necessário
   if (JSON.parse(localStorage.getItem('cart')).length === 0) {
    Swal.fire({
      icon: 'info',
      title: 'Carrinho Vazio',
      text: 'Seu carrinho está vazio. Adicione itens antes de continuar.',
      showConfirmButton: true,
      confirmButtonText: 'OK'
    });
  };
  