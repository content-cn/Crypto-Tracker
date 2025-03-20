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
const itemsPerPage = 25; // Number of items per page


// Fetch coins from API
const fetchCoins = async (page = 1) => {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${itemsPerPage}&page=${page}`, options);        coins = await response.json();
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
    renderCoins(coins, currentPage, itemsPerPage);
    updatePaginationControls();
};


// Event delegation for dynamic elements
document.addEventListener('click', (event) => {
    // Handle favorite icon click
    if (event.target.classList.contains('favorite-icon')) {
        event.stopPropagation(); // Prevent row click
        const coinId = event.target.dataset.id;
        handleFavoriteClick(coinId, event.target);
    }
   
    // Handle row click (Navigate to details page)
    const row = event.target.closest('.coin-row');
    if (row && !event.target.classList.contains('favorite-icon')) {
        const coinId = row.getAttribute('data-id');
        window.location.href = `coin.html?id=${coinId}`;
    }
});
//  pagination control
const updatePaginationControls = () => {
    document.querySelector('#prev-button').disabled = currentPage === 1;
    document.querySelector('#next-button').disabled = coins.length < itemsPerPage;
};


//  prev button pagination
const handlePrevButtonClick = async () => {
    if (currentPage > 1) {
        currentPage--;
        coins = await fetchCoins(currentPage);
        renderCoins(coins, currentPage, itemsPerPage);
        updatePaginationControls();
    }
};


// next button pagination
const handleNextButtonClick = async () => {
    currentPage++;
    coins = await fetchCoins(currentPage);
    renderCoins(coins, currentPage, itemsPerPage);
    updatePaginationControls();
};
//  event listeners for pagination
if(document.querySelector('#prev-button') && document.querySelector('#next-button')){
    document.querySelector('#prev-button').addEventListener('click', handlePrevButtonClick);
    document.querySelector('#next-button').addEventListener('click', handleNextButtonClick);
}
// document.querySelector('#prev-button').addEventListener('click', handlePrevButtonClick);
// document.querySelector('#next-button').addEventListener('click', handleNextButtonClick);






// Debounce function
let debounceTimeout;
const debounce = (func, delay) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(func, delay);
};


// Fetch search results from API
const fetchSearchResults = async (query) => {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`, options);
        const data = await response.json();
        return data.coins;
    } catch (err) {
        console.error('Error fetching search results:', err);
        return [];
    }
};


// Show search results in the dialog
const showSearchResults = (results) => {
    const searchDialog = document.querySelector('#search-dialog');
    const resultsList = document.querySelector('#search-results');
    resultsList.innerHTML = '';


    if (results.length !== 0) {
        results.slice(0, 10).forEach(result => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="${result.thumb}" alt="${result.name}" width="24" height="24" />
                <span>${result.name}</span>
            `;
            listItem.dataset.id = result.id;
            resultsList.appendChild(listItem);
        });
    } else {
        resultsList.innerHTML = '<li>No coin found.</li>';
    }


    resultsList.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', (event) => {
            const coinId = event.currentTarget.dataset.id;
            window.location.href = `coin.html?id=${coinId}`;
        });
    });


    searchDialog.style.display = 'block';
};


// Close search dialog
const closeSearchDialog = () => {
    document.querySelector('#search-dialog').style.display = 'none';
};


// Handle search input with debounce
const handleSearchInput = () => {
    debounce(async () => {
        const searchTerm = document.querySelector('#search-box').value.trim();
        if (searchTerm) {
            const results = await fetchSearchResults(searchTerm);
            showSearchResults(results);
        } else {
            closeSearchDialog();
        }
    }, 300);
};


// Attach event listeners
document.addEventListener('DOMContentLoaded', initializePage);
document.querySelector('#search-box').addEventListener('input', handleSearchInput);
document.querySelector('#search-icon').addEventListener('click', handleSearchInput);
document.querySelector('#close-dialog').addEventListener('click', closeSearchDialog);


