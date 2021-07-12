const baseUrl = 'https://api.mercadolibre.com/sites/MLB/';

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

/*  const createCart = (results) => {
  results.forEach((element) => {
    const objProduct = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
      salePrice: element.price,
    };
    document.querySelector('.items').appendChild(createProductItemElement(objProduct));
  });
};  */

/*  function getSkuFromProductItem(id) {
  const idForSearch = id.target.querySelector('span.item__sku').innerText;
  console.log(idForSearch);
}  */

/*  function getId(event) {
  const id = event.target.parentElement.firstElementChild.innerText;
  //  console.log(id);
}  */

/*  const getIdOnClick = () => {
  document.querySelectorAll('item__add')
    .forEach((button) => {
    button.addEventListener('click', getId);
    //  console.log(button);
  });
};  */

/*  function cartItemClickListener(event) {
  // coloque seu código aqui
}  */

/*  function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}  */

//  já tinha concluido o requisito 1, porém refiz seguindo a lógica do Oliva:

async function getApiProduct() {
  const response = await fetch(`${baseUrl}/search?q=computador`);
  const productApi = await response.json();
  return productApi;
}

window.onload = async () => {
  const products = await getApiProduct();
  products.results.forEach((product) => {
    const element = createProductItemElement(product);
    
    const items = document.querySelector('.items');
    items.appendChild(element);
  });
};
