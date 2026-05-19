import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function BottomNavBar() {
  const { totalItems } = useCart()

  return (
    <nav className="fixed bottom-0 w-full z-50 border-t border-outline-variant dark:border-on-surface-variant/20 bg-surface/95 dark:bg-inverse-surface/95 backdrop-blur-lg shadow-[0_-4px_12px_rgba(13,27,42,0.05)] md:hidden">
      <div className="flex justify-around items-center h-16 w-full px-4 pb-safe">
        
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center font-bold transition-all duration-150 ${
              isActive 
                ? 'text-secondary dark:text-secondary-fixed scale-[1.02]' 
                : 'text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-on-surface'
            }`
          }
        >
          <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-[9px]">Home</span>
        </NavLink>
        
        <NavLink 
          to="/shop" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center font-bold transition-all duration-150 ${
              isActive 
                ? 'text-secondary dark:text-secondary-fixed scale-[1.02]' 
                : 'text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-on-surface'
            }`
          }
        >
          <span className="material-symbols-outlined mb-1">grid_view</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-[9px]">Shop</span>
        </NavLink>
        
        <NavLink 
          to="/cart" 
          className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-on-surface relative"
        >
          <span className="material-symbols-outlined mb-1">shopping_cart</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-[9px]">Cart</span>
          {totalItems > 0 && (
            <span className="absolute top-0 right-2 w-4 h-4 bg-primary text-background rounded-full text-[9px] font-black flex items-center justify-center animate-bounce shadow">
              {totalItems}
            </span>
          )}
        </NavLink>
        
        <NavLink 
          to="/account" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center font-bold transition-all duration-150 ${
              isActive 
                ? 'text-secondary dark:text-secondary-fixed scale-[1.02]' 
                : 'text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-on-surface'
            }`
          }
        >
          <span className="material-symbols-outlined mb-1">person</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-[9px]">Account</span>
        </NavLink>

      </div>
    </nav>
  )
}
