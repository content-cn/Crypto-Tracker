// API request options
const options = {
    method: 'GET',
    headers: { 
        accept: 'application/json', 
        'x-cg-demo-api-key': 'CG-mDVVqLm5xBDjvcVq523LnAmB' 
    },
};

// State variables
let coins = []; // Store coin data
let currentPage = 1; // Page tracking

// Fetch coins from API
const fetchCoins = async (page = 1) => {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=${page}`, options);
        coins = await response.json();
    } catch (err) {
        console.error("Error fetching data:", err);
    }
    return coins;
};

// Retrieve favorites from localStorage
const getFavorites = () => JSON.parse(localStorage.getItem('favorites')) || [];

// Save favorites to localStorage
const saveFavorites = (favorites) => localStorage.setItem('favorites', JSON.stringify(favorites));

// Toggle favorite status
const toggleFavorite = (coinId) => {
    let favorites = getFavorites();
    
    if (favorites.includes(coinId)) {
        favorites = favorites.filter(id => id !== coinId);
    } else {
        favorites.push(coinId);
    }
    
    saveFavorites(favorites);
    return favorites;
};

// Handle favorite icon click
const handleFavoriteClick = (coinId, iconElement) => {
    const favorites = toggleFavorite(coinId);
    iconElement.classList.toggle('favorite', favorites.includes(coinId));
};

// Render a single coin row (entire row is clickable)
const renderCoinRow = (coin, index, start, favorites) => {
    const isFavorite = favorites.includes(coin.id);
    const row = document.createElement('tr');

    // Add a data-id attribute to the row itself
    row.setAttribute('data-id', coin.id);
    row.classList.add('coin-row');
    row.innerHTML = `
        <td>${start + index}</td>
        <td><img src="${coin.image}" alt="${coin.name}" width="24" height="24" /></td>
        <td>${coin.name}</td>
        <td>$${coin.current_price.toLocaleString()}</td>
        <td>$${coin.total_volume.toLocaleString()}</td>
        <td>$${coin.market_cap.toLocaleString()}</td>
        <td>
            <i class="fas fa-star favorite-icon ${isFavorite ? 'favorite' : ''}" data-id="${coin.id}"></i>
        </td>
    `;

    return row;
};

// Render coins
const renderCoins = (coinsToDisplay, page, itemsPerPage) => {
    const start = (page - 1) * itemsPerPage + 1;
    const favorites = getFavorites();
    const tableBody = document.querySelector('#crypto-table tbody');
    
    if (!tableBody) {
        console.error("Table body element not found!");
        return;
    }

    tableBody.innerHTML = ''; // Clear existing rows before rendering new data

    coinsToDisplay.forEach((coin, index) => {
        const row = renderCoinRow(coin, index, start, favorites);
        tableBody.appendChild(row);
    });
};

// Initialize the page
const initializePage = async () => {
    coins = await fetchCoins(currentPage);
    
    if (coins.length === 0) {
        console.error("No coins data fetched!");
        return;
    }

    renderCoins(coins, currentPage, 25);
};

// Attach event listeners for dynamic elements (Event Delegation)
document.addEventListener('click', (event) => {
    // Handle favorite icon click (Prevent row click event)
    if (event.target.classList.contains('favorite-icon')) {
        event.stopPropagation(); // Prevent row click event
        const coinId = event.target.dataset.id;
        handleFavoriteClick(coinId, event.target);
    }
    
    // Handle row click (Navigates to coin details page)
    const row = event.target.closest('.coin-row'); // Get closest row element
    if (row && !event.target.classList.contains('favorite-icon')) {
        const coinId = row.getAttribute('data-id');
        window.location.href = `coin.html?id=${coinId}`;
    }
});

// Load data on page load
document.addEventListener('DOMContentLoaded', initializePage);
