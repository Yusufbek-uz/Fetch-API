async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
            throw new Error('Error fetching users');
        }
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        // console.error(error);
        const cardsContainer = document.getElementById('cards');
        cardsContainer.innerHTML = `<p style="color: red; font-size: 44px;">Erorr 404</p>`;
    }
}

function displayUsers(users) {
    const cardsContainer = document.getElementById('cards');
    cardsContainer.innerHTML = '';

    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <h3>${user.name}</h3>
            <i class="fa-solid fa-user" id="on"></i>
            <i class="fa-solid fa-user fa-flip" id="of"></i>
            <p>📧 Email: ${user.email}</p>
            <p>📞 Phone: ${user.phone}</p>
            <p>🏡 Address: ${user.address.city}, ${user.address.street}</p>
        `;
        cardsContainer.appendChild(card);
    });
}

function filterUsers() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const userName = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = userName.includes(searchInput) ? 'block' : 'none';
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

document.getElementById('darkModeButton').addEventListener('click', toggleDarkMode);
document.getElementById('search').addEventListener('input', filterUsers);

fetchUsers();