export default function NavigationDrawer({ activeTab, setActiveTab, hasLowStock, hasProcessingOrders, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', isFill: true },
    { id: 'orders', label: 'Orders', icon: 'package_2', alert: hasProcessingOrders },
    { id: 'inventory', label: 'Inventory', icon: 'inventory_2', alert: hasLowStock },
    { id: 'customers', label: 'Customers', icon: 'group' },
    { id: 'analytics', label: 'Analytics', icon: 'monitoring' },
    { id: 'storefront', label: 'Storefront', icon: 'storefront' }
  ];

  return (
    <aside className="hidden md:flex h-screen w-56 fixed left-0 top-0 bg-surface-container border-r border-outline/30 flex-col py-5 z-40 select-none">
      {/* Header */}
      <div className="px-5 mb-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full overflow-hidden bg-surface-container-high flex-shrink-0 border border-outline/50 shadow-sm">
          <img 
            alt="Admin User" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdJ6rF7Akq8wmH5_5uZNwO2GVA87PQKADEe3BvIvBmmW63p1FHPsr3ya99975IfhhHu3IQXryNW6B0Z0yJZE4gn9SDHq7A9WlB4f4qrkgfhfpkgDLkSDzvoh2prnhRqHj5gTzJWk5jKz-tV4DdTnE8ZclDzJ-ykSiU3PRDhDk3cn-4xM2PV5MSok2dD3-b7GVf0UedJ4GXPEV8Hu71SdfK-Mwa3TsfrwYVDOhAs-7DV8JPMQNLYCDEAFHEegajVtyM9CXmNbELhHcF"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-display font-black text-xs tracking-[0.1em] text-primary uppercase">
            LUNARIS Admin
          </span>
          <span className="text-[8px] text-on-surface-variant font-black tracking-widest uppercase opacity-75">
            Global Manager
          </span>
        </div>
      </div>

      {/* Navigation list */}
      <nav className="flex-1 flex flex-col gap-0.5 px-2 overflow-y-auto">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full text-left rounded-lg px-3 py-2 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
              activeTab === item.id
                ? 'bg-primary text-on-primary font-black shadow-md'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high hover:translate-x-0.5'
            }`}
          >
            <span 
              className={`material-symbols-outlined text-[16px] ${item.isFill && activeTab === item.id ? 'fill' : ''}`}
            >
              {item.icon}
            </span>
            <span>{item.label}</span>
            {item.alert && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto px-2 pt-3 border-t border-outline/15 flex flex-col gap-0.5">
        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full text-left rounded-lg px-3 py-2 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-primary text-on-primary font-black shadow-md'
              : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high hover:translate-x-0.5'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">settings</span>
          <span>Settings</span>
        </button>

        <button
          onClick={onLogout}
          className="w-full text-left rounded-lg px-3 py-2 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-wider text-[#FF4D4D] hover:bg-[#FF4D4D]/10 hover:translate-x-0.5 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">logout</span>
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
