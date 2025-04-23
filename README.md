# Crypto Tracker

## Description

Crypto Tracker is a web application that allows users to track the latest cryptocurrency prices, view details of individual coins, and manage a list of favorite coins. The application provides a user-friendly interface to explore the cryptocurrency market and make informed decisions.

## Features

- **Display Top Cryptocurrencies**: Shows a list of top cryptocurrencies with their current prices, market caps, and 24-hour trading volume.
  
- **Search Functionality**: Users can search for specific cryptocurrencies to find detailed information quickly.
  
- **Detailed Coin Information**: View detailed information and historical price charts for each cryptocurrency.
  
- **Favorites Management**: Users can add or remove coins from their favorites list for easy access.
  
- **Sorting Options**: Sort coins based on price, market cap, and volume for better analysis.

## Technologies Used

- **HTML**: For structuring the web pages.
  
- **CSS**: For styling and layout of the web pages.
  
- **JavaScript**: For interactivity and dynamic content.
  
- **Chart.js**: For displaying historical price charts.
  
- **CoinGecko API**: For fetching real-time cryptocurrency data.
  
- **LocalStorage**: For managing the list of favorite coins.

## Project Structure
Crypto-Tracker/
│
├── index.html          
├── coin.html           
├── favorite.html       
├── script.js           
├── coin.js             
├── style.css          
├── coin.css           
└── .vscode/            
## Installation & Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/content-cn/Crypto-Tracker.git
   ```
## API Integration

This project uses the CoinGecko API to fetch cryptocurrency data.

### API Key

An API key is required in `script.js` and `coin.js`. Replace `'YOUR-API-KEY'` with a valid API key from CoinGecko.

### Fetch Data from CoinGecko API

#### Home Page:

- **Endpoint**:
