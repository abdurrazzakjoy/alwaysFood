const wishlistItems = document.querySelector("#wishlist-items");
const clearBtn = document.querySelector(".clear-wishlist-btn");
const container = document.querySelector(".container");
const productModal = document.querySelector("#product-modal");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let basket = JSON.parse(localStorage.getItem("data")) || [];
let cart = JSON.parse(localStorage.getItem("addtocart")) || [];

const generateWishItem = () => {
  if (wishlist.length !== 0) {
    return (wishlistItems.innerHTML = wishlist
      .map((x) => {
        let { id } = x;
        let search = foodItemData.find((x) => x.id === id);
        return `
        <div class="card" onclick="showModal(${id})">
                <img src=${search.img} alt="Delicious Pizza">
                <div class="card-content">
                    <h4>${search.name}</h4>
                    <p>${search.desc}</p>
                    <div class="card-footer">
                        <span class="price">৳ ${search.price}</span>
                        <button onclick="removeWishItem(${id})" class="remove-btn">Remove</button>
                    </div>
                </div>
            </div>
        `;
      })
      .join(""));
  } else {
    clearBtn.classList.add("none");
    container.innerHTML = `        
            <h2>Your Wishlist</h2>
            <h1 class="emptyWishlist">Empty</h1>
            <a href="index.html" class="clear-wishlist-btn">Back home</a>
        `;
  }
};

generateWishItem();

const removeWishItem = (id) => {
  let selectedId = id;
  wishlist = wishlist.filter((x) => x.id !== selectedId);
  generateWishItem();
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

clearBtn.addEventListener("click", () => {
  wishlist = [];
  generateWishItem();
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
});

function showModal(id) {
  let selectedId = id;
  console.log(selectedId);
  productModal.style.display = "block";

  let search = foodItemData.find((x) => x.id === id) || [];
  // console.log(search);
  let findIdInBasket = basket.find((y) => y.id === id) || [];

  productModal.innerHTML = `
  <div class="modal-content">
              <span onclick="modalClose()" class="close" id="close-modal">&times;</span>
              <img id="product-image" src=${search.img} alt="Product Image" />
              <h4 id="product-title">${search.name}</h4>
              <p id="product-description">${search.desc}</p>
            <div class="quantity-section">
              <button onclick="decrement(${id})" class="quantity-btn minus">-</button>
              <div id="${id}" class="quantity-input"> 
              ${findIdInBasket.length === 0 ? 0 : findIdInBasket.item}
              </div>
              <button onclick="increment(${id})" class="quantity-btn plus">+</button>
            </div>
            <div class="modal-footer">
              <button onclick="addToCard(${id})" class="cart-btn">Add to Cart</button>
              <span class="price" id="product-price">৳ ${search.price}</span>
            </div>
          </div>
   `
}

const increment = (id) => {
  let selectedId = id;
  let search = basket.find((x) => x.id === selectedId)

  if(!search){
      basket.push({
          id: selectedId,
          item: 1,
      })
  }else{
      search.item += 1
  }
  console.log(basket);
  update(selectedId)
  
  localStorage.setItem("data", JSON.stringify(basket))
}

const decrement = (id) => {
  let selectedId = id;
  let search = basket.find((x) => x.id === selectedId)

  if(!search) return;
  else if(search.item === 0) return;
  else{
      search.item -= 1
  }

  update(selectedId)

  basket = basket.filter((x) => x.item !== 0)

  localStorage.setItem("data", JSON.stringify(basket))
  
  console.log(basket);
  
}

const update = (id) => {
  let search = basket.find((x) => x.id === id)
  document.getElementById(id).innerText = search.item
}

const addToCard = (id) => {
  let selectedId = id;
  let search = cart.find((x) => x.id === id)
  let basSearch = basket.find((x) => x.id === selectedId)

  if(!basSearch || basSearch.item === 0) return;
  if(!search){
      cart.push({
          id: selectedId,
      })
  }

  localStorage.setItem("addtocart", JSON.stringify(cart))
}

const modalClose = () => {
  productModal.style.display = "none";
}