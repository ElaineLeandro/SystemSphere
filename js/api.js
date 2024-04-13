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

// Função para exibir produtos na página
function displayProducts (products) {
  const productContainer = document.getElementById('products-container');

  // Limpar o container de produtos
  productContainer.innerHTML = '';

  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product-card', 'min-h-[196px]', 'lg:h-[350px]', 'lg:w-[270px]', 'bg-slate-200', 'flex', 'flex-col', 'justify-between');
    productElement.innerHTML = `
    <div class="flex flex-col h-full"> 
      <div class="p-2">
        <div class=" flex justify-between">
          <div class="bg-red-600 w-[60px] h-[30px] rounded-md text-center">
            40%
          </div>
          <img class="w-7" src="../src/assets/iconesmall.png" alt="coracao">
        </div>
        <div class=" px-4">
          <img class="p-[40px] img" src="${product.image}" alt="${product.title}">
        </div>
      </div>

      <div class="w-full h-[90px] flex-col justify-start items-start gap-2 flex">
        <div class="text-black text-base font-medium font-['Poppins'] leading-normal">${product.title}</div>
        <div class="justify-start items-start gap-3 flex flex-col">
          <div class="text-red-500 text-base font-medium font-['Poppins'] leading-normal">$${product.price}</div>
          <div class="opacity-50 text-black text-base font-medium font-['Poppins'] leading-normal">
            ${product.rating.rate}
          </div>
        </div>
      </div>
    </div>
    <button class="buy-button mt-auto bg-black w-full">Comprar</button>
    
    
    
    `;

    productContainer.appendChild(productElement);
  });
}

// Chamar a função fetchProducts quando a página carregar
window.onload = fetchProducts;
