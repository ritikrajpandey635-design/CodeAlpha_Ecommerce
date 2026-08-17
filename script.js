// =========================
// SHOPPING CART
// =========================

let cart = [];


// =========================
// PRODUCT DATA
// =========================

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499
    },

    {
        id: 2,
        name: "Smart Watch",
        price: 1999
    },

    {
        id: 3,
        name: "Running Shoes",
        price: 2499
    },

    {
        id: 4,
        name: "Backpack",
        price: 999
    }
];


// =========================
// DISPLAY PRODUCTS
// =========================

const productsContainer =
    document.getElementById("products-container");


function displayProducts() {

    productsContainer.innerHTML = "";

    products.forEach(function(product) {

        const productCard =
            document.createElement("div");

        productCard.className = "product-card";

        productCard.innerHTML = `
            <div class="product-image">
                🛍️
            </div>

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="price">
                    ₹${product.price}
                </p>

                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>
        `;

        productsContainer.appendChild(productCard);
    });
}


// =========================
// ADD TO CART
// =========================

function addToCart(productId) {

    const product = products.find(function(item) {
        return item.id === productId;
    });

    cart.push(product);

    updateCartCount();

    alert(product.name + " added to cart!");
}


// =========================
// UPDATE CART COUNT
// =========================

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");

    cartCount.textContent = cart.length;
}


// =========================
// CART PANEL
// =========================

const cartButton =
    document.getElementById("cart-btn");

const cartPanel =
    document.getElementById("cart-panel");

const closeCart =
    document.getElementById("close-cart");


// Open Cart

cartButton.addEventListener("click", function() {

    cartPanel.classList.add("active");

    displayCart();
});


// Close Cart

closeCart.addEventListener("click", function() {

    cartPanel.classList.remove("active");
});


// =========================
// DISPLAY CART
// =========================

function displayCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;


    // Empty Cart

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        cartTotal.textContent = "0";

        return;
    }


    // Show Cart Products

    cart.forEach(function(product, index) {

        total += product.price;

        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div>
                <h4>${product.name}</h4>

                <p>₹${product.price}</p>
            </div>

            <button
                class="remove-btn"
                onclick="removeFromCart(${index})">

                Remove

            </button>
        `;

        cartItems.appendChild(cartItem);
    });


    // Show Total

    cartTotal.textContent = total;
}


// =========================
// REMOVE FROM CART
// =========================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCartCount();

    displayCart();
}


// =========================
// START WEBSITE
// =========================

displayProducts();
const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", function () {
    alert("Login feature coming soon!");
});
document.addEventListener("DOMContentLoaded", function () {
    const checkoutBtn = document.getElementById("checkout-btn");

    checkoutBtn.addEventListener("click", function () {
        alert("Checkout feature coming soon!");
    });
});
