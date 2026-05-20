export default function BottomNavBar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: 'home' },
    { id: 'orders', label: 'Orders', icon: 'package_2' },
    { id: 'inventory', label: 'Inventory', icon: 'inventory_2' },
    { id: 'analytics', label: 'Stats', icon: 'monitoring' },
    { id: 'storefront', label: 'Storefront', icon: 'storefront' },
    { id: 'settings', label: 'Profile', icon: 'settings' }
  ];

  return (
    <nav className="md:hidden flex justify-around items-center h-16 w-full px-2 pb-safe fixed bottom-0 left-0 z-50 border-t border-[#44444A] bg-[#2A2A2E]/95 backdrop-blur-lg shadow-[0_-4px_16px_rgba(0,0,0,0.4)] select-none">
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center flex-grow py-1 transition-all cursor-pointer ${
              isActive 
                ? 'text-[#E6E6E8] font-semibold scale-105' 
                : 'text-[#C8C8CC] hover:text-[#E6E6E8]'
            }`}
          >
            <span 
              className={`material-symbols-outlined text-[19px] ${
                isActive ? 'fill' : ''
              }`}
              style={{
                fontVariationSettings: isActive ? "'FILL' 1, 'wght' 600" : "'FILL' 0, 'wght' 400"
              }}
            >
              {tab.icon}
            </span>
            <span className="text-[8px] uppercase tracking-widest font-medium mt-1">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
