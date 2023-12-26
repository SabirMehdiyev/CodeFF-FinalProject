function register(e) {
    e.preventDefault();

    let usernameInput = document.getElementById('register-username');
    let passwordInput = document.getElementById('register-password');
    let repeatPasswordInput = document.getElementById('repeat-password');
    let emailInput = document.getElementById('register-email');
    let fullname = document.getElementById('fullname');
    let birthdateInput = document.getElementById('birthdate'); 

    let passwordRegex = /^(?=.*[A-Z])[a-zA-Z0-9!@#$%&*?@]{8,}$/;

    if (localStorage.getItem(usernameInput.value)) {
        alert("İstifadəçi adı artıq mövcuddur. Zəhmət olmasa fərqli istifadəçi adı daxil edin.");
    } 
    else if (!passwordRegex.test(passwordInput.value) || (passwordInput.value !== repeatPasswordInput.value)) {
        alert("Şifrə düzgün daxil edilməyib. Şifrənizdə ən az 1 böyük hərf olmalı və minimum 8 simvol uzunluğunda olmalıdır.");
        passwordInput.value = "";
        repeatPasswordInput.value = "";
    } 
    else {
        let user = {
            fullname: fullname.value,
            username: usernameInput.value,
            password: passwordInput.value,
            email: emailInput.value,
            birthdate: birthdateInput.value, 
            wishlist: [] ,
            cart: [] 
        };

        localStorage.setItem(usernameInput.value, JSON.stringify(user));

        alert("Qeydiyyat uğurla tamamlandı. Zəhmət olmasa giriş edin.");
        window.location.href = "login.html";
    }
}


function toggleShowPassword() {
    let passwordInput = document.getElementById("register-password");
    let repeatPasswordInput = document.getElementById('repeat-password');
    let showPasswordCheckbox = document.getElementById("showPassword");

    if (showPasswordCheckbox.checked) {
        passwordInput.type = "text";
        repeatPasswordInput.type = "text";
    } 
    else {
        passwordInput.type = "password";
        repeatPasswordInput.type = "password";
    }
}



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
