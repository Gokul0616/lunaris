import { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function Orders({ orders, onUpdateStatus, searchQuery }) {
  // Tab State
  const [selectedTab, setSelectedTab] = useState('All') // 'All', 'Pending', 'Processing', 'Shipped'

  // Selection State
  const [selectedOrderIds, setSelectedOrderIds] = useState([])

  // Side Drawer Selected Order State
  const [detailOrder, setDetailOrder] = useState(null)

  // Edit Panel Form State
  const [isEditing, setIsEditing] = useState(false)

  // Reset editing mode when drawer is closed
  useEffect(() => {
    if (!detailOrder) {
      setIsEditing(false)
    }
  }, [detailOrder])
  const [editStatus, setEditStatus] = useState('')
  const [editCarrier, setEditCarrier] = useState('')
  const [editDeliveryDays, setEditDeliveryDays] = useState(3)
  const [editTimelineNote, setEditTimelineNote] = useState('')

  // Dynamic order details dictionary in component state
  const [ordersDetails, setOrdersDetails] = useState({
    '#ORD-9081': {
      items: [
        { name: 'Aero Glide Pro', size: '10', color: 'Onyx Black', qty: 1, price: '$160.00', imageId: '1' },
        { name: 'Performance Crew Socks', size: 'OS', color: 'LUNARIS Silver', qty: 1, price: '$15.00', imageId: '3' }
      ],
      subtotal: '$175.00',
      shipping: 'Free',
      total: '$175.00',
      email: 'sarah@jenkins.com',
      phone: '+1 (555) 349-2041',
      address: '104 Willow St, Apt 2C, Brooklyn, NY 11201',
      carrier: 'FedEx Express',
      deliveryDays: 3,
      timeline: [
        { title: 'Processing Started', time: 'Today, 11:00 AM', completed: true },
        { title: 'Order Placed', time: 'Today, 10:42 AM', completed: true }
      ]
    },
    '#ORD-9080': {
      items: [
        { name: 'Stealth Trainer X', size: '9', color: 'Carbon Grey', qty: 1, price: '$129.99', imageId: '2' }
      ],
      subtotal: '$129.99',
      shipping: 'Free',
      total: '$129.99',
      email: 'michael@chang.org',
      phone: '+1 (555) 781-9042',
      address: '488 Mission St, San Francisco, CA 94105',
      carrier: 'LUNARIS Premium Post',
      deliveryDays: 5,
      timeline: [
        { title: 'Shipped via LUNARIS Premium Post', time: 'Today, 10:15 AM', completed: true },
        { title: 'Order Placed', time: 'Today, 09:15 AM', completed: true }
      ]
    },
    '#ORD-9079': {
      items: [
        { name: 'Neon Core Low', size: '11', color: 'Neon Lime', qty: 2, price: '$380.00', imageId: '3' }
      ],
      subtotal: '$380.00',
      shipping: 'Free',
      total: '$380.00',
      email: 'elena@rodriguez.io',
      phone: '+1 (555) 123-4567',
      address: '123 Tech Boulevard, Apt 4B, San Francisco, CA 94105',
      carrier: 'FedEx Express',
      deliveryDays: 2,
      timeline: [
        { title: 'Shipped via FedEx Express', time: 'Yesterday, 15:30 PM', completed: true },
        { title: 'Order Placed', time: 'Yesterday, 14:30 PM', completed: true }
      ]
    }
  })

  // Filter orders by active tab & search query
  const filteredTabOrders = useMemo(() => {
    return orders.filter(order => {
      // 1. Filter by search query
      const matchesSearch = 
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.status.toLowerCase().includes(searchQuery.toLowerCase())

      if (!matchesSearch) return false

      // 2. Filter by status tabs
      if (selectedTab === 'All') return true
      if (selectedTab === 'Pending') return order.status === 'Pending' || order.status === 'Processing'
      if (selectedTab === 'Processing') return order.status === 'Processing'
      if (selectedTab === 'Shipped') return order.status === 'Shipped' || order.status === 'Delivered'

      return true
    })
  }, [orders, selectedTab, searchQuery])

  // Selection handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrderIds(filteredTabOrders.map(o => o.id))
    } else {
      setSelectedOrderIds([])
    }
  }

  const handleSelectOne = (e, id) => {
    e.stopPropagation()
    if (e.target.checked) {
      setSelectedOrderIds(prev => [...prev, id])
    } else {
      setSelectedOrderIds(prev => prev.filter(item => item !== id))
    }
  }

  // Bulk status handlers
  const handleBulkMarkShipped = () => {
    selectedOrderIds.forEach(id => {
      onUpdateStatus(id, 'Shipped')
    })
    setSelectedOrderIds([])
    alert('Bulk action completed: Selected orders marked as Shipped!')
  }

  const handleBulkCancel = () => {
    selectedOrderIds.forEach(id => {
      onUpdateStatus(id, 'Processing') // Reset or mock cancel
    })
    setSelectedOrderIds([])
    alert('Bulk action completed: Selected orders status reset!')
  }

  // Fulfill single order inside drawer
  const handleFulfillSingle = (id) => {
    onUpdateStatus(id, 'Shipped')
    // Update local drawer state if open
    if (detailOrder && detailOrder.id === id) {
      setDetailOrder(prev => ({ ...prev, status: 'Shipped' }))
    }
    alert(`Order ${id} fulfilled successfully!`)
  }

  // Get dynamic details matching clicked order
  const getOrderDetails = (order) => {
    const details = ordersDetails[order.id] || {
      items: [
        { name: 'Custom Shoe Item', size: '10', color: 'Stealth Black', qty: 1, price: order.amount, imageId: '1' }
      ],
      subtotal: order.amount,
      shipping: 'Free',
      total: order.amount,
      email: order.email || 'customer@example.com',
      phone: '+1 (555) 000-0000',
      address: '100 Main St, Suite 500, New York, NY 10001',
      carrier: 'LUNARIS Premium Post',
      deliveryDays: 3,
      timeline: [
        { title: 'Order Received', time: order.date, completed: true }
      ]
    }
    return { ...order, ...details }
  }

  // Edit Panel State Handlers
  const handleStartEdit = () => {
    if (!detailOrder) return
    const details = ordersDetails[detailOrder.id] || {}
    setEditStatus(detailOrder.status)
    setEditCarrier(details.carrier || '')
    setEditDeliveryDays(details.deliveryDays || 3)
    setEditTimelineNote('')
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    if (!detailOrder) return

    const orderId = detailOrder.id
    
    // Construct new timeline event if the user added one
    const newTimeline = [...(ordersDetails[orderId]?.timeline || [])]
    if (editTimelineNote.trim()) {
      newTimeline.unshift({
        title: editTimelineNote,
        time: 'Just now',
        completed: true
      })
    } else if (editStatus !== detailOrder.status) {
      // Auto-append timeline log if only status was changed
      newTimeline.unshift({
        title: `Status updated to ${editStatus}`,
        time: 'Just now',
        completed: true
      })
    }

    // Update the dynamic order details state dictionary
    setOrdersDetails(prev => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        carrier: editCarrier,
        deliveryDays: editDeliveryDays,
        timeline: newTimeline
      }
    }))

    // Sync with parent orders list state
    onUpdateStatus(orderId, editStatus)

    // Update local detailOrder state so the drawer UI reflects it instantly
    setDetailOrder(prev => ({
      ...prev,
      status: editStatus,
      carrier: editCarrier,
      deliveryDays: editDeliveryDays,
      timeline: newTimeline
    }))

    // Reset editing states
    setIsEditing(false)
    setEditTimelineNote('')
  }

  return (
    <div className="animate-fadeIn">
      {/* Title & Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-3 select-none">
        <div>
          <h1 className="font-display font-black text-xl tracking-tight text-[#181c1e] uppercase">
            Orders Console
          </h1>
          <p className="text-[11px] text-[#44474c] mt-0.5 font-medium">
            Manage, fulfill, and review customer purchase orders.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => alert('Orders spreadsheet report exported successfully.')}
            className="bg-white border border-[#c4c6cc] text-[#181c1e] px-4 py-2 rounded-lg font-black text-[9px] uppercase tracking-widest flex items-center gap-1.5 hover:bg-[#f1f4f6] transition-colors shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">download</span>
            Export
          </button>
          
          <button 
            onClick={() => alert('New mock order creator console initialized.')}
            className="bg-black text-white px-4 py-2 rounded-lg font-black text-[9px] uppercase tracking-widest flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">add</span>
            Create Order
          </button>
        </div>
      </div>

      {/* Left/Main Workspace Container */}
      <div className="flex flex-col gap-4">
        
        {/* Filter Toolbar (Tabs, Filters) */}
        <div className="bg-white border border-[#c4c6cc]/30 rounded-xl p-3 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-3 select-none">
          
          {/* Tabs selectors */}
          <div className="flex flex-wrap gap-1">
            {['All', 'Pending', 'Processing', 'Shipped'].map(tab => (
              <button
                key={tab}
                onClick={() => { setSelectedTab(tab); setSelectedOrderIds([]); }}
                className={`px-3 py-1.5 rounded-lg text-[10px] uppercase font-black tracking-wider transition-all cursor-pointer ${
                  selectedTab === tab
                    ? 'bg-black text-white shadow-sm font-extrabold'
                    : 'text-[#44474c] hover:bg-[#f1f4f6] border border-transparent'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Quick Stats Filter Summary */}
          <div className="text-[10px] font-bold text-[#44474c] uppercase tracking-wider">
            Showing {filteredTabOrders.length} Orders
          </div>

        </div>

        {/* Bulk Action Toolbar */}
        {selectedOrderIds.length > 0 && (
          <div className="bg-[#d3e4ff] text-[#001c38] rounded-xl p-3 flex justify-between items-center shadow-sm border border-[#47a1ff]/30 animate-fadeIn select-none">
            <span className="text-[11px] font-black uppercase tracking-wider">
              {selectedOrderIds.length} Orders Selected
            </span>
            <div className="flex gap-2">
              <button 
                onClick={handleBulkMarkShipped}
                className="bg-white text-[#181c1e] px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-[#f1f4f6] transition-colors cursor-pointer border border-[#c4c6cc]"
              >
                Mark Shipped
              </button>
              
              <button 
                onClick={handleBulkCancel}
                className="bg-[#ffdad6] text-[#ba1a1a] px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-red-100 transition-colors cursor-pointer border border-red-200"
              >
                Reset Processing
              </button>
            </div>
          </div>
        )}

        {/* Desktop Table Layout */}
        <div className="hidden md:block bg-white border border-[#c4c6cc]/30 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f1f4f6] border-b border-[#c4c6cc]/20 select-none">
                <tr className="text-[9px] text-[#44474c] uppercase tracking-wider font-bold">
                  <th className="p-3 w-10 text-center">
                    <input 
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={filteredTabOrders.length > 0 && selectedOrderIds.length === filteredTabOrders.length}
                      className="rounded border-[#c4c6cc] text-black focus:ring-black cursor-pointer w-3.5 h-3.5"
                    />
                  </th>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3 text-right">Amount</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 w-12 text-center"></th>
                </tr>
              </thead>
              <tbody className="text-[11px] text-[#181c1e] divide-y divide-[#c4c6cc]/10">
                {filteredTabOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-[#44474c]/50 font-bold select-none">
                      No customer orders found.
                    </td>
                  </tr>
                ) : (
                  filteredTabOrders.map(order => {
                    const isSelected = selectedOrderIds.includes(order.id)
                    const initials = order.customer.split(' ').map(n => n[0]).join('').toUpperCase()
                    
                    return (
                      <tr 
                        key={order.id}
                        onClick={() => setDetailOrder(getOrderDetails(order))}
                        className={`hover:bg-[#f7fafc] transition-colors cursor-pointer group ${
                          isSelected ? 'bg-[#d3e4ff]/10' : ''
                        }`}
                      >
                        <td className="p-3 text-center" onClick={(e) => e.stopPropagation()}>
                          <input 
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => handleSelectOne(e, order.id)}
                            className="rounded border-[#c4c6cc] text-black focus:ring-black cursor-pointer w-3.5 h-3.5"
                          />
                        </td>
                        <td className="p-3 font-black text-[#0060a8] hover:underline">
                          {order.id}
                        </td>
                        <td className="p-3 text-[#44474c] text-[10px] font-medium">
                          {order.date}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-[#e5e9eb] flex items-center justify-center font-black text-[9px] text-[#181c1e] select-none shadow-sm">
                              {initials}
                            </div>
                            <span className="font-bold">{order.customer}</span>
                          </div>
                        </td>
                        <td className="p-3 text-right font-black text-black">
                          {order.amount}
                        </td>
                        <td className="p-3 text-center">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[8px] uppercase font-black border tracking-wider select-none ${
                            order.status === 'Processing' ? 'bg-[#feddba] border-[#e0c1a0] text-[#584329]' :
                            order.status === 'Shipped' ? 'bg-[#d3e4ff] border-[#a2c9ff] text-[#003663]' :
                            'bg-emerald-500/5 border-emerald-500/25 text-emerald-600'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button className="text-[#44474c] hover:text-black opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center mx-auto">
                            <span className="material-symbols-outlined text-[16px]">more_vert</span>
                          </button>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card List Layout */}
        <div className="block md:hidden space-y-2">
          {filteredTabOrders.length === 0 ? (
            <div className="bg-white border border-[#c4c6cc]/30 rounded-xl p-6 text-center text-[#44474c]/50 font-bold select-none shadow-2xs">
              No customer orders found.
            </div>
          ) : (
            filteredTabOrders.map(order => {
              const isSelected = selectedOrderIds.includes(order.id)
              const initials = order.customer.split(' ').map(n => n[0]).join('').toUpperCase()
              
              return (
                <div
                  key={order.id}
                  onClick={() => setDetailOrder(getOrderDetails(order))}
                  className={`bg-white rounded-xl border border-[#c4c6cc]/30 p-3 shadow-2xs hover:bg-[#f7fafc] transition-colors cursor-pointer flex flex-col gap-2 relative ${
                    isSelected ? 'border-[#0060a8] bg-[#d3e4ff]/5' : ''
                  }`}
                >
                  <div className="flex justify-between items-center select-none">
                    <div className="flex items-center gap-2">
                      <div onClick={(e) => e.stopPropagation()}>
                        <input 
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleSelectOne(e, order.id)}
                          className="rounded border-[#c4c6cc] text-black focus:ring-black cursor-pointer w-3.5 h-3.5"
                        />
                      </div>
                      <span className="font-black text-[#0060a8]">{order.id}</span>
                    </div>
                    <span className="text-[9px] text-[#44474c] font-black uppercase tracking-wider">{order.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-5.5 h-5.5 rounded-full bg-[#e5e9eb] flex items-center justify-center font-black text-[8px] text-[#181c1e] shadow-sm select-none">
                      {initials}
                    </div>
                    <span className="font-bold text-[11px] text-[#181c1e]">{order.customer}</span>
                  </div>

                  <div className="flex justify-between items-center border-t border-[#c4c6cc]/10 pt-2 select-none">
                    <span className="font-black text-black text-xs">{order.amount}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[8px] uppercase font-black border tracking-wider ${
                      order.status === 'Processing' ? 'bg-[#feddba] border-[#e0c1a0] text-[#584329]' :
                      order.status === 'Shipped' ? 'bg-[#d3e4ff] border-[#a2c9ff] text-[#003663]' :
                      'bg-emerald-500/5 border-emerald-500/25 text-emerald-600'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              )
            })
          )}
        </div>

      </div>

      {/* Portal for sliding drawer and backdrop to ensure they are rendered at root DOM level */}
      {createPortal(
        <>
          {/* Sliding Order Details Panel Drawer Overlay Backdrop */}
          {detailOrder && (
            <div 
              onClick={() => setDetailOrder(null)}
              className="fixed inset-0 bg-[#181c1e]/20 backdrop-blur-xs z-50 transition-opacity"
            />
          )}

          {/* Slide-in Order Detail Panel Drawer */}
          <aside 
            style={{ transform: detailOrder ? 'translateX(0)' : 'translateX(100%)' }}
            className="fixed inset-y-0 right-0 w-full md:max-w-[50vw] bg-white border-l border-[#c4c6cc]/30 shadow-2xl z-[100] transition-transform duration-300 ease-in-out flex flex-col font-sans"
          >
        {detailOrder && (
          <>
            {/* Panel Header */}
            <div className="p-5 border-b border-[#c4c6cc]/20 flex justify-between items-start select-none bg-[#f8f9fa]">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h2 className="font-display font-black text-base text-[#181c1e]">{detailOrder.id}</h2>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[8px] uppercase font-black border tracking-wider ${
                    detailOrder.status === 'Processing' ? 'bg-[#feddba] border-[#e0c1a0] text-[#584329]' :
                    detailOrder.status === 'Shipped' ? 'bg-[#d3e4ff] border-[#a2c9ff] text-[#003663]' :
                    'bg-emerald-500/5 border-emerald-500/25 text-emerald-600'
                  }`}>
                    {detailOrder.status}
                  </span>
                </div>
                <p className="text-[10px] text-[#44474c] font-medium">Placed on {detailOrder.date}</p>
              </div>
              
              <button 
                onClick={() => setDetailOrder(null)}
                className="text-[#44474c] hover:text-black p-1 rounded-full hover:bg-[#e5e9eb] transition-all cursor-pointer flex items-center"
              >
                <span className="md:hidden flex items-center">
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                </span>
                <span className="hidden md:flex items-center">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </span>
              </button>
            </div>

            {/* Conditional scrolling content: Edit Form vs Standard Details */}
            {isEditing ? (
              /* Scrollable edit form body */
              <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5">
                <div className="border-b border-[#c4c6cc]/20 pb-2 mb-2 select-none">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#181c1e]">
                    Edit Order Fulfillment
                  </h3>
                  <p className="text-[10px] text-[#44474c] mt-0.5 font-medium">Update status, shipping carrier logistics, and estimated delivery timeline.</p>
                </div>

                {/* Status select dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-[#44474c]">Fulfillment Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="bg-white border border-[#c4c6cc] text-[#181c1e] text-xs font-medium rounded-lg p-2.5 w-full focus:ring-black focus:border-black cursor-pointer shadow-2xs"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Shipping Carrier/Post Company */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-[#44474c]">Shipping Post / Carrier Company</label>
                  <input
                    type="text"
                    value={editCarrier}
                    onChange={(e) => setEditCarrier(e.target.value)}
                    placeholder="e.g. FedEx Express, DHL, UPS, Blue Dart"
                    className="bg-white border border-[#c4c6cc] text-[#181c1e] text-xs font-medium rounded-lg p-2.5 w-full focus:ring-black focus:border-black shadow-2xs"
                  />
                </div>

                {/* Delivery Days Estimate */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-[#44474c]">Estimated Delivery Time (Days)</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={editDeliveryDays}
                    onChange={(e) => setEditDeliveryDays(parseInt(e.target.value) || '')}
                    placeholder="e.g. 3, 5, 7"
                    className="bg-white border border-[#c4c6cc] text-[#181c1e] text-xs font-medium rounded-lg p-2.5 w-full focus:ring-black focus:border-black shadow-2xs"
                  />
                </div>

                {/* New Timeline Update (Optional log) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-[#44474c]">Fulfillment Tracking Log (Add Event)</label>
                  <input
                    type="text"
                    value={editTimelineNote}
                    onChange={(e) => setEditTimelineNote(e.target.value)}
                    placeholder="e.g. Out for delivery in New York, sorting completed"
                    className="bg-white border border-[#c4c6cc] text-[#181c1e] text-xs font-medium rounded-lg p-2.5 w-full focus:ring-black focus:border-black shadow-2xs"
                  />
                </div>
              </div>
            ) : (
              /* Standard Scrollable drawer body */
              <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
                
                {/* Product items list */}
                <section>
                  <h3 className="text-[9px] font-black uppercase tracking-widest text-[#44474c] mb-3 select-none">
                    Ordered Items ({detailOrder.items.length})
                  </h3>
                  
                  <div className="flex flex-col gap-3">
                    {detailOrder.items.map((item, idx) => (
                      <div key={idx} className="flex gap-3 items-center">
                        <div className="w-12 h-12 bg-[#e0e3e5] rounded-lg flex-shrink-0 overflow-hidden shadow-inner border border-[#c4c6cc]/20">
                          <img 
                            alt={item.name} 
                            className="w-full h-full object-cover" 
                            src={
                              item.imageId === '1' ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnVPUdXm_pAap42KSkT4ArWFfdYf-ZFKrsE_tHPRky1jzSabg38BG6x_wtZNLHmFZOWx72k1WGMpFziLCZRj4eylOUHbWrkBOcVUqJUWJZb1yf819e9_CWU6X-_4RMIi8hGC50bsibbgaxTqDMazaf6FaOxF31gZdvc1ZgkVOntDujCbh3MlTqN2RD2eF3FDs-C61VeKi6J3O7Jt_UWjVssWu1j7UNvSzXZrJ0sxVN-L4_o60TepEML7jMUo2yAPHQLmtz2Lg76RdO' :
                              item.imageId === '2' ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuA33pTwLK8ljQpwokuWtYPQ4xr6mcm6KJ_52Z8VnrXjy3jF9Q2Qftb3bZ99YnJMFm-c1slXgPY-JEm-U9cRGnnF4vm7sOlhnNvcGiT0AxWrRPXWpAoHdbGXNTvKBOO66jygM26sk4aEe6iGofD86TWxz2tPRnhOb43uUz5FabSPy8EKevdmQkub5iuDvU_6Jg4K6mbZWHTfaYSK6Rxqc2X1lC_ygHDdnbROPBVQZMMvo3EEqOaNZIHgQLx1IVz4URdvWgcekJ0p7Gj3' :
                              'https://lh3.googleusercontent.com/aida-public/AB6AXuDk_ZTAV9YluFaWIjk_6kCYtrGq8tYEa5Qd4IQTiiZMy8unTADAZDg6tx51Xmh3gTOikYfx0RtzgZVMSKUOlT1pRPYmLEoHS59G7Yzgjkoyep0Y-DE-2IBJVar-Koqqn0PaSPvApQthvMyLTyvHdQwHfQiR7NSwBrkcV0bsTWfqSz_baF6BvUbR_Qg3-n-T5DlHhB4ghMxsiIqhGfO2uFUsJUJ5b0qC8ExEIsgj81fp8rUy4RR51epfbKK4NEvwCWoQ5ZsncPMoX4hv'
                            }
                          />
                        </div>
                        <div className="flex-grow flex justify-between min-w-0">
                          <div>
                            <h4 className="text-xs font-black text-[#181c1e] leading-tight truncate">{item.name}</h4>
                            <p className="text-[9px] text-[#44474c] mt-0.5 font-bold uppercase tracking-wide">
                              Size: {item.size} | Color: {item.color}
                            </p>
                            <p className="text-[9px] text-[#181c1e] mt-1 font-black uppercase">
                              Quantity: {item.qty}
                            </p>
                          </div>
                          <span className="text-xs font-black text-[#181c1e]">{item.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#c4c6cc]/20 select-none">
                    <div className="flex justify-between text-[10px] text-[#44474c] font-bold uppercase mb-1">
                      <span>Subtotal</span>
                      <span>{detailOrder.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-[#44474c] font-bold uppercase mb-1">
                      <span>Shipping Post</span>
                      <span>{detailOrder.shipping}</span>
                    </div>
                    <div className="flex justify-between text-xs font-black text-black mt-2 pt-2 border-t border-[#c4c6cc]/25 uppercase tracking-wider">
                      <span>Total Bill</span>
                      <span>{detailOrder.total}</span>
                    </div>
                  </div>
                </section>

                {/* Customer & Shipping Section */}
                <section className="grid grid-cols-2 gap-4 border-t border-[#c4c6cc]/10 pt-4 select-none">
                  <div>
                    <h3 className="text-[9px] font-black uppercase tracking-widest text-[#44474c] mb-1.5">Customer</h3>
                    <p className="text-xs font-black text-[#181c1e] leading-tight">{detailOrder.customer}</p>
                    <p className="text-[10px] text-[#44474c] font-medium mt-0.5">{detailOrder.email}</p>
                    <p className="text-[10px] text-[#44474c] font-medium">{detailOrder.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-[9px] font-black uppercase tracking-widest text-[#44474c] mb-1.5">Shipping Address</h3>
                    <p className="text-xs font-black text-[#181c1e] leading-tight">{detailOrder.address}</p>
                    {ordersDetails[detailOrder.id]?.carrier && (
                      <div className="mt-2 pt-2 border-t border-[#c4c6cc]/10 flex flex-col gap-1">
                        <p className="text-[9px] text-[#44474c] font-bold uppercase tracking-wide">Carrier Post</p>
                        <p className="text-xs font-black text-[#0060a8]">{ordersDetails[detailOrder.id].carrier}</p>
                        <p className="text-[9px] text-[#44474c] font-bold mt-0.5 uppercase tracking-wide">
                          Delivery Time: <span className="text-black font-extrabold">{ordersDetails[detailOrder.id].deliveryDays} Days</span>
                        </p>
                      </div>
                    )}
                  </div>
                </section>

                {/* Timeline Progress */}
                <section className="border-t border-[#c4c6cc]/10 pt-4">
                  <h3 className="text-[9px] font-black uppercase tracking-widest text-[#44474c] mb-3 select-none">
                    Fulfillment Timeline
                  </h3>
                  
                  <div className="flex flex-col gap-3 relative before:absolute before:inset-y-0 before:left-2 before:w-px before:bg-[#c4c6cc]/40 select-none">
                    {detailOrder.timeline.map((event, idx) => (
                      <div key={idx} className="flex gap-3 relative z-10">
                        <div className="w-4 h-4 rounded-full bg-[#d6e4f9] border-2 border-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0060a8]"></span>
                        </div>
                        <div>
                          <p className="text-xs font-black text-[#181c1e] leading-tight">{event.title}</p>
                          <p className="text-[9px] text-[#44474c] font-bold uppercase tracking-wider mt-0.5">{event.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

              </div>
            )}

            {/* Panel Footer Actions */}
            <div className="p-4 border-t border-[#c4c6cc]/20 bg-[#f8f9fa] flex gap-2 select-none">
              {isEditing ? (
                <>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-white border border-[#c4c6cc] text-[#181c1e] py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-[#f1f4f6] transition-colors cursor-pointer border border-[#c4c6cc]"
                  >
                    Cancel
                  </button>
                  
                  <button 
                    onClick={handleSaveEdit}
                    className="flex-1 bg-black text-white py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleStartEdit}
                    className="flex-1 bg-white border border-[#c4c6cc] text-[#181c1e] py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-[#f1f4f6] transition-colors cursor-pointer"
                  >
                    Edit Details
                  </button>
                  
                  <button 
                    onClick={() => handleFulfillSingle(detailOrder.id)}
                    disabled={detailOrder.status === 'Shipped'}
                    className="flex-1 bg-black text-white py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                  >
                    Fulfill Order
                  </button>
                </>
              )}
            </div>
          </>
        )}
          </aside>
        </>,
        document.body
      )}
    </div>
  );
}
