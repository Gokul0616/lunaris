import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function TopAppBar() {
  const { totalItems } = useCart()
  const { isAuthenticated, logout, user } = useAuth()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <header className="bg-[#151517] text-primary font-headline-md text-headline-md tracking-tighter top-0 sticky z-[100] border-b border-outline-variant/30 flat no shadows w-full">
      {/* Desktop view container */}
      <div className="hidden md:flex justify-between items-center w-full px-margin-desktop py-4 max-w-[1440px] max-h-[80px] mx-auto">
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/logo.png" className="w-16 h-16 object-contain shrink-0 group-hover:scale-105 transition-transform duration-300" alt="LUNARIS Logo" />
          <img
            src="/image copy-Photoroom.png"
            className="h-9 object-contain opacity-95 group-hover:opacity-100 transition-all duration-300 select-none"
            alt="LUNARIS"
          />
        </Link>

        <nav className="flex gap-lg items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-label-sm text-label-sm uppercase tracking-widest transition-all duration-200 ${isActive ? 'text-secondary opacity-100 font-bold scale-[1.02]' : 'text-on-surface-variant hover:text-secondary'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `font-label-sm text-label-sm uppercase tracking-widest transition-all duration-200 ${isActive ? 'text-secondary opacity-100 font-bold scale-[1.02]' : 'text-on-surface-variant hover:text-secondary'
              }`
            }
          >
            Collection
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `font-label-sm text-label-sm uppercase tracking-widest transition-all duration-200 ${isActive ? 'text-secondary opacity-100 font-bold scale-[1.02]' : 'text-on-surface-variant hover:text-secondary'
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `font-label-sm text-label-sm uppercase tracking-widest transition-all duration-200 ${isActive ? 'text-secondary opacity-100 font-bold scale-[1.02]' : 'text-on-surface-variant hover:text-secondary'
              }`
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `font-label-sm text-label-sm uppercase tracking-widest transition-all duration-200 ${isActive ? 'text-secondary opacity-100 font-bold scale-[1.02]' : 'text-on-surface-variant hover:text-secondary'
              }`
            }
          >
            Contact
          </NavLink>
          {isAuthenticated ? (
            <>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline text-xs">
                Hi, {user?.name || 'Athlete'}
              </span>
              <button
                onClick={logout}
                className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-error transition-all duration-200 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `font-label-sm text-label-sm uppercase tracking-widest transition-all duration-200 ${isActive ? 'text-secondary opacity-100 font-bold scale-[1.02]' : 'text-on-surface-variant hover:text-secondary'
                }`
              }
            >
              Sign In
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-4 relative">
          <Link to="/cart" className="text-primary hover:text-secondary transition-colors duration-200 relative p-1">
            <span className="material-symbols-outlined text-[26px]">shopping_bag</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-background rounded-full text-[10px] font-black flex items-center justify-center animate-bounce shadow-md">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile view container */}
      <div className="flex md:hidden justify-between items-center w-full px-6 py-3 max-h-[70px] mx-auto bg-[#151517]">
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/logo.png" className="w-12 h-12 object-contain shrink-0" alt="LUNARIS Logo" />
          <img
            src="/image copy-Photoroom.png"
            className="h-7 object-contain opacity-95"
            alt="LUNARIS"
          />
        </Link>

        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="text-primary focus:outline-none p-1 cursor-pointer flex items-center justify-center"
          aria-label="Open menu"
        >
          <span className="material-symbols-outlined text-[28px]">menu</span>
        </button>
      </div>

      {/* Mobile Full-Page Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-[#151517] z-[100] flex flex-col p-8 animate-slideInLeft md:hidden">
          <div className="flex justify-between items-center mb-12">
            <Link to="/" onClick={() => setIsDrawerOpen(false)} className="flex items-center gap-2">
              <img src="/logo.png" className="w-12 h-12 object-contain shrink-0" alt="LUNARIS Logo" />
              <img
                src="/image copy-Photoroom.png"
                className="h-7 object-contain opacity-95"
                alt="LUNARIS"
              />
            </Link>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="text-primary focus:outline-none p-1 cursor-pointer flex items-center justify-center"
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined text-[28px]">close</span>
            </button>
          </div>

          <nav className="flex flex-col gap-6 text-left mb-12">
            {[
              { name: 'Home', path: '/' },
              { name: 'Collection', path: '/shop' },
              { name: 'About', path: '/about' },
              { name: 'Shop', path: '/shop' },
              { name: 'Contact', path: '/shop' }
            ].map((link, idx) => (
              <NavLink
                key={idx}
                to={link.path}
                onClick={() => setIsDrawerOpen(false)}
                className={({ isActive }) =>
                  `font-body-lg text-lg uppercase tracking-[0.2em] py-1.5 transition-all duration-300 relative flex items-center ${
                    isActive 
                      ? 'text-[#E6E6E8] font-bold pl-3 border-l-2 border-[#C8C8CC]' 
                      : 'text-[#C8C8CC]/60 hover:text-[#E6E6E8]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto border-t border-[#44444A]/25 pt-8 flex flex-col gap-4">
            {isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <span className="font-label-sm text-sm uppercase tracking-widest text-[#C8C8CC] font-bold">
                  Hi, {user?.name || 'Athlete'}
                </span>
                <button
                  onClick={() => {
                    logout()
                    setIsDrawerOpen(false)
                  }}
                  className="bg-[#C8C8CC] text-[#1B1B1D] font-bold px-6 py-3 rounded-lg uppercase tracking-widest text-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer w-full text-center"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 w-full">
                <NavLink
                  to="/login"
                  onClick={() => setIsDrawerOpen(false)}
                  className="bg-[#C8C8CC] text-[#1B1B1D] font-bold px-6 py-3 rounded-lg uppercase tracking-widest text-xs hover:opacity-90 active:scale-95 transition-all text-center w-full block"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setIsDrawerOpen(false)}
                  className="border-2 border-[#C8C8CC] text-[#E6E6E8] font-bold px-6 py-2.5 rounded-lg uppercase tracking-widest text-xs hover:bg-[#C8C8CC] hover:text-[#1B1B1D] hover:border-transparent active:scale-95 transition-all text-center w-full block"
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
