export default function Dashboard({ 
  totalRevenue, 
  totalOrdersCount, 
  activeCustomersCount, 
  products, 
  orders, 
  onReorder,
  setActiveTab,
  setSearchQuery
}) {
  return (
    <div className="animate-fadeIn">
      {/* Title Header */}
      <div className="mb-5 flex justify-between items-end select-none">
        <div>
          <h1 className="font-display font-black text-xl tracking-tight text-[#181c1e] uppercase">
            Overview
          </h1>
          <p className="text-[11px] text-[#44474c] mt-0.5 font-medium">
            Track your daily performance and store metrics.
          </p>
        </div>
        <div>
          <button 
            onClick={() => alert('Report data exported successfully in premium spreadsheet format.')}
            className="px-4 py-2 border border-[#c4c6cc]/50 bg-white text-[#181c1e] rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#f1f4f6] transition-colors shadow-sm cursor-pointer"
          >
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 select-none">
        
        {/* KPI 1 */}
        <div className="bg-white rounded-xl border border-[#c4c6cc]/30 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-black text-[#44474c] uppercase tracking-widest">
              Total Revenue
            </span>
            <span className="material-symbols-outlined text-[#0060a8] text-[18px]">payments</span>
          </div>
          <div>
            <div className="font-display font-black text-xl text-[#181c1e] mb-0.5">{totalRevenue}</div>
            <div className="flex items-center gap-0.5 text-[9px] text-[#0060a8] font-black uppercase tracking-wide">
              <span className="material-symbols-outlined text-[12px]">trending_up</span>
              <span>+14.5% vs MoM</span>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-xl border border-[#c4c6cc]/30 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-black text-[#44474c] uppercase tracking-widest">
              Total Orders
            </span>
            <span className="material-symbols-outlined text-[#44474c] text-[18px]">local_shipping</span>
          </div>
          <div>
            <div className="font-display font-black text-xl text-[#181c1e] mb-0.5">{totalOrdersCount}</div>
            <div className="flex items-center gap-0.5 text-[9px] text-[#0060a8] font-black uppercase tracking-wide">
              <span className="material-symbols-outlined text-[12px]">trending_up</span>
              <span>+8.2% vs MoM</span>
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-xl border border-[#c4c6cc]/30 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-black text-[#44474c] uppercase tracking-widest">
              Active Clients
            </span>
            <span className="material-symbols-outlined text-[#44474c] text-[18px]">group</span>
          </div>
          <div>
            <div className="font-display font-black text-xl text-[#181c1e] mb-0.5">{activeCustomersCount}</div>
            <div className="flex items-center gap-0.5 text-[9px] text-[#74777d] font-black uppercase tracking-wide">
              <span className="material-symbols-outlined text-[12px]">trending_flat</span>
              <span>+2.1% flat</span>
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-xl border border-[#c4c6cc]/30 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-black text-[#44474c] uppercase tracking-widest">
              Avg. Ticket Size
            </span>
            <span className="material-symbols-outlined text-[#44474c] text-[18px]">receipt_long</span>
          </div>
          <div>
            <div className="font-display font-black text-xl text-[#181c1e] mb-0.5">$142.50</div>
            <div className="flex items-center gap-0.5 text-[9px] text-[#0060a8] font-black uppercase tracking-wide">
              <span className="material-symbols-outlined text-[12px]">trending_up</span>
              <span>+5.4% vs MoM</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Charts & Sidebars Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#c4c6cc]/30 p-5 shadow-sm flex flex-col select-none">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-display font-black text-sm text-[#181c1e] uppercase tracking-wider">
              Revenue Overview
            </h2>
            <select className="bg-[#f1f4f6] border border-[#c4c6cc]/30 rounded-lg py-1 px-2.5 text-[10px] font-bold text-[#181c1e] focus:outline-none focus:ring-1 focus:ring-[#0060a8]">
              <option>Last 30 Days</option>
              <option>This Quarter</option>
              <option>This Year</option>
            </select>
          </div>

          <div className="flex-1 min-h-[220px] w-full relative border-b border-l border-[#c4c6cc]/20 flex items-end justify-between px-2 pt-6 pb-0">
            {/* Y-Axis */}
            <div className="absolute left-[-35px] top-0 bottom-0 flex flex-col justify-between text-[9px] text-[#c4c6cc] py-2 font-bold select-none">
              <span>$150k</span>
              <span>$100k</span>
              <span>$50k</span>
              <span>0</span>
            </div>
            {/* Grid */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="w-full h-px bg-[#c4c6cc]/5"></div>
              <div className="w-full h-px bg-[#c4c6cc]/5"></div>
              <div className="w-full h-px bg-[#c4c6cc]/5"></div>
              <div className="w-full h-px bg-[#c4c6cc]/5"></div>
            </div>

            {/* Dynamic Bars */}
            <div className="w-9 bg-[#181c1e]/5 hover:bg-[#181c1e]/10 transition-all rounded-t-md h-[40%] relative group cursor-pointer">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-bold">$42k</div>
            </div>
            <div className="w-9 bg-[#181c1e]/10 hover:bg-[#181c1e]/20 transition-all rounded-t-md h-[60%] relative group cursor-pointer">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-bold">$65k</div>
            </div>
            <div className="w-9 bg-[#181c1e]/20 hover:bg-[#181c1e]/30 transition-all rounded-t-md h-[35%] relative group cursor-pointer">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-bold">$38k</div>
            </div>
            <div className="w-9 bg-[#181c1e]/40 hover:bg-[#181c1e]/50 transition-all rounded-t-md h-[80%] relative group cursor-pointer">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-bold">$98k</div>
            </div>
            <div className="w-9 bg-[#181c1e]/60 hover:bg-[#181c1e]/70 transition-all rounded-t-md h-[50%] relative group cursor-pointer">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-bold">$74k</div>
            </div>
            <div className="w-9 bg-[#0060a8] hover:bg-[#0060a8]/90 transition-all rounded-t-md h-[95%] relative group cursor-pointer">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#0060a8] text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-bold">$124k</div>
            </div>
          </div>

          <div className="flex justify-between mt-3 text-[9px] text-[#c4c6cc] px-2 font-bold">
            <span>Dec</span>
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-[#c4c6cc]/30 p-4 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-display font-black text-sm text-[#181c1e] uppercase tracking-wider">
              Top Sellers
            </h2>
            <button 
              onClick={() => setActiveTab('inventory')}
              className="text-[10px] text-[#0060a8] hover:underline font-black uppercase cursor-pointer"
            >
              View All
            </button>
          </div>
          <div className="flex flex-col gap-2.5">
            {products.slice(0, 3).map(product => (
              <div 
                key={product.id}
                onClick={() => { setActiveTab('inventory'); setSearchQuery(product.name); }}
                className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-[#f1f4f6] transition-all group cursor-pointer border border-transparent hover:border-[#c4c6cc]/20"
              >
                <div className="w-10 h-10 rounded-md bg-[#e0e3e5] overflow-hidden flex-shrink-0 shadow-inner">
                  <img 
                    alt={product.name} 
                    className="w-full h-full object-cover" 
                    src={
                      product.id === '1' ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnVPUdXm_pAap42KSkT4ArWFfdYf-ZFKrsE_tHPRky1jzSabg38BG6x_wtZNLHmFZOWx72k1WGMpFziLCZRj4eylOUHbWrkBOcVUqJUWJZb1yf819e9_CWU6X-_4RMIi8hGC50bsibbgaxTqDMazaf6FaOxF31gZdvc1ZgkVOntDujCbh3MlTqN2RD2eF3FDs-C61VeKi6J3O7Jt_UWjVssWu1j7UNvSzXZrJ0sxVN-L4_o60TepEML7jMUo2yAPHQLmtz2Lg76RdO' :
                      product.id === '2' ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuA33pTwLK8ljQpwokuWtYPQ4xr6mcm6KJ_52Z8VnrXjy3jF9Q2Qftb3bZ99YnJMFm-c1slXgPY-JEm-U9cRGnnF4vm7sOlhnNvcGiT0AxWrRPXWpAoHdbGXNTvKBOO66jygM26sk4aEe6iGofD86TWxz2tPRnhOb43uUz5FabSPy8EKevdmQkub5iuDvU_6Jg4K6mbZWHTfaYSK6Rxqc2X1lC_ygHDdnbROPBVQZMMvo3EEqOaNZIHgQLx1IVz4URdvWgcekJ0p7Gj3' :
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuDk_ZTAV9YluFaWIjk_6kCYtrGq8tYEa5Qd4IQTiiZMy8unTADAZDg6tx51Xmh3gTOikYfx0RtzgZVMSKUOlT1pRPYmLEoHS59G7Yzgjkoyep0Y-DE-2IBJVar-Koqqn0PaSPvApQthvMyLTyvHdQwHfQiR7NSwBrkcV0bsTWfqSz_baF6BvUbR_Qg3-n-T5DlHhB4ghMxsiIqhGfO2uFUsJUJ5b0qC8ExEIsgj81fp8rUy4RR51epfbKK4NEvwCWoQ5ZsncPMoX4hv'
                    }
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-bold text-[#181c1e] truncate group-hover:text-[#0060a8] transition-colors leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-[9px] text-[#44474c] mt-0.5 uppercase tracking-wide font-medium">
                    {product.category}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-[#181c1e]">{product.sales}</div>
                  <div className="text-[8px] text-[#c4c6cc] font-black uppercase tracking-wider">Sales</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Tables and Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-10">
        
        {/* Recent Orders table */}
        <div className="bg-white rounded-xl border border-[#c4c6cc]/30 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-[#c4c6cc]/20 flex justify-between items-center select-none">
              <h2 className="font-display font-black text-sm text-[#181c1e] uppercase tracking-wider">
                Recent Orders
              </h2>
              <button 
                onClick={() => setActiveTab('orders')}
                className="text-[9px] font-black text-[#0060a8] hover:underline uppercase cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f1f4f6] border-b border-[#c4c6cc]/20 text-[9px] text-[#44474c] uppercase tracking-wider select-none font-bold">
                    <th className="p-3">ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Date</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-[11px] text-[#181c1e]">
                  {orders.slice(0, 3).map(order => (
                    <tr 
                      key={order.id}
                      onClick={() => { setActiveTab('orders'); setSearchQuery(order.id); }}
                      className="border-b border-[#c4c6cc]/10 hover:bg-[#f7fafc] transition-colors cursor-pointer group"
                    >
                      <td className="p-3 font-black text-[#0060a8]">{order.id}</td>
                      <td className="p-3 font-bold">{order.customer}</td>
                      <td className="p-3 text-[#44474c] text-[10px]">{order.date}</td>
                      <td className="p-3 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[8px] uppercase font-black border tracking-wider bg-[#0060a8]/5 border-[#0060a8]/25 text-[#0060a8]">
                          {order.status}
                        </span>
                      </td>
                      <td className="p-3 text-right font-black text-[#181c1e]">{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-xl border border-[#c4c6cc]/30 p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4 select-none">
              <div className="flex items-center gap-1.5">
                <h2 className="font-display font-black text-sm text-[#181c1e] uppercase tracking-wider">
                  Stock Alerts
                </h2>
                <span className="material-symbols-outlined text-[#ba1a1a] text-[16px] animate-bounce">warning</span>
              </div>
              <button 
                onClick={() => setActiveTab('inventory')}
                className="text-[9px] font-black text-[#c4c6cc] hover:text-black uppercase cursor-pointer"
              >
                Manage
              </button>
            </div>

            <div className="flex flex-col gap-0 border border-[#c4c6cc]/20 rounded-lg overflow-hidden shadow-sm">
              {products.map((product, idx) => (
                <div 
                  key={product.sku}
                  className={`flex items-center justify-between p-3 bg-white ${
                    idx !== products.length - 1 ? 'border-b border-[#c4c6cc]/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      product.stock <= 2 ? 'bg-[#ba1a1a]' : 'bg-[#f59e0b]'
                    }`} />
                    <div>
                      <div className="text-[11px] text-[#181c1e] font-bold">
                        {product.name} - Size {product.size}
                      </div>
                      <div className="text-[9px] text-[#44474c] mt-0.5 font-bold uppercase tracking-wider">
                        SKU: {product.sku}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right select-none">
                      <div className={`text-[11px] font-black ${
                        product.stock <= 5 ? 'text-[#ba1a1a] font-extrabold' : 'text-black'
                      }`}>
                        {product.stock} left
                      </div>
                    </div>
                    <button 
                      onClick={() => onReorder(product.sku)}
                      className="px-2.5 py-1 border border-[#c4c6cc] rounded bg-white text-[#181c1e] text-[8px] uppercase font-black hover:bg-[#f1f4f6] transition-colors shadow-sm cursor-pointer"
                    >
                      Reorder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
