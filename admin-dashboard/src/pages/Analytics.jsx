import { useState } from 'react'

export default function Analytics() {
  const [dateRange, setDateRange] = useState('Last 30 Days')

  // Simulated regional data
  const regions = [
    { name: 'Maharashtra', amount: '$342k', share: '32%' },
    { name: 'Karnataka', amount: '$285k', share: '26%' },
    { name: 'Delhi NCR', amount: '$210k', share: '20%' },
    { name: 'Tamil Nadu', amount: '$150k', share: '14%' },
    { name: 'Gujarat', amount: '$95k', share: '8%' }
  ]

  // Top products dataset
  const topProducts = [
    { name: 'LUNARIS Velocity Pro', count: '8.5k', percentage: 85, color: '#0060a8' },
    { name: 'Aero-Knit Tech Tee', count: '7.0k', percentage: 70, color: '#0060a8' },
    { name: 'Stealth Trainer X', count: '5.5k', percentage: 55, color: '#47a1ff' },
    { name: 'Recovery Slides V2', count: '4.0k', percentage: 40, color: '#47a1ff' },
    { name: 'Velocity Windbreaker', count: '2.5k', percentage: 25, color: '#c4c6cc' }
  ]

  const handleExport = (format) => {
    alert(`Success: Reports & Analytics exported to ${format} format successfully!`)
  }

  return (
    <div className="animate-fadeIn select-none">
      {/* Header Panel */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-3 border-b border-[#c4c6cc]/20 pb-5">
        <div>
          <h1 className="font-display font-black text-xl tracking-tight text-[#181c1e] uppercase">
            Reports &amp; Analytics
          </h1>
          <p className="text-[11px] text-[#44474c] mt-0.5 font-medium">
            Comprehensive performance and global transaction analytics.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
          {/* Date Selector */}
          <div className="relative flex items-center bg-white border border-[#c4c6cc]/30 rounded-lg px-2.5 py-1.5 shadow-sm">
            <span className="material-symbols-outlined text-[#74777d] mr-1.5 text-[15px]">calendar_month</span>
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent border-none text-[11px] font-bold text-[#181c1e] focus:ring-0 pr-6 cursor-pointer appearance-none outline-none"
            >
              <option>Last 30 Days</option>
              <option>This Quarter</option>
              <option>Year to Date</option>
              <option>Custom Range</option>
            </select>
            <span className="material-symbols-outlined text-[#74777d] absolute right-2 pointer-events-none text-[14px]">expand_more</span>
          </div>

          {/* Action buttons */}
          <button 
            onClick={() => handleExport('CSV')}
            className="flex items-center gap-1 bg-white border border-[#c4c6cc] text-[#181c1e] font-black text-[9px] uppercase tracking-widest px-3 py-2 rounded-lg hover:bg-[#f1f4f6] transition-colors shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[13px]">download</span> CSV
          </button>
          
          <button 
            onClick={() => handleExport('PDF')}
            className="flex items-center gap-1 bg-black text-white font-black text-[9px] uppercase tracking-widest px-3 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[13px]">picture_as_pdf</span> PDF
          </button>
        </div>
      </header>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        
        {/* Rev */}
        <div className="bg-white border border-[#c4c6cc]/30 rounded-xl p-4 shadow-sm">
          <p className="text-[9px] text-[#44474c] font-black uppercase tracking-widest mb-1">Total Revenue</p>
          <h3 className="font-display font-black text-lg text-[#181c1e]">$1,245,000</h3>
          <p className="text-[9px] text-emerald-600 mt-1 flex items-center gap-1 font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[13px]">trending_up</span> +12.5% from last month
          </p>
        </div>

        {/* Users */}
        <div className="bg-white border border-[#c4c6cc]/30 rounded-xl p-4 shadow-sm">
          <p className="text-[9px] text-[#44474c] font-black uppercase tracking-widest mb-1">Active Users</p>
          <h3 className="font-display font-black text-lg text-[#181c1e]">84,320</h3>
          <p className="text-[9px] text-emerald-600 mt-1 flex items-center gap-1 font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[13px]">trending_up</span> +5.2% from last month
          </p>
        </div>

        {/* Rate */}
        <div className="bg-white border border-[#c4c6cc]/30 rounded-xl p-4 shadow-sm">
          <p className="text-[9px] text-[#44474c] font-black uppercase tracking-widest mb-1">Conversion Rate</p>
          <h3 className="font-display font-black text-lg text-[#181c1e]">4.8%</h3>
          <p className="text-[9px] text-emerald-600 mt-1 flex items-center gap-1 font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[13px]">trending_up</span> +0.4% from last month
          </p>
        </div>

        {/* Avg */}
        <div className="bg-white border border-[#c4c6cc]/30 rounded-xl p-4 shadow-sm">
          <p className="text-[9px] text-[#44474c] font-black uppercase tracking-widest mb-1">Avg Order Value</p>
          <h3 className="font-display font-black text-lg text-[#181c1e]">$145</h3>
          <p className="text-[9px] text-[#74777d] mt-1 flex items-center gap-1 font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[13px]">trending_flat</span> 0.0% from last month
          </p>
        </div>

      </div>

      {/* Main Charts & Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Sales Overview Line Chart */}
        <div className="lg:col-span-2 bg-white border border-[#c4c6cc]/30 rounded-xl p-4 shadow-sm flex flex-col h-80">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#181c1e]">Sales Overview</h3>
            <button className="text-[#44474c] hover:text-black cursor-pointer flex items-center">
              <span className="material-symbols-outlined text-[18px]">more_horiz</span>
            </button>
          </div>

          {/* Line Chart Area */}
          <div className="flex-1 bg-[#f7fafc] rounded-lg border border-[#c4c6cc]/15 flex items-center justify-center relative overflow-hidden">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ 
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 24px, #74777d 25px), repeating-linear-gradient(90deg, transparent, transparent 24px, #74777d 25px)' 
            }} />

            {/* Custom SVG Line graph */}
            <svg className="absolute inset-0 w-full h-full p-2 z-10" preserveAspectRatio="none" viewBox="0 0 100 100">
              {/* Previous period line (Dashed light-gray) */}
              <path 
                d="M 0 80 Q 20 70 40 85 T 80 40 T 100 55" 
                fill="none" 
                stroke="#c4c6cc" 
                strokeWidth="1.5" 
                strokeDasharray="3,3"
              />
              {/* Current period line (Solid blue glow) */}
              <path 
                d="M 0 70 Q 20 50 40 65 T 80 20 T 100 15" 
                fill="none" 
                stroke="#0060a8" 
                strokeWidth="2.5" 
              />
            </svg>

            {/* Float Info Label */}
            <div className="absolute bottom-2 left-3 z-20 text-[9px] text-[#44474c] font-black uppercase tracking-widest flex gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-0.5 bg-[#0060a8]" /> Current Cycle
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-0.5 bg-[#c4c6cc] border-dashed" /> Previous Cycle
              </span>
            </div>
          </div>
        </div>

        {/* Device Traffic Donut chart */}
        <div className="bg-white border border-[#c4c6cc]/30 rounded-xl p-4 shadow-sm flex flex-col h-80">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#181c1e]">Device Shares</h3>
            <button className="text-[#44474c] hover:text-black cursor-pointer flex items-center">
              <span className="material-symbols-outlined text-[18px]">more_horiz</span>
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Elegant SVG Donut Wheel */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 42 42">
                {/* Background ring */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f1f4f6" strokeWidth="4.5" />
                {/* Mobile share ring (62% - blue) */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#0060a8" strokeWidth="4.5" strokeDasharray="62 38" strokeDashoffset="0" />
                {/* Desktop share ring (28% - lightblue) */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#47a1ff" strokeWidth="4.5" strokeDasharray="28 72" strokeDashoffset="-62" />
                {/* Tablet share ring (10% - darkblue) */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#0f1c2c" strokeWidth="4.5" strokeDasharray="10 90" strokeDashoffset="-90" />
              </svg>
              {/* Inner core value */}
              <div className="absolute text-center">
                <span className="font-display font-black text-base text-black block leading-none">62%</span>
                <span className="text-[8px] font-black uppercase tracking-widest text-[#44474c]">Mobile</span>
              </div>
            </div>

            {/* Labels Legend */}
            <div className="mt-4 w-full flex justify-around select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0060a8]" />
                <span className="text-[9px] font-bold text-[#44474c] uppercase tracking-wider">Mobile (62%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#47a1ff]" />
                <span className="text-[9px] font-bold text-[#44474c] uppercase tracking-wider">Desk (28%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0f1c2c]" />
                <span className="text-[9px] font-bold text-[#44474c] uppercase tracking-wider">Tab (10%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Performance Heatmap list */}
        <div className="lg:col-span-2 bg-white border border-[#c4c6cc]/30 rounded-xl p-4 shadow-sm flex flex-col min-h-[360px]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#181c1e]">Regional Performance</h3>
            <div className="flex gap-1.5 select-none">
              <button className="px-2 py-1 bg-[#f1f4f6] rounded border border-[#c4c6cc]/35 text-[9px] font-black uppercase tracking-widest text-black">Revenue</button>
              <button className="px-2 py-1 text-[9px] font-black uppercase tracking-widest text-[#44474c] hover:bg-[#f1f4f6] rounded transition-colors cursor-pointer">Users</button>
            </div>
          </div>

          <div className="flex-grow flex flex-col md:flex-row gap-5 items-stretch">
            {/* stylized India SVG outline / graphic with glowing markers */}
            <div className="flex-1 min-h-[180px] bg-[#f7fafc] rounded-lg border border-[#c4c6cc]/20 relative flex items-center justify-center p-3">
              {/* Regional Outline Vector */}
              <svg className="w-40 h-40 opacity-70" viewBox="0 0 100 100" fill="none" stroke="#74777d" strokeWidth="0.8">
                {/* stylized India polygon paths */}
                <polygon points="50,15 54,20 53,28 58,32 56,40 68,42 72,48 64,52 68,60 62,65 59,75 55,85 50,92 48,82 45,72 40,68 32,65 30,55 35,50 34,42 42,38 43,28 47,20" fill="#f1f4f6" />
                {/* Glowing Hotzone Circles */}
                <circle cx="43" cy="65" r="4" fill="#0060a8" fillOpacity="0.4" className="animate-ping" />
                <circle cx="43" cy="65" r="2" fill="#0060a8" />
                <circle cx="48" cy="72" r="5" fill="#0060a8" fillOpacity="0.3" className="animate-ping" />
                <circle cx="48" cy="72" r="2.5" fill="#0060a8" />
                <circle cx="48" cy="38" r="4.5" fill="#47a1ff" fillOpacity="0.4" className="animate-ping" />
                <circle cx="48" cy="38" r="2" fill="#47a1ff" />
              </svg>
              
              {/* Legend scale */}
              <div className="absolute bottom-2 right-2 bg-white/95 border border-[#c4c6cc]/30 p-2 rounded-lg shadow-sm flex flex-col gap-1 select-none">
                <span className="text-[8px] font-black uppercase tracking-widest text-[#44474c]">Sales Density</span>
                <div className="w-20 h-1.5 bg-gradient-to-r from-[#f1f4f6] to-[#0060a8] rounded-full" />
                <div className="flex justify-between text-[7px] font-bold text-[#74777d] uppercase tracking-wider">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            </div>

            {/* Region List */}
            <div className="w-full md:w-60 flex flex-col justify-center gap-2 select-none">
              {regions.map((region, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-[#c4c6cc]/10 pb-1.5 last:border-0 last:pb-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-black text-white w-4 h-4 rounded-full bg-black flex items-center justify-center shadow-sm">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-black text-[#181c1e]">{region.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-[#0060a8]">{region.amount}</span>
                    <span className="text-[9px] font-bold text-[#44474c] uppercase tracking-wider">{region.share}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products Bar chart */}
        <div className="bg-white border border-[#c4c6cc]/30 rounded-xl p-4 shadow-sm flex flex-col min-h-[360px]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#181c1e]">Top Performing Variants</h3>
            <button className="text-[#44474c] hover:text-black cursor-pointer flex items-center">
              <span className="material-symbols-outlined text-[18px]">more_horiz</span>
            </button>
          </div>

          {/* Bar Chart list */}
          <div className="flex-1 flex flex-col justify-around gap-2 select-none">
            {topProducts.map((prod, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[10px] font-black text-[#44474c] uppercase">
                  <span className="truncate max-w-[130px]">{prod.name}</span>
                  <span className="text-black">{prod.count} items</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* Outer track */}
                  <div className="flex-grow h-4 bg-[#f1f4f6] rounded-lg overflow-hidden border border-[#c4c6cc]/15">
                    {/* Inner fill progress */}
                    <div 
                      className="h-full rounded-r-lg transition-all duration-500 shadow-inner" 
                      style={{ 
                        width: `${prod.percentage}%`,
                        backgroundColor: prod.color 
                      }} 
                    />
                  </div>
                  <span className="text-[10px] font-black text-black w-8 text-right">{prod.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
