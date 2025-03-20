### Objective
Crypto Tracker

Crypto Tracker is a web application that allows users to track the latest cryptocurrency prices, view details of individual coins, and manage a list of favorite coins.

Features

Display a list of top cryptocurrencies with their current prices, market caps, and 24h volume.

Search for specific cryptocurrencies.

View detailed information and historical price charts for each cryptocurrency.

Add or remove coins from the favorites list.

Sort coins based on price, market cap, and volume.

Technologies Used

HTML, CSS, JavaScript: Core front-end technologies.

Chart.js: For displaying historical price charts.

CoinGecko API: Fetching cryptocurrency data.

LocalStorage: Managing favorite coins.

Project Structure

Installation & Usage

Clone the repository:

Navigate to the project folder:

Open index.html in a web browser.

API Integration

This project uses the CoinGecko API to fetch cryptocurrency data. The API key is required in script.js and coin.js:

Replace 'YOUR-API-KEY' with a valid API key from CoinGecko.
## Fetch Data from CoinGecko API

Use the CoinGecko API to fetch the list of top cryptocurrencies by market cap.
API Endpoint: https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false
Include the following data fields: id, image, name, current_price, total_volume, market_cap.

## Coin Detail Page

Create a detailed page for each cryptocurrency.
Fetch and display specific details about the selected cryptocurrency using its unique ID.
API Endpoint: https://api.coingecko.com/api/v3/coins/{id}
Display the following details: coin image, name, description, ranking, current price, and market cap.
Historical Price Chart

Integrate Chart.js to display a line chart of the cryptocurrency's historical prices.
Provide options to view the price changes over three different periods: 24 hours, 30 days, and 3 months.
API Endpoint: https://api.coingecko.com/api/v3/coins/{id}/market_chart?vs_currency=usd&days={days}
Fetch and display historical price data based on the selected time period.
Responsive and Interactive UI

Ensure the application is fully responsive, providing a good user experience on both desktop and mobile devices.
Highlight the active time period button in the chart section to indicate the current view.
Implement navigation features such as a home button in the navbar for easy access back to the home page.
API Usage
Home Page:

Endpoint: https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false
Purpose: Fetches the top 10 cryptocurrencies by market cap to display on the home page.
Coin Detail Page:

Endpoint: https://api.coingecko.com/api/v3/coins/{id}
Purpose: Fetches detailed information about a specific cryptocurrency using its unique ID.
Historical Price Chart:

Endpoint: https://api.coingecko.com/api/v3/coins/{id}/market_chart?vs_currency=usd&days={days}
Purpose: Fetches historical price data for a specific cryptocurrency over a specified period (24 hours, 30 days, or 3 months) to display on the coin detail page.