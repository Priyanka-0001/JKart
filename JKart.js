// ===================== Users Info =====================
// Get users from localStorage or create default users
let usersInfo = JSON.parse(localStorage.getItem("usersInfo")) || [
    {
        name: "Riya",
        phone: "1234567890",
        email: "r@gmail.c0m",
        dob: "2003-11-19",
        password: "1234",
        image: "https://cdn.pixabay.com/photo/2025/09/30/21/24/waterfall-9865189_1280.jpg"
    },
    {
        name: "Kush",
        phone: "1234767890",
        email: "k@gmail.c0m",
        dob: "2025-12-04",
        password: "5678",
        image: "https://cdn.pixabay.com/photo/2025/09/30/21/24/waterfall-9865189_1280.jpg"
    },
    {
        name: "lavanya",
        phone: "1234567980",
        email: "l@gmail.c0m",
        dob: "2025-10-04",
        password: "7890",
        image: "https://cdn.pixabay.com/photo/2025/09/30/21/24/waterfall-9865189_1280.jpg"
    }
];

console.log("Current users in system:", usersInfo);


// ===================== Register Function =====================
function addInfo(e) {
    e.preventDefault(); // stop page reload
    console.log("Register button clicked");

    // get input values
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let dob = document.getElementById("date").value;
    let password = document.getElementById("pwd").value;
    let image =
        document.getElementById("img").value ||
        "https://cdn.pixabay.com/photo/2025/09/30/21/24/waterfall-9865189_1280.jpg";

        // ================= DUPLICATE USER CHECK =================
    let exists = usersInfo.some(user => user.email === email);

    if (exists) {
        alert("User already exists! Please login.");
        window.location.href = "./login.html";
        return; // stop registration
    }

    // create user object
    let user = { name, phone, email, dob, password, image };

    // add user and save
    usersInfo.push(user);
    localStorage.setItem("usersInfo", JSON.stringify(usersInfo));

    console.log("User registered:", user);
    alert("Registered Successfully!");

    // redirect to login
    window.location.href = "./login.html";
}


// ===================== Login Function =====================
function CheckLogin(e) {
    e.preventDefault(); // stop reload
    console.log("Login button clicked");

    let email = document.getElementById("uname").value;
    let pwd = document.getElementById("upwd").value;

    let storedUsers = JSON.parse(localStorage.getItem("usersInfo")) || [];
    console.log("Stored users:", storedUsers);

    // check credentials
    let isPresent = storedUsers.filter(
        user => email === user.email && pwd === user.password
    );

    if (isPresent.length > 0) {
        console.log("Login successful:", isPresent[0]);
        //Store logged-In User
        localStorage.setItem("loggedInUser", JSON.stringify(isPresent[0]));
        
        alert("Login Successful!");
        window.location.href = "./homepage.html";
    } else {
        console.log("Login failed");
        alert("Login Failed! Please check details.");
    }
}


// ===================== Fetch Products =====================
async function fetchData() {
    console.log("Fetching products...");

    let res = await fetch("https://dummyjson.com/products");
    let data = await res.json();

    let cards = document.querySelectorAll(".card");

    for (let i = 0; i < cards.length && i < data.products.length; i++) {
        let product = data.products[i];
        let card = cards[i];

        // set product details
        card.querySelector(".pimage").src = product.thumbnail;
        card.querySelector(".pimage").alt = product.title;
        card.querySelector(".brand").innerText = product.brand;
        card.querySelector(".model").innerText = product.title;
        card.querySelector(".price").innerHTML =
            `<strike>M.R.P: ${product.price}</strike><br>
             <big>Offer: ${Math.round(product.price * 0.85)}</big>`;
        card.querySelector(".rating").innerText = `⭐ ${product.rating}`;

        // ===================== Add To Cart Button =====================
        let addBtn = card.querySelector(".btn-warning");

        if (addBtn) {
            addBtn.onclick = function () {
                addToCart(product);
                renderQtyControls(addBtn, product);
        };
        }
    }
}

// ===================== Add To Cart Logic =====================
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    // check if product already exists in cart
    let existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        // if exists, increase quantity
        existingProduct.quantity += 1;
    } else {
        // if new product, add with quantity = 1
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: 1
        });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));
    updateCartCount();
    console.log("Product added to cart:", product);
    alert("Product added to cart!");
}


// ===================== Render Quantity Controls =====================
function renderQtyControls(btn, product) {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    let item = cart.find(p => p.id === product.id);

    if (!item) return;

    // Replace only the button area, not whole card
    let parent = btn.parentElement;

    parent.querySelector(".btn-warning").remove();

    parent.insertAdjacentHTML("beforeend", `
        <div class="qtyBox" data-id="${product.id}">
            <button onclick="decreaseQty(${product.id})">−</button>
            <span>${item.quantity}</span>
            <button onclick="increaseQty(${product.id})">+</button>
        </div>
    `);
}

// ===================== Update Cart Count =====================
function updateCartCount() {    
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || []; // get cart from storage
    let totalQty = 0;

    cartItems.forEach(item => {
        totalQty += item.quantity;
    });

    let cartCountSpan = document.getElementById("cartCount");    
    if (cartCountSpan) {    
        cartCountSpan.innerText = totalQty;    
    }    
}

// ===================== Homepage Detection =====================
if (document.querySelectorAll(".card").length > 0) {  
    console.log("Homepage detected, fetching products...");  
    fetchData();  

    // ✅ Show current cart count on page load
    updateCartCount();
}

// ===================== Show Cart Items =====================
function showCart() {
    let cartContainer = document.querySelector(".cartContainer");
    if (!cartContainer) return;

    let cartData = JSON.parse(localStorage.getItem("cartItems")) || [];
    console.log("Cart data:" , cartData);

    cartContainer.innerHTML = ""; // clear old content

    if (cartData.length === 0) {
        cartContainer.innerHTML = "<h3>Your cart is empty</h3>";
        return;
    }

    let grandTotal = 0;

     // display cart items
    for (let i = 0; i < cartData.length; i++) {
        let product = cartData[i];

        let itemTotal = product.price * product.quantity;
        grandTotal += itemTotal;

        let div = document.createElement("div");
        div.className = "cartCard";

        div.innerHTML = `
            <img src="${product.thumbnail}">
            <div class="cartDetails">
                <h4>${product.title}</h4>
                <p>Price: ₹${product.price}</p>
                <div class="qtyBox">
                    <button onclick="decreaseQty(${product.id})">−</button>
                    <span>${product.quantity}</span>
                    <button onclick="increaseQty(${product.id})">+</button>
                </div>
                <p>Total: ₹${product.price * product.quantity}</p>
            </div>

            <div class="cartActions">
            <button onclick="removeFromCart(${product.id})">Remove</button>
            </div>
        `;
        cartContainer.appendChild(div);
    }

    // show grand total
    let totalDiv = document.createElement("h2");
    totalDiv.innerText = "Grand Total: ₹" + grandTotal;
    cartContainer.appendChild(totalDiv);
}


function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cartItems", JSON.stringify(cart));

    showCart(); // refresh the cart UI
    updateCartCount(); 
}

if (document.querySelector(".cartContainer")) {
    showCart();// call cart function
}



// ===================== Cart Quantity Functions =====================
function increaseQty(id) {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    let item = cart.find(p => p.id === id);
    if (item) {
        item.quantity++;
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));
    updateCartCount();
    refreshHomeQty(id);   
    showCart();
}

function decreaseQty(id) {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    let index = cart.findIndex(p => p.id === id);

    if (index !== -1) {
        cart[index].quantity--;

        if (cart[index].quantity === 0) {
            cart.splice(index, 1);
        }
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));
    updateCartCount();
    refreshHomeQty(id);   
    showCart();
}

function refreshHomeQty(id) {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    let item = cart.find(p => p.id === id);

    let qtyBox = document.querySelector(`.qtyBox[data-id="${id}"]`);

    if (!qtyBox) return;

    if (!item) {
        qtyBox.remove(); // quantity = 0
        return;
    }

    qtyBox.querySelector("span").innerText = item.quantity;
}


// ===================== Debug =====================
console.log("JKart.js Loaded");
