import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import TopAppBar from './components/TopAppBar'
import BottomNavBar from './components/BottomNavBar'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Account from './pages/Account'
import Login from './pages/Login'
import Register from './pages/Register'
import Checkout from './pages/Checkout'
import OrderConfirmed from './pages/OrderConfirmed'
import About from './pages/About'

function AppContent() {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'
  const isCheckoutFlow = location.pathname === '/checkout' || location.pathname === '/order-confirmed'
  const hideBars = isAuthPage || isCheckoutFlow

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md antialiased flex flex-col">
      {/* Universal Top Navigation Header (Desktop) - Hidden on Auth/Checkout pages */}
      {!hideBars && <TopAppBar />}
      
      {/* Active Viewport Router */}
      <main className={`flex-grow flex flex-col ${hideBars ? 'pb-0' : 'pb-[80px] md:pb-0'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/aeromax-elite" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmed" element={<OrderConfirmed />} />
        </Routes>
      </main>
      
      {/* Universal Bottom Navigation Bar (Mobile) - Hidden on Auth/Checkout pages */}
      {!hideBars && <BottomNavBar />}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
