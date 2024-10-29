console.log("ab");

const menuContainer = document.querySelector(".menu-grid");
const categoryBtn = document.querySelector(".category-buttons");
let basket = JSON.parse(localStorage.getItem("data")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart = JSON.parse(localStorage.getItem("addtocart")) || [];

function showBtn(){
    const uniqueCategory = foodItemData.reduce((values, item) => {
        if(!values.includes(item.category)){
            values.push(item.category);
        }
        return values;
    }, ['all']);
    // console.log(uniqueCategory);
    
    const showCategoryBtn = uniqueCategory.map((btn) => {
        return `
            <button class="category-btn" data-category=${btn}>${btn}</button>
        `
    }).join("");

    categoryBtn.innerHTML = showCategoryBtn;

    const reciveBtn = categoryBtn.querySelectorAll('.category-btn');

    reciveBtn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const selectedBtn = e.target.dataset.category;
            const allFoodData = foodItemData.filter((item) => {
                if(item.category === selectedBtn){
                    return item;
                }
            })

            if(selectedBtn === "all"){
                generateFoodCart(foodItemData)
            }else{
                generateFoodCart(allFoodData)
            }
            
        })
    })
};

const generateFoodCart = (data) => {
  return (menuContainer.innerHTML = data
    .map((x) => {
        let {id, name, desc, rating, price, img, isWishList} = x;
        let search = basket.find((x) => x.id === id) || [];
      return `
         <div id="product-id-${id}" class="card" data-category="pizza">
                <img src=${img} alt="Delicious Pizza">
                <div class="card-content">
                    <div class="rating">★★★★★</div>
                    <h4>${name}</h4>
                    <p>${desc}</p>
                    <div class="quantity-section">
                        <button onclick="decrement(${id})" class="quantity-btn minus">-</button>
                        <div id="${id}" class="quantity-input">
                        ${search.length === 0 ? 0 : search.item}
                        </div>
                        <button onclick="increment(${id})" class="quantity-btn plus">+</button>
                    </div>
                    <div class="card-footer">
                        <button onclick="addWishlist(${id})" class="wishlist-btn">Wishlist</button>
                        <button onclick="addToCard(${id})" class="cart-btn">Add to Cart</button>
                        <span class="price">৳ ${price}</span>
                    </div>
                </div>
            </div>
        `;
    })
    .join(""));
};

generateFoodCart(foodItemData);
showBtn();

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

const addWishlist = (id) => {
    // console.log(id);
    let selectedId = id;
    let search = wishlist.find((x) => x.id === id)

    if(!search){
        wishlist.push({id: selectedId})
    }else{
        alert("Eta apni add korechen")
    }
    // console.log(wishlist);
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
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