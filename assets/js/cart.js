const cartContainer = document.querySelector('tbody');
const cartTotalElement = document.querySelector('.cart-total p');
const notesTextarea = document.getElementById('notes');

function fetchProducts() {
    return fetch('../assets/data.json')
        .then(response => response.json())
        .then(data => data.Products)
        .catch(error => {
            console.error('Error fetching products:', error);
            alert('Error fetching products. Please try again later.');
            return [];
        });
}

function displayCartProducts() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const user = JSON.parse(localStorage.getItem(loggedInUser));

    if (loggedInUser && user && user.cart) {
        cartContainer.innerHTML = '';

        let total = 0;

        fetchProducts().then(products => {
            user.cart.forEach(cartItem => {
                const product = products.find(p => p.Id === cartItem.id);

                if (product) {
                    const totalForProduct = product.price * cartItem.quantity;
                    total += totalForProduct;

                    const cartProductRow = document.createElement('tr');
                    cartProductRow.innerHTML = `
                        <td class="product-column">
                            <img src="${product.image}" alt="${product.Title}">
                            <div class="product-info">
                                <p>${product.Title}</p>
                                <button class="remove-btn" onclick="removeFromCart(${product.Id}, event)">Sil</button>
                            </div>
                        </td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>
                            <button class="quantity-btn"  onclick="decreaseQuantity(${product.Id},event)">-</button>
                            <span class="quantity">${cartItem.quantity}</span>
                            <button class="quantity-btn"  onclick="increaseQuantity(${product.Id},event)">+</button>
                        </td>
                        <td>${totalForProduct.toFixed(2)}</td>`;

                    cartContainer.appendChild(cartProductRow);
                }
            });

            cartTotalElement.textContent = `Total: ${total.toFixed(2)}`;

            const rows = cartContainer.querySelectorAll('tr');
            const table = document.querySelector('.cart-table');
            const summary = document.querySelector('.summary');
            const continueShoppingMessage = document.querySelector('.continue-shopping-message');

            if (rows.length === 0) {
                summary.style.display = 'none';
                table.style.display = 'none';
                continueShoppingMessage.style.display = 'block';
                cartTotalElement.textContent = 'Yekun: 0.00';
            }
            else {
                summary.style.display = 'block';
                table.style.display = 'table';
                continueShoppingMessage.style.display = 'none';
            }
        });
    }
    else {
        cartContainer.innerHTML = '<tr><td>Your cart is empty</td></tr>';
        cartTotalElement.textContent = 'Yekun: 0.00';

        const table = document.querySelector('.cart-table');
        const summary = document.querySelector('.summary');
        const continueShoppingMessage = document.querySelector('.continue-shopping-message');

        table.style.display = 'none';
        summary.style.display = 'none';
        continueShoppingMessage.style.display = 'block';
    }
    const checkoutBtn = document.querySelector('.checkout-btn a');

    checkoutBtn.addEventListener('click', function (event) {
        event.preventDefault();

        const loggedInUser = localStorage.getItem('loggedInUser');
        const user = JSON.parse(localStorage.getItem(loggedInUser));

        if (user && user.cart && user.cart.length > 0) {

            user.cart = [];
            updateLocalStorage(user);

            alert('Uğurlu ödəniş!');

            displayCartProducts();
        } 
    });
}

function updateLocalStorage(user) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    localStorage.setItem(loggedInUser, JSON.stringify(user));
}

function decreaseQuantity(productId, event) {

    const user = getUserData();
    const cartItem = user.cart.find(item => item.id === productId);

    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
        updateLocalStorage(user);
        displayCartProducts();
    }
}

function increaseQuantity(productId, event) {

    const user = getUserData();
    const cartItem = user.cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
        updateLocalStorage(user);
        displayCartProducts();
    }
}

function removeFromCart(productId) {
    const user = getUserData();
    const cartItemIndex = user.cart.findIndex(item => item.id === productId);

    if (cartItemIndex !== -1) {
        user.cart.splice(cartItemIndex, 1);
        updateLocalStorage(user);
        displayCartProducts();
    }
}

function getUserData() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    return JSON.parse(localStorage.getItem(loggedInUser));
}

displayCartProducts();



// js related with home page nav ..-------------------------------------------------------------------------------------


let loggedInUser = localStorage.getItem('loggedInUser');
let currentUser = document.getElementById('currentUser');
let loginControl = document.querySelector('.login-control');
let  burgerLoginControl = document.getElementById('burgerLoginControl');
let burgerCurrentUser = document.getElementById('burgerCurrentUser');


let user;

if (loggedInUser) {
    user = JSON.parse(localStorage.getItem(loggedInUser));
}

if (loggedInUser) {
    currentUser.innerHTML = `<a href="/assets/myprofile.html" class="logout-btn">${loggedInUser}</a>`;
    burgerCurrentUser.innerHTML = `<a href="/assets/myprofile.html" class="logout-btn">${loggedInUser}</a>`;
    loginControl.innerHTML = '<a href="/assets/index.html" onclick="logout()" class="logout-btn">Çıxış</a>';
    burgerLoginControl.innerHTML = '<a href="/assets/index.html" onclick="logout()" class="logout-btn">Çıxış</a>';
} else {
    loginControl.innerHTML = '<a href="/assets/login.html">Daxil ol</a>';
    burgerLoginControl.innerHTML = '<a href="/assets/login.html">Daxil ol</a>';
}

function logout() {
    localStorage.removeItem("loggedInUser");
    alert('Uğurlu çıxış!');
}


function productSearch() {
    const searchInput = document.querySelector('.search-input input');
    const query = searchInput.value.trim().toLowerCase();
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = '';

    if (query !== '') {
        fetch('/assets/data.json')
            .then(response => response.json())
            .then(data => {
                const searchResults = data.Products.filter(product =>
                    product.Title.toLowerCase().includes(query)
                );

                if (searchResults.length > 0) {
                    searchResults.forEach(product => {
                        const resultItem = document.createElement('div');
                        resultItem.className = 'search-result-item';
                        resultItem.innerHTML = `
                            <img src="${product.image}" alt="${product.Title}">
                            <span>${product.Title}</span>`;
                        searchResultsContainer.appendChild(resultItem);
                    });
                    searchResultsContainer.style.display = 'block';
                } else {
                    searchResultsContainer.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                alert('Error');
            });
    } else {
        searchResultsContainer.style.display = 'none';
    }
}

let burgerMenu = document.querySelector('.burger-menu');
let burgerMenuItems = document.querySelector('.burger-menu-items');

burgerMenu.addEventListener('click', function () {
    if (burgerMenuItems.style.display === 'flex') {
        burgerMenuItems.style.display = 'none';
    } else {
        burgerMenuItems.style.display = 'flex';
    }
});
