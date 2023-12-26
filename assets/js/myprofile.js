function displayUserData() {
    let loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        let userInformation = JSON.parse(localStorage.getItem(loggedInUser)) || {};

        document.getElementById('user-fullname').textContent = userInformation.fullname;
        document.getElementById('user-mail').textContent = 'Email: ' + userInformation.email;
        document.getElementById('user-birthdate').textContent = 'Doğum tarixi: ' + userInformation.birthdate;
    }
}

function showEditProfile() {
    let loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        let userInformation = JSON.parse(localStorage.getItem(loggedInUser)) || {};

        document.getElementById('edit-fullname').value = userInformation.fullname;
        document.getElementById('edit-email').value = userInformation.email;
        document.getElementById('edit-birthdate').value = userInformation.birthdate;
    }

    document.getElementById('profile-container').style.display = 'none';
    document.getElementById('edit-profile-container').style.display = 'block';
}

function saveChanges(event) {
    event.preventDefault();

    let editedFullname = document.getElementById('edit-fullname').value;
    let editedEmail = document.getElementById('edit-email').value;
    let editedBirthdate = document.getElementById('edit-birthdate').value;

    let loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        let userInformation = JSON.parse(localStorage.getItem(loggedInUser)) || {};

        if (userInformation.fullname !== editedFullname || userInformation.email !== editedEmail || userInformation.birthdate !== editedBirthdate) {
            userInformation.fullname = editedFullname;
            userInformation.email = editedEmail;
            userInformation.birthdate = editedBirthdate;

            localStorage.setItem(loggedInUser, JSON.stringify(userInformation));

            alert('Profil uğurla yeniləndi!');
        } 
        else {
            alert('Profildə dəyişiklik edilmədi!!');
        }

        document.getElementById('profile-container').style.display = 'block';
        document.getElementById('edit-profile-container').style.display = 'none';

        displayUserData();
    }
}

displayUserData();




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
    loginControl.innerHTML = '<a href="/assets/index.html" onclick="logout()" class="logout-btn">Log out</a>';
    burgerLoginControl.innerHTML = '<a href="/assets/index.html" onclick="logout()" class="logout-btn">Log out</a>';
} else {
    loginControl.innerHTML = '<a href="/assets/login.html">Sign in</a>';
    burgerLoginControl.innerHTML = '<a href="/assets/login.html">Sign in</a>';
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
