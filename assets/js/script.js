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
}
 else {
    loginControl.innerHTML = '<a href="/assets/login.html">Daxil ol</a>';
    burgerLoginControl.innerHTML = '<a href="/assets/login.html">Daxil ol</a>';
}

function logout() {
    localStorage.removeItem("loggedInUser");
    alert('Uğurlu çıxış!');
}

function fetchCategoriesData() {
    fetch('../assets/data.json')
        .then(response => response.json())
        .then(data => {
            const categoryContainer = document.getElementById('categoryContainer');
            data.Categories.forEach(category => {
                const categoryCard = document.createElement('div');
                categoryCard.className = 'f-category-minicard';
                const img = document.createElement('img');
                img.src = category.Image;
                img.alt = category.Name;
                const title = document.createElement('div');
                title.className = 'f-category-title';
                title.innerHTML = `<span>${category.Name}</span>`;
                categoryCard.appendChild(img);
                categoryCard.appendChild(title);
                categoryContainer.appendChild(categoryCard);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

let allProducts; 

function fetchProductsData() {
    fetch('/assets/data.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data.Products;

            let featuredProductsContainer = document.querySelector('.recommendedproducts');
            let filteredProductsContainer = document.querySelector('.popular-products');

            displayAllProducts();

            let filteredProducts = allProducts.filter(product => product.rating > 3.8).slice(0, 5);

            filteredProducts.forEach(product => {
                const productCard = `
                    <div class="f-product-card">
                        <div class="f-product-icons">
                            <i class="fa-regular fa-heart"></i>
                            <i class="fa-regular fa-eye"></i>
                        </div>
                        <img id="product-img" src="${product.image}" alt="${product.Title}">
                        <span class="f-product-category">${product.category}</span>
                        <h5 class="product-name"><a href="">${product.Title}</a></h5>
                        <div class="f-product-price">${product.price.toFixed(2)}AZN</div>
                        <button class="addtocart" onclick="addToCart(${product.Id})">Səbətə əlavə et<i class="fa-solid fa-cart-shopping"></i></button>
                    </div>`;
                filteredProductsContainer.innerHTML += productCard;
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            alert('Error fetching products. Please try again later.');
        });
}

document.querySelector('.f-product-categories').addEventListener('click', function (event) {
    if (event.target.classList.contains('f-category')) {
        document.querySelectorAll('.f-category').forEach(category => {
            category.classList.remove('active');
        });

        event.target.classList.add('active');

        let selectedCategory = event.target.textContent.trim();
        filterProductsByCategory(selectedCategory);
    }
});

function filterProductsByCategory(category) {
    let filteredProductsContainer = document.querySelector('.recommendedproducts');
    filteredProductsContainer.innerHTML = '';

    let filteredProducts;
    if (category.toLowerCase() === 'hamısı') {
        displayAllProducts();
    } else {
        filteredProducts = allProducts.filter(product => product.category === category);

        filteredProducts.forEach(product => {
            const productCard = `
                <div class="f-product-card">
                    <div class="f-product-icons">
                        <i class="fa-regular fa-heart"></i>
                        <i class="fa-regular fa-eye"></i>
                    </div>
                    <img id="product-img" src="${product.image}" alt="${product.Title}">
                    <span class="f-product-category">${product.category}</span>
                    <h5 class="product-name"><a href="">${product.Title}</a></h5>
                    <div class="f-product-price">${product.price.toFixed(2)}AZN</div>
                    <button class="addtocart" onclick="addToCart(${product.Id})">Səbətə əlavə et <i class="fa-solid fa-cart-shopping"></i></button>
                </div>`;
            filteredProductsContainer.innerHTML += productCard;
        });
    }
}

function displayAllProducts() {
    let featuredProductsContainer = document.querySelector('.recommendedproducts');
    featuredProductsContainer.innerHTML = '';

    allProducts.slice().forEach(product => {
        const productCard = `
            <div class="f-product-card">
                <div class="f-product-icons">
                    <i class="fa-regular fa-heart"></i>
                    <i class="fa-regular fa-eye"></i>
                </div>
                <img id="product-img" src="${product.image}" alt="${product.Title}">
                <span class="f-product-category">${product.category}</span>
                <h5 class="product-name"><a href="">${product.Title}</a></h5>
                <div class="f-product-price">${product.price.toFixed(2)}AZN</div>
                <button class="addtocart" onclick="addToCart(${product.Id})">Səbətə əlavə et <i class="fa-solid fa-cart-shopping"></i></button>
            </div>`;
        featuredProductsContainer.innerHTML += productCard;
    });
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

function addToCart(productId) {
    if (!loggedInUser || !user) {
        alert('Səbətə məhsul əlavə etmək üçün, hesabınıza giriş edin zəhmət olmasa');
        return;
    }

    user.cart = user.cart || [];

    let existingCartItem = user.cart.find(item => item.id === productId);
    if (existingCartItem) {
        existingCartItem.quantity++;
    } else {
        user.cart.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem(loggedInUser, JSON.stringify(user));

    alert('Məhsul səbətə əlavə edildi!');
    console.log('Current Cart:', user.cart);
}

fetchCategoriesData();
fetchProductsData();


let burgerMenu = document.querySelector('.burger-menu');
let burgerMenuItems = document.querySelector('.burger-menu-items');

burgerMenu.addEventListener('click', function () {
    if (burgerMenuItems.style.display === 'flex') {
        burgerMenuItems.style.display = 'none';
    } else {
        burgerMenuItems.style.display = 'flex';
    }
});
