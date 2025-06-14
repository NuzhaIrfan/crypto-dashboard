import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const ws = useRef(null);

  // Initialize WebSocket connection
  useEffect(() => {
    ws.current = new W3CWebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum');

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);
        setCryptoData(prev => prev.map(crypto => ({
          ...crypto,
          current_price: data[crypto.id] || crypto.current_price
        })));
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };

    ws.current.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  // Fetch initial crypto data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum&order=market_cap_desc'
        );
        setCryptoData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fetch historical data for chart
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7'
        );
        const prices = response.data.prices.map(price => price[1]);
        const labels = response.data.prices.map(price =>
          new Date(price[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        );

        setChartData({
          labels,
          datasets: [{
            label: 'Bitcoin Price (Last 7 Days)',
            data: prices,
            borderColor: darkMode ? '#3b82f6' : '#2563eb',
            backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.1)',
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: darkMode ? '#3b82f6' : '#2563eb',
          }],
        });
      } catch (err) {
        console.error('Error fetching chart data:', err);
      }
    };
    fetchChartData();
  }, [darkMode]);

  // Filter crypto data based on search term
  useEffect(() => {
    const filtered = cryptoData.filter(crypto =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, cryptoData]);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading crypto data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`text-center p-6 rounded-lg max-w-md ${darkMode ? 'bg-gray-800' : 'bg-red-100'}`}>
          <p className={darkMode ? 'text-red-400' : 'text-red-600'}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className={`mt-4 px-4 py-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header with Dark Mode Toggle */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Crypto Dashboard</h1>
            <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Real-time cryptocurrency prices & trends</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </header>

        {/* Search Bar */}
        <div className="mb-8">
          <div className={`relative max-w-md mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full p-4 pl-12 rounded-lg focus:outline-none ${darkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-white text-gray-800'}`}
            />
            <span className="absolute left-4 top-4 text-gray-500">🔍</span>
          </div>
        </div>

        {/* Crypto Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {filteredData.map((crypto) => (
            <div
              key={crypto.id}
              className={`p-6 rounded-xl shadow-md transition-all hover:shadow-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}
            >
              <div className="flex items-center mb-4">
                <img src={crypto.image} alt={crypto.name} className="w-10 h-10 mr-3" />
                <div>
                  <h2 className="text-xl font-bold">{crypto.name}</h2>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{crypto.symbol.toUpperCase()}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Price:</span> ${crypto.current_price.toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">24h Change:</span>{' '}
                  <span className={crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {crypto.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Market Cap:</span> ${crypto.market_cap.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        {chartData && (
          <div className={`p-6 rounded-xl shadow-md mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-bold mb-4">Bitcoin Price Trend (7 Days)</h2>
            <div className="h-80">
              <Chart
                type="line"
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: {
                        color: darkMode ? '#f3f4f6' : '#111827'
                      }
                    },
                    tooltip: {
                      mode: 'index',
                      intersect: false,
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      titleColor: darkMode ? '#f3f4f6' : '#111827',
                      bodyColor: darkMode ? '#f3f4f6' : '#111827'
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: false,
                      grid: {
                        color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                      },
                      ticks: {
                        color: darkMode ? '#9ca3af' : '#6b7280'
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      },
                      ticks: {
                        color: darkMode ? '#9ca3af' : '#6b7280'
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className={`mt-12 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <p>Data provided by{' '}
            <a 
              href="https://www.coingecko.com/" 
              className={`hover:underline ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
              target="_blank" 
              rel="noopener noreferrer"
            >
              CoinGecko
            </a> and{' '}
            <a 
              href="https://coincap.io/" 
              className={`hover:underline ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
              target="_blank" 
              rel="noopener noreferrer"
            >
              CoinCap
            </a>
          </p>
          <p className="mt-2">Built with React, Chart.js, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}