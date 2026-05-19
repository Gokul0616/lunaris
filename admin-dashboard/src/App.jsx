import { useState, useMemo, useEffect } from 'react'
import './App.css'

// Import Components
import NavigationDrawer from './components/NavigationDrawer'
import TopHeader from './components/TopHeader'
import BottomNavBar from './components/BottomNavBar'

// Import Pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import Inventory from './pages/Inventory'
import Customers from './pages/Customers'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'

export default function App() {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('lunaris_admin_logged_in') === 'true'
  })
  const [loginError, setLoginError] = useState('')

  // Active Navigation Tab (parsed from URL path on load) & Search
  const [activeTab, setActiveTab] = useState(() => {
    const path = window.location.pathname
    const tab = path === '/' ? 'dashboard' : path.slice(1)
    if (['dashboard', 'orders', 'inventory', 'customers', 'analytics', 'settings'].includes(tab)) {
      return tab
    }
    return 'dashboard'
  })
  const [searchQuery, setSearchQuery] = useState('')

  // Sync activeTab state changes to browser URL pathname
  useEffect(() => {
    const path = activeTab === 'dashboard' ? '/' : `/${activeTab}`
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path)
    }
  }, [activeTab])

  // Listen to back/forward browser navigation actions to update activeTab state
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      const tab = path === '/' ? 'dashboard' : path.slice(1)
      if (['dashboard', 'orders', 'inventory', 'customers', 'analytics', 'settings'].includes(tab)) {
        setActiveTab(tab)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Mock Orders State
  const [orders, setOrders] = useState([
    { id: '#ORD-9081', customer: 'Sarah Jenkins', date: 'Today, 10:42 AM', status: 'Processing', amount: '$245.00', email: 'sarah@jenkins.com', items: 'Aero Glide Pro (Size 10)' },
    { id: '#ORD-9080', customer: 'Michael Chang', date: 'Today, 09:15 AM', status: 'Shipped', amount: '$129.99', email: 'michael@chang.org', items: 'Stealth Trainer X (Size 9)' },
    { id: '#ORD-9079', customer: 'Elena Rodriguez', date: 'Yesterday, 14:30 PM', status: 'Shipped', amount: '$380.00', email: 'elena@rodriguez.io', items: 'Neon Core Low (Size 11) x2' }
  ])

  // Mock Products & Inventory State
  const [products, setProducts] = useState([
    { id: '1', name: 'LUNARIS Velocity Pro', category: 'Mens Footwear', tag: 'Performance', sales: 342, stock: 342, size: '10', sku: 'FTW-VEL-001', price: 185.00, active: true },
    { id: '2', name: 'Aero-Knit Tech Tee', category: 'Mens Apparel', tag: 'Training', sales: 289, stock: 12, size: 'M', sku: 'APP-TEE-042', price: 55.00, active: true },
    { id: '3', name: 'Recovery Slides V2', category: 'Unisex Footwear', tag: 'Lifestyle', sales: 0, stock: 0, size: 'OS', sku: 'FTW-SLD-002', price: 45.00, active: false }
  ])

  // Mock Customers List
  const [customers, setCustomers] = useState([
    { id: 'CUST-001', name: 'Sarah Jenkins', email: 'sarah@jenkins.com', ordersCount: 5, totalSpent: '$1,245.00' },
    { id: 'CUST-002', name: 'Michael Chang', email: 'michael@chang.org', ordersCount: 3, totalSpent: '$420.50' },
    { id: 'CUST-003', name: 'Elena Rodriguez', email: 'elena@rodriguez.io', ordersCount: 9, totalSpent: '$2,840.00' },
    { id: 'CUST-004', name: 'David Miller', email: 'david@miller.dev', ordersCount: 2, totalSpent: '$310.00' }
  ])

  // Authentication validation
  const handleLogin = (email, password) => {
    setLoginError('')
    if ((email === 'admin@lunaris.com' || email === 'admin@lunaris.com') && password === 'admin123') {
      setIsLoggedIn(true)
      sessionStorage.setItem('lunaris_admin_logged_in', 'true')
    } else {
      setLoginError('Invalid administrator credentials. Please try again.')
    }
  }

  // Log out handler
  const handleLogout = () => {
    setIsLoggedIn(false)
    sessionStorage.removeItem('lunaris_admin_logged_in')
    setLoginError('')
  }

  // Adjust stock levels dynamically
  const handleAdjustStock = (sku, amount) => {
    setProducts(prev => prev.map(p => {
      if (p.sku === sku) {
        return { ...p, stock: Math.max(0, p.stock + amount) }
      }
      return p
    }))
  }

  // Toggle product active state
  const handleToggleActive = (sku) => {
    setProducts(prev => prev.map(p => {
      if (p.sku === sku) {
        return { ...p, active: !p.active }
      }
      return p
    }))
  }

  // Add a product to catalog
  const handleAddProduct = (newProduct) => {
    setProducts(prev => [
      ...prev,
      {
        id: String(prev.length + 1),
        sales: 0,
        ...newProduct
      }
    ])
  }

  // Trigger automated reorder (adds stock)
  const handleReorder = (sku) => {
    setProducts(prev => prev.map(p => {
      if (p.sku === sku) {
        return { ...p, stock: p.stock + 20 }
      }
      return p
    }))
  }

  // Change order status
  const handleUpdateStatus = (id, newStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === id) {
        return { ...o, status: newStatus }
      }
      return o
    }))
  }

  // KPI Metrics Calculation (Dynamically linked to mock state)
  const totalRevenue = '$124,500.00'
  const totalOrdersCount = 1248 + orders.length - 3
  const activeCustomersCount = 892 + customers.length - 4

  // Filtered lists based on search query
  const filteredOrders = useMemo(() => {
    return orders.filter(o =>
      o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.status.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [orders, searchQuery])

  const filteredProducts = useMemo(() => {
    return products.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [products, searchQuery])

  const filteredCustomers = useMemo(() => {
    return customers.filter(c =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [customers, searchQuery])

  // Check state alarms for Navigation Drawer badge lights
  const hasLowStock = useMemo(() => products.some(p => p.stock <= 5), [products])
  const hasProcessingOrders = useMemo(() => orders.some(o => o.status === 'Processing'), [orders])

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} error={loginError} />
  }

  return (
    <div className="bg-background text-on-background font-sans antialiased flex h-screen overflow-hidden w-full text-sm">
      {/* Navigation Sidebar */}
      <NavigationDrawer
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasLowStock={hasLowStock}
        hasProcessingOrders={hasProcessingOrders}
        onLogout={handleLogout}
      />

      {/* Main Canvas Area */}
      <main className="ml-0 md:ml-56 flex-grow flex flex-col h-screen overflow-hidden bg-background pb-16 md:pb-0">
        {/* Header Bar */}
        <TopHeader activeTab={activeTab} />

        {/* Scrollable View Wrapper */}
        <div className="flex-grow overflow-y-auto p-6">
          {activeTab === 'dashboard' && (
            <Dashboard
              totalRevenue={totalRevenue}
              totalOrdersCount={totalOrdersCount}
              activeCustomersCount={activeCustomersCount}
              products={products}
              orders={orders}
              onReorder={handleReorder}
              setActiveTab={setActiveTab}
              setSearchQuery={setSearchQuery}
            />
          )}

          {activeTab === 'orders' && (
            <Orders
              orders={filteredOrders}
              onUpdateStatus={handleUpdateStatus}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === 'inventory' && (
            <Inventory
              products={filteredProducts}
              onAdjustStock={handleAdjustStock}
              onToggleActive={handleToggleActive}
              onAddProduct={handleAddProduct}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === 'customers' && (
            <Customers
              customers={filteredCustomers}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === 'analytics' && <Analytics />}

          {activeTab === 'settings' && <Settings />}
        </div>

        {/* Mobile Bottom Navigation Menu */}
        <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </main>
    </div>
  )
}
