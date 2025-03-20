Crypto Tracker

Crypto Tracker is a web application that enables users to track cryptocurrency prices, view historical trends, and manage their favorite coins.

Features

1. Live Cryptocurrency Tracking

Displays real-time prices, market caps, and trading volumes of top cryptocurrencies.

Fetches data using the CoinGecko API.

2. Search and Filtering

Users can search for specific cryptocurrencies.

Sorting options by price, volume, and market cap.

3. Coin Details Page

Detailed view for each cryptocurrency, including:

Rank, current price, and market cap.

A historical price chart with selectable timeframes (24h, 30d, 3m).

4. Favorites Management

Users can add or remove coins from their favorites list.

Favorites are stored in LocalStorage for persistence.

5. Pagination

Users can navigate between pages of cryptocurrency listings.

Technologies Used

HTML, CSS, JavaScript: Frontend structure and styling.

Chart.js: For rendering historical price charts.

CoinGecko API: Fetching real-time cryptocurrency data.

LocalStorage: Managing the user's favorite coins.

Project Structure

Installation & Usage

Clone the repository:

Navigate to the project folder:

Open index.html in a web browser.

API Integration

This project uses the CoinGecko API to fetch cryptocurrency data. The API key is required in script.js and coin.js:

Replace 'YOUR-API-KEY' with a valid API key from CoinGecko.

Future Improvements

Implement user authentication for personalized favorites.

Add real-time price updates.

