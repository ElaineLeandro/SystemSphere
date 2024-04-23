// Função para buscar produtos da API
async function fetchProducts () {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    displayProducts(data);
    console.log(data)
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  }
}


async function addToCart (product) {
  try {
    const response = await fetch('https://fakestoreapi.com/carts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: 1,
        date: new Date().toISOString().split('T')[0],
        products: [product]
      })
    });
    const data = await response.json();
    console.log(data);

    // Recupere o carrinho do localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Adicione o produto ao carrinho
    cart.push(product);

    // Armazene o carrinho no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error adding product to cart', error);
  }
}

function generateStars (rating) {
  let starsHtml = '';

  for (let i = 0; i < Math.floor(rating); i++) {
    starsHtml += `<img src="../src/assets/star.png">`;
  }
  for (let i = Math.ceil(rating); i < 5; i++) {
    starsHtml += `<img src="../src/assets/star1.png">`;
  }
  return starsHtml;
}

let displayedProducts = 4;

// Função para exibir produtos na página
function displayProducts (products) {
  const productContainer = document.getElementById('products-container');

  // Limpar o container de produtos
  productContainer.innerHTML = '';

  for (let i = 0; i < displayedProducts; i++) {
    const product = products[i];
    const productElement = document.createElement('div');
    productElement.classList.add('product-card', 'min-h-[196px]', 'lg:h-[350px]', 'lg:w-[270px]', 'flex', 'flex-col', 'justify-between', 'shadow-lg', 'transition-all', 'duration-200', 'ease-in-out');
    productElement.innerHTML = `
    <div class="relative m-10 flex w-full max-w-md flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
    <a class="relative mx-3 mt-3 flex h-48 overflow-hidden rounded-xl" href="#">
      <img class="object-cover w-full h-full" src="${product.image}" alt="product image" />
      <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">${product.sale ? `${product.discount}% OFF` : '39%'}</span>
    </a>
    <div class="mt-4 px-5 pb-5 flex flex-col">
      <a href="#">
        <h5 class="text-xl tracking-tight text-slate-900">${product.title}</h5>
      </a>
      <div class="mt-2 mb-5 flex items-center justify-between">
        <p>
          <span class="text-3xl font-bold text-slate-900">$${product.price}</span>
        </p>
        <div class="flex items-center">
          ${generateStars(product.rating.rate)}
          <span class="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">${product.rating.rate}</span>
        </div>
      </div>
      <button href="#" id="buy-button" class="flex items-center justify-center h-10 justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Add to cart</
      </button>
    </div>
    </div>  
    `;



    const buyButton = productElement.querySelector('#buy-button');
    buyButton.addEventListener('click', () => {
      addToCart(product);
    });

    document.querySelector('.load-more-button').addEventListener('click', function () {
      displayedProducts += 4;
      displayProducts(products);
    });

    productContainer.appendChild(productElement);
  };
}


// Chamar a função fetchProducts quando a página carregar
window.onload = fetchProducts;
