const baseUrl = 'https://api.mercadolibre.com/sites/MLB/';
const cartItem = document.getElementsByClassName('cart__items')[0];
const emptyButton = document.querySelector('.empty-cart');

cartItem.innerHTML = localStorage.getItem('cartItemsSaved');

function updateLocalStorage() {
  localStorage.setItem('cartItemsSaved', cartItem.innerHTML);
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku)); 
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
}

//  já tinha concluido o requisito 1, porém refiz seguindo a lógica do Oliva:

async function getApiProduct() {
  const response = await fetch(`${baseUrl}/search?q=computador`);
  const productApi = await response.json();
  return productApi;
}

// R2.1 - Ao clicar no botao de nome Adicionar ao carrinho! de cada produto
//  na página HTML, deve obter o id do produto para inserí-lo no endpoint:

function displayLoading() {
  document.querySelector('.loading').remove();
}

function emptyFullCart() {
  cartItem.innerHTML = '';
  updateLocalStorage();
}

function cartItemClickListener(event) {
  event.target.remove(event.li);
  updateLocalStorage();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  console.log(li);
  return li;
}

function getItemInfos(id) {
  return fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((response) => response.json())
    .then((data) => createCartItemElement(data))
    .then((data) => {
      document.querySelector('.cart__items').appendChild(data);
      updateLocalStorage();
    });
}

function getSkuFromProductItem(event) {
  const idForSearch = event.target.parentNode.firstChild.innerText;
  //  console.log(idForSearch);
  getItemInfos(idForSearch);
}

function getIdOnClick() {
  document.querySelectorAll('.item__add')
    .forEach((button) => {
   button.addEventListener('click', getSkuFromProductItem);
  });
}

window.onload = async () => {
  const products = await getApiProduct();
  displayLoading();
  const items = document.querySelector('.items');
    products.results.forEach((product) => {
    const element = createProductItemElement(product);
    items.appendChild(element);
  });
  getIdOnClick();
  emptyButton.addEventListener('click', emptyFullCart);
};
