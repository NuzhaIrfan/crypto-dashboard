# Crypto Dashboard 📊💰



A real-time cryptocurrency tracking dashboard with dark mode, live price updates via WebSocket, and interactive charts. Built with React, Tailwind CSS, and Chart.js.

## Features ✨

- **Real-time Price Updates** using WebSocket (CoinCap API)
- **Dark/Light Mode Toggle** with smooth transitions
- **Interactive Charts** showing 7-day price trends
- **Search Functionality** to filter cryptocurrencies
- **Responsive Design** works on all devices
- **Visual Indicators** for price changes (red/green)
- **Multiple Data Sources** (CoinGecko + CoinCap APIs)

## Technologies Used 🛠️

- **Frontend**: React.js
- **Styling**: Tailwind CSS
- **Charts**: Chart.js
- **Real-time Data**: WebSocket
- **APIs**: 
  - CoinGecko (historical data)
  - CoinCap (real-time prices)

## Installation 🚀

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/crypto-dashboard.git
   cd crypto-dashboard
Install dependencies:

bash
npm install
Start the development server:

bash
npm start
Open http://localhost:3000 in your browser

Deployment 🌐
Deploy to Vercel with one click:

https://crypto-dash-flax.vercel.app/

Or deploy manually:

bash
npm run build
# Upload the build folder to your hosting provider
Project Structure 📂
text
src/
├── App.js               # Main application component
├── index.js             # React entry point
├── index.css            # Global styles
├── assets/              # Images and icons
└── components/          # Reusable components (future expansion)
Customization 🎨
Add More Cryptocurrencies:

Modify the API calls in App.js to include additional coins

Change Theme Colors:

Edit the tailwind.config.js file:

js
theme: {
  extend: {
    colors: {
      'primary': '#your-color',
    }
  }
}
Extend Time Period:

Change the days=7 parameter in the CoinGecko API call



Contributing 🤝
Contributions are welcome! Please open an issue or submit a pull request.

License 📄
This project is licensed under the MIT License - see the LICENSE file for details.

Made with ❤️ by nuzha 