# Crypto Dashboard 📊💰

![Dashboard Screenshot](https://i.imgur.com/JK8Zl5a.png)  
*A real-time cryptocurrency tracking dashboard with WebSocket support and interactive charts*

## Features ✨

- **Real-time Price Updates** via WebSocket (fallback to API polling)
- **Automatic Connection Recovery** (switches between WebSocket/HTTP)
- **Dark/Light Mode Toggle** with persisted theme preference
- **Interactive 7-Day Trend Charts** with smooth animations
- **Smart Search** with name/symbol filtering
- **Connection Status Indicator** (Live/Polling mode)
- **Responsive Design** optimized for all devices
- **Visual Price Change Indicators** (↑ green / ↓ red)
- **Dual API Integration** (CoinGecko + CoinCap)

## Technologies Used 🛠️

| Category        | Technology                          |
|-----------------|-------------------------------------|
| Frontend        | React 18                            |
| Styling         | Tailwind CSS                        |
| Data Viz        | Chart.js 4 (with proper controllers)|
| Real-time       | WebSocket + API polling fallback    |
| State Management| React Hooks                        |
| APIs            | CoinGecko (historical) + CoinCap (WS)|

## Installation 🚀

```bash
# Clone the repository
git clone https://github.com/yourusername/crypto-dashboard.git
cd crypto-dashboard

# Install dependencies
npm install

# Start development server
npm start

Open http://localhost:3000 to view in browser.

Deployment 🌐
Vercel One-Click Deploy:
https://vercel.com/button

Manual Deployment:

bash
npm run build
# Deploy the 'build' folder to your hosting provider
Key Improvements in v2.0 🔥
Robust WebSocket Implementation

Automatic fallback to HTTP polling

Connection status monitoring

Error recovery mechanisms

Enhanced Chart.js Integration

Proper controller registration

Theme-aware styling

Smoother animations

Performance Optimizations

Efficient data updates

Cleanup of WebSocket/interval resources

Memoized components

Improved UX

Connection status indicators

Better loading/error states

Null-safe data handling

Project Structure 📂
text
src/
├── App.js               # Main application logic
├── index.js             # React entry point
├── assets/              # Static assets
│   └── crypto-icons/    # Currency logos
├── hooks/               # Custom hooks
│   └── useWebSocket.js  # WebSocket management
└── styles/              # CSS/Styles
    └── tailwind.config.js
Customization 🎨
Add More Cryptocurrencies:

javascript
// In App.js
const assets = ['bitcoin','ethereum','solana','cardano']; // Add more IDs
Change Theme Colors:

javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3b82f6',
          dark: '#1e40af'
        }
      }
    }
  }
}
Extend Historical Data:

javascript
// Change days parameter
`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30`
Troubleshooting ⚠️
WebSocket Issues:

Check browser console for errors

Verify CORS settings if hosting locally

The app automatically falls back to API polling

Chart Not Loading:

Ensure all Chart.js components are registered

Verify API responses in Network tab

Check for null data cases

Contributing 🤝
Fork the repository

Create your feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

License 📄
MIT License - see LICENSE for details.

Made with ❤️ by nuzha | Live Demo