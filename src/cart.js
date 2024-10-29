const cartItems = document.querySelector("#cart-items");
const cartBtn = document.querySelector(".cart-btn");
const totalSection = document.querySelector(".total-section");
const totalPrice = document.querySelector("#total-price");

let cart = JSON.parse(localStorage.getItem("addtocart")) || [];
let basket = JSON.parse(localStorage.getItem("data")) || [];

// cartBtn.addEventListener('click', () => {

// })

const generateFoodCart = () => {
  if(cart.length !== 0){
    return (cartItems.innerHTML = cart
        .map((x) => {
          let {id} = x;
          let search = foodItemData.find((y) => y.id === id);
          let basketSearch = basket.find((z) => z.id === id);
          return `
                <div class="cart-item">
                    <img src=${search.img} alt="Delicious Pizza">
                    <div class="item-details">
                        <h4>${search.name}</h4>
                        <p>${search.desc}</p>
                        <div class="quantity-section">
                            <button onclick="decrement(${id})" class="quantity-btn minus">-</button>
                            <div id="${id}" class="quantity-input">${basketSearch ? basketSearch.item : 0}</div>
                            <button onclick="increment(${id})" class="quantity-btn plus">+</button>
                        </div>
                        <span class="price">৳ ${search.price}</span>
                    </div>
                    <button onclick="removeItem(${id})" class="remove-btn">Remove</button>
                </div>
                `;
        })
    .join(""));
  }else{
    totalSection.style.display = "none";
    cartItems.innerHTML = `        
            <h1 class="emptyWishlist">Empty</h1>
            <a href="index.html" class="clear-wishlist-btn">Back home</a>
        `;
  }
};

generateFoodCart();

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
    let search = basket.find((x) => x.id === selectedId);

    if (!search) return;

    if (search.item > 1) {
        // Decrease item quantity if it's above 1
        search.item -= 1;
        update(selectedId); // Only update if the item is still in the basket
        console.log(search.item);
        
    } else {
        console.log(search.item);
        // Remove item from cart and basket if item quantity is 1
        cart = cart.filter((x) => x.id !== selectedId);
        basket = basket.filter((x) => x.id !== selectedId);
    }

    // Refresh the cart display
    generateFoodCart();
    totalCal();

    // Update local storage
    localStorage.setItem("addtocart", JSON.stringify(cart));
    localStorage.setItem("data", JSON.stringify(basket));
    
    console.log(basket);
};



const update = (id) => {
    let search = basket.find((x) => x.id === id)
    document.getElementById(id).innerText = search.item;
    totalCal();
}

const removeItem = (id) => {
    let selectedId = id;
    
    cart = cart.filter((x) => x.id !== selectedId)
    basket = basket.filter((x) => x.id !== selectedId)

    generateFoodCart()
    totalCal()

    localStorage.setItem("addtocart", JSON.stringify(cart))
    localStorage.setItem("data", JSON.stringify(basket))
}

const totalCal = () => {
    if(basket.length !== 0){
        let amount = basket.map((x) => {
            let {id, item} = x;
            let search = foodItemData.find((y) => y.id === id);

            return item * search.price
        }).reduce((x, y) => x + y, 0)

        totalPrice.innerHTML = `৳ ${amount}`
    }
}

totalCal();

const refresh = () => {
    if(basket.length === 0){
        cart = [];
        localStorage.setItem("addtocart", JSON.stringify(cart));
        generateFoodCart();
    }
}

refresh();