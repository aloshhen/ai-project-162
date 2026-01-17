import { useState, useEffect } from 'react'
import { Menu, Search, Settings, TrendingUp, TrendingDown, BarChart, Activity, Star, Clock, Globe, Maximize, ChevronDown, Plus, Minus, Edit, Target, Grid, Layout, User, Lock } from 'lucide-react'

function App() {
  const [selectedPair, setSelectedPair] = useState('BTC/USDT')
  const [selectedTimeframe, setSelectedTimeframe] = useState('1H')
  const [price, setPrice] = useState(43250.50)
  const [priceChange, setPriceChange] = useState(2.45)

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 100
      setPrice(prev => prev + change)
      setPriceChange((Math.random() - 0.5) * 5)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const watchlist = [
    { pair: 'BTC/USDT', price: 43250.50, change: 2.45, volume: '2.4B' },
    { pair: 'ETH/USDT', price: 2280.30, change: -1.23, volume: '1.8B' },
    { pair: 'BNB/USDT', price: 312.45, change: 3.67, volume: '890M' },
    { pair: 'SOL/USDT', price: 98.76, change: 5.43, volume: '654M' },
    { pair: 'XRP/USDT', price: 0.5234, change: -2.11, volume: '432M' },
    { pair: 'ADA/USDT', price: 0.4567, change: 1.89, volume: '321M' },
  ]

  const timeframes = ['1m', '5m', '15m', '30m', '1H', '4H', '1D', '1W', '1M']

  const indicators = [
    { name: 'SMA', active: true },
    { name: 'EMA', active: false },
    { name: 'RSI', active: true },
    { name: 'MACD', active: false },
    { name: 'Bollinger', active: false },
  ]

  return (
    <div className="h-screen bg-[#0d0d0d] text-gray-100 flex flex-col overflow-hidden">
      {/* TOP HEADER */}
      <header className="bg-[#1a1a1a] border-b border-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <BarChart className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-bold">TradingPro</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button className="text-gray-400 hover:text-white transition-colors px-3 py-1 hover:bg-gray-800 rounded">
              Markets
            </button>
            <button className="text-gray-400 hover:text-white transition-colors px-3 py-1 hover:bg-gray-800 rounded">
              Screener
            </button>
            <button className="text-gray-400 hover:text-white transition-colors px-3 py-1 hover:bg-gray-800 rounded">
              Ideas
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-[#0d0d0d] px-3 py-2 rounded-lg border border-gray-800">
            <Search className="w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search markets..." 
              className="bg-transparent border-none outline-none text-sm w-48"
            />
          </div>
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <User className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR - WATCHLIST */}
        <aside className="w-64 bg-[#1a1a1a] border-r border-gray-800 overflow-y-auto">
          <div className="p-4 border-b border-gray-800">
            <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center justify-between">
              WATCHLIST
              <Star className="w-4 h-4" />
            </h3>
          </div>
          <div className="divide-y divide-gray-800">
            {watchlist.map((item) => (
              <button
                key={item.pair}
                onClick={() => setSelectedPair(item.pair)}
                className={`w-full px-4 py-3 hover:bg-[#252525] transition-colors text-left ${
                  selectedPair === item.pair ? 'bg-[#252525]' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">{item.pair}</span>
                  {item.change > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-mono text-sm">
                    ${item.price.toLocaleString()}
                  </span>
                  <span className={`text-xs ${item.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {item.change > 0 ? '+' : ''}{item.change.toFixed(2)}%
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Vol: {item.volume}</div>
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* CHART TOOLBAR */}
          <div className="bg-[#1a1a1a] border-b border-gray-800 px-4 py-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold">{selectedPair}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-mono">
                    ${price.toFixed(2)}
                  </span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    priceChange > 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                  }`}>
                    {priceChange > 0 ? '+' : ''}{priceChange.toFixed(2)}%
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-800 rounded transition-colors">
                  <Maximize className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-800 rounded transition-colors">
                  <Layout className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* TIMEFRAMES */}
              <div className="flex items-center gap-1 bg-[#0d0d0d] p-1 rounded-lg">
                {timeframes.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      selectedTimeframe === tf
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              {/* CHART TOOLS */}
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-800 rounded transition-colors" title="Trend Line">
                  <TrendingUp className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-800 rounded transition-colors" title="Horizontal Line">
                  <Minus className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-800 rounded transition-colors" title="Target">
                  <Target className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-800 rounded transition-colors" title="Edit">
                  <Edit className="w-4 h-4" />
                </button>
              </div>

              {/* INDICATORS */}
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1 bg-[#0d0d0d] hover:bg-gray-800 rounded transition-colors text-sm">
                  <Activity className="w-4 h-4" />
                  Indicators
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* CHART AREA */}
          <div className="flex-1 bg-[#0d0d0d] p-4 relative overflow-hidden">
            {/* Simulated Chart Grid */}
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full" style={{
                backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }} />
            </div>

            {/* Chart Content */}
            <div className="relative h-full flex items-center justify-center">
              <div className="text-center">
                <BarChart className="w-24 h-24 text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Advanced Charting Interface</h3>
                <p className="text-gray-500 max-w-md">
                  Real-time candlestick charts with technical indicators, drawing tools, and customizable timeframes
                </p>
                <div className="mt-6 flex items-center justify-center gap-4">
                  <div className="px-4 py-2 bg-green-500/20 text-green-500 rounded-lg text-sm font-mono">
                    High: ${(price + 500).toFixed(2)}
                  </div>
                  <div className="px-4 py-2 bg-red-500/20 text-red-500 rounded-lg text-sm font-mono">
                    Low: ${(price - 300).toFixed(2)}
                  </div>
                  <div className="px-4 py-2 bg-blue-500/20 text-blue-500 rounded-lg text-sm font-mono">
                    Vol: 24.5K
                  </div>
                </div>
              </div>
            </div>

            {/* Active Indicators Panel */}
            <div className="absolute top-4 left-4 bg-[#1a1a1a]/90 backdrop-blur-sm border border-gray-800 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-2">Active Indicators</div>
              {indicators.filter(i => i.active).map((indicator) => (
                <div key={indicator.name} className="flex items-center gap-2 text-sm py-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>{indicator.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM PANEL */}
          <div className="bg-[#1a1a1a] border-t border-gray-800 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div>
                  <div className="text-xs text-gray-500 mb-1">24h Volume</div>
                  <div className="font-mono font-semibold">$2.4B</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Market Cap</div>
                  <div className="font-mono font-semibold">$845B</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">24h High</div>
                  <div className="font-mono font-semibold text-green-500">${(price + 500).toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">24h Low</div>
                  <div className="font-mono font-semibold text-red-500">${(price - 300).toFixed(2)}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Buy
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2">
                  <TrendingDown className="w-4 h-4" />
                  Sell
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR - TRADING PANEL */}
        <aside className="w-80 bg-[#1a1a1a] border-l border-gray-800 overflow-y-auto">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center gap-2 mb-4">
              <button className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold">
                Buy
              </button>
              <button className="flex-1 bg-gray-800 text-gray-400 py-2 rounded-lg font-semibold">
                Sell
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 block mb-2">Order Type</label>
                <select className="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg px-3 py-2 text-sm">
                  <option>Limit</option>
                  <option>Market</option>
                  <option>Stop-Limit</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-2">Price (USDT)</label>
                <input 
                  type="text" 
                  value={price.toFixed(2)}
                  className="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg px-3 py-2 text-sm font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-2">Amount (BTC)</label>
                <input 
                  type="text" 
                  placeholder="0.00"
                  className="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg px-3 py-2 text-sm font-mono"
                />
                <div className="flex items-center gap-1 mt-2">
                  {[25, 50, 75, 100].map((percent) => (
                    <button 
                      key={percent}
                      className="flex-1 bg-[#0d0d0d] hover:bg-gray-800 text-xs py-1 rounded transition-colors"
                    >
                      {percent}%
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-2">Total (USDT)</label>
                <input 
                  type="text" 
                  placeholder="0.00"
                  className="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg px-3 py-2 text-sm font-mono"
                />
              </div>

              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors">
                Buy BTC
              </button>

              <div className="pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-gray-500">Available Balance</span>
                  <span className="font-mono">10,000 USDT</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Est. Fee (0.1%)</span>
                  <span className="font-mono">~4.32 USDT</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Recent Trades
            </h3>
            <div className="space-y-2">
              {[
                { price: 43251.20, amount: 0.045, time: '14:32:15', type: 'buy' },
                { price: 43249.80, amount: 0.123, time: '14:32:12', type: 'sell' },
                { price: 43250.50, amount: 0.089, time: '14:32:09', type: 'buy' },
                { price: 43248.90, amount: 0.234, time: '14:32:05', type: 'sell' },
              ].map((trade, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-1">
                  <span className={`font-mono ${trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                    {trade.price.toFixed(2)}
                  </span>
                  <span className="text-gray-500 font-mono">{trade.amount}</span>
                  <span className="text-gray-600">{trade.time}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default App