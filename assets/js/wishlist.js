// js related with home page nav ..


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
