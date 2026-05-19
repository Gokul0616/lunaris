import { useState, useMemo } from 'react'

export default function Inventory({ products, onAdjustStock, onToggleActive, onAddProduct, searchQuery }) {
  // Local Filtering states
  const [selectedCategory, setSelectedCategory] = useState('') // '', 'Mens Footwear', 'Mens Apparel', 'Unisex Footwear'
  const [selectedStatus, setSelectedStatus] = useState('') // '', 'active', 'draft'

  // Modal open state for adding a product
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // Product creation form fields
  const [newProductName, setNewProductName] = useState('')
  const [newProductCategory, setNewProductCategory] = useState('Mens Footwear')
  const [newProductTag, setNewProductTag] = useState('Performance')
  const [newProductPrice, setNewProductPrice] = useState('120.00')
  const [newProductStock, setNewProductStock] = useState('50')
  const [newProductSku, setNewProductSku] = useState('')

  // Filter products by dropdown options and search queries
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // 1. Filter by search query
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())

      if (!matchesSearch) return false

      // 2. Filter by category
      if (selectedCategory && product.category !== selectedCategory) return false

      // 3. Filter by status
      if (selectedStatus) {
        const isProductActive = product.active;
        if (selectedStatus === 'active' && !isProductActive) return false
        if (selectedStatus === 'draft' && isProductActive) return false
      }

      return true
    })
  }, [products, selectedCategory, selectedStatus, searchQuery])

  // Form submit handler
  const handleCreateProductSubmit = (e) => {
    e.preventDefault()
    
    if (!newProductName || !newProductSku) {
      alert('Please fill out the Product Name and SKU fields.')
      return
    }

    const priceNum = parseFloat(newProductPrice) || 99.99
    const stockNum = parseInt(newProductStock) || 10

    onAddProduct({
      name: newProductName,
      category: newProductCategory,
      tag: newProductTag,
      price: priceNum,
      stock: stockNum,
      size: '10', // Default sizing
      sku: newProductSku.toUpperCase(),
      active: true
    })

    // Reset Form Fields
    setNewProductName('')
    setNewProductSku('')
    setNewProductPrice('120.00')
    setNewProductStock('50')
    setIsAddModalOpen(false)

    alert('Product successfully added to the active catalog!')
  }

  return (
    <div className="animate-fadeIn">
      {/* Page Header */}
      <div className="flex justify-between items-end border-b border-[#c4c6cc]/20 pb-5 mb-5 select-none">
        <div>
          <h2 className="font-display font-black text-xl text-[#181c1e] tracking-tight uppercase">
            Product Management
          </h2>
          <p className="text-[11px] text-[#44474c] mt-0.5 font-medium">
            Manage your catalog, stock allocations, and active variants.
          </p>
        </div>
        
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-black text-white font-black text-[9px] uppercase tracking-widest px-4 py-2.5 rounded-lg flex items-center gap-1.5 hover:opacity-90 transition-opacity shadow-md cursor-pointer"
        >
          <span className="material-symbols-outlined text-[15px]">add</span>
          Add Product
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col md:flex-row gap-3 mb-5 items-center justify-between select-none">
        {/* Helper info tag */}
        <div className="text-[10px] text-[#44474c] font-black uppercase tracking-wider">
          Catalog Index: {filteredProducts.length} Items
        </div>

        {/* Dropdown Filters */}
        <div className="flex gap-2 w-full md:w-auto">
          {/* Category Dropdown */}
          <div className="relative min-w-[130px] flex-grow md:flex-grow-0">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none bg-white border border-[#c4c6cc]/30 rounded-lg px-3 py-1.5 pr-8 text-[11px] font-bold text-[#181c1e] focus:outline-none focus:border-[#0060a8] transition-colors cursor-pointer"
            >
              <option value="">All Categories</option>
              <option value="Mens Footwear">Mens Footwear</option>
              <option value="Mens Apparel">Mens Apparel</option>
              <option value="Unisex Footwear">Unisex Footwear</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#c4c6cc] pointer-events-none text-[15px]">
              expand_more
            </span>
          </div>

          {/* Status Dropdown */}
          <div className="relative min-w-[110px] flex-grow md:flex-grow-0">
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full appearance-none bg-white border border-[#c4c6cc]/30 rounded-lg px-3 py-1.5 pr-8 text-[11px] font-bold text-[#181c1e] focus:outline-none focus:border-[#0060a8] transition-colors cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#c4c6cc] pointer-events-none text-[15px]">
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Product Data Table */}
      <div className="hidden md:block bg-white border border-[#c4c6cc]/30 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f1f4f6] border-b border-[#c4c6cc]/20 select-none">
              <tr className="text-[9px] text-[#44474c] uppercase tracking-wider font-bold">
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">SKU</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3 text-right">Price</th>
                <th className="px-5 py-3 text-right">Stock</th>
                <th className="px-5 py-3 text-center">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c4c6cc]/10 text-[11px] text-[#181c1e]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-[#44474c]/50 font-bold select-none">
                    No catalog products matched your selected options.
                  </td>
                </tr>
              ) : (
                filteredProducts.map(product => {
                  return (
                    <tr key={product.sku} className="hover:bg-[#f7fafc] transition-colors group">
                      {/* Thumbnail & name */}
                      <td className="px-5 py-3.5 flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#e0e3e5] rounded-lg overflow-hidden shrink-0 border border-[#c4c6cc]/20 shadow-inner flex items-center justify-center select-none">
                          {product.sku === 'FTW-SLD-002' ? (
                            <span className="material-symbols-outlined text-[#74777d] text-[18px]">image</span>
                          ) : (
                            <img 
                              alt={product.name} 
                              className="w-full h-full object-cover" 
                              src={
                                product.id === '1' ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF4nxKMgf9h1nslgbRNqaIPoeRp039zphn7-5jETCYBs3Kw6rjadR1EJIFjtvSuCwGnYnXgpn6Ko275bca5RTVk0swSH6ay0DHMx3FrGBtpeQvRsf-owM1aggkiJlHbgYe9TudQnrbjBNbyGjVpkrEItM4ba3deao_4ToKgftdHL2ngKpXSk8jB6qsxbDmuMpO4GvukTEqAsi2E1R6I0tY1bBE5zap768977YXHT_GJXh_FWe3BEXxDGEEurjwegi6-t77dQIY5URB' :
                                product.id === '2' ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn_JOLdDA4AFJAm82VSXc8-u0DzqXmm5GuApdFkWgrYKfbTICh4PlsDyqjWRCMgjTArDMxiMu4xc-9reNReSQfycyv0KE4YB6F4bBNowdBTkmPF0bJr5UyROp9Ui5Tbwsdh8oSKFxxrtFYORb5PdwPPFCnaw6cNcsOi3r0e05Z_W75RpSSleXoUst95I1cMZzUs6G26ue4fBhx1nYqNI8T0k06NHiECfltLLZ_L6Hpf1M8Zbi52GIEIKsrECMwsSVB4oyvjZq8THe6' :
                                'https://lh3.googleusercontent.com/aida-public/AB6AXuDk_ZTAV9YluFaWIjk_6kCYtrGq8tYEa5Qd4IQTiiZMy8unTADAZDg6tx51Xmh3gTOikYfx0RtzgZVMSKUOlT1pRPYmLEoHS59G7Yzgjkoyep0Y-DE-2IBJVar-Koqqn0PaSPvApQthvMyLTyvHdQwHfQiR7NSwBrkcV0bsTWfqSz_baF6BvUbR_Qg3-n-T5DlHhB4ghMxsiIqhGfO2uFUsJUJ5b0qC8ExEIsgj81fp8rUy4RR51epfbKK4NEvwCWoQ5ZsncPMoX4hv'
                              }
                            />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-[#181c1e]">{product.name}</div>
                          <div className="text-[9px] text-[#44474c] mt-0.5 font-medium uppercase tracking-wide">
                            {product.category}
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="px-5 py-3.5 font-mono text-[10px] text-[#44474c] select-all font-semibold">
                        {product.sku}
                      </td>

                      {/* Category Pill Tag */}
                      <td className="px-5 py-3.5 select-none">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-wider bg-[#f1f4f6] text-[#44474c] border border-[#c4c6cc]/25 shadow-2xs">
                          {product.tag || 'Standard'}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-5 py-3.5 font-black text-right text-black select-all">
                        ${product.price.toFixed(2)}
                      </td>

                      {/* Stock indicator */}
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            product.stock === 0 ? 'bg-[#c4c6cc]' :
                            product.stock <= 15 ? 'bg-[#ba1a1a]' : 'bg-emerald-500'
                          }`} />
                          <span className={`font-bold ${
                            product.stock === 0 ? 'text-[#c4c6cc]' :
                            product.stock <= 15 ? 'text-[#ba1a1a] font-extrabold' : 'text-[#181c1e]'
                          }`}>
                            {product.stock}
                          </span>
                        </div>
                      </td>

                      {/* Interactive Minimal Toggle Switch */}
                      <td className="px-5 py-3.5 text-center select-none">
                        <button
                          onClick={() => onToggleActive(product.sku)}
                          className={`relative inline-flex h-4.5 w-8 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${
                            product.active ? 'bg-black' : 'bg-[#e5e9eb] border border-[#c4c6cc]'
                          }`}
                        >
                          <span 
                            className={`inline-block h-3 w-3 rounded-full bg-white transition-transform ${
                              product.active ? 'translate-x-4.5' : 'translate-x-0.5 bg-[#74777d]'
                            }`} 
                          />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right select-none">
                        <button 
                          onClick={() => alert(`Catalog editor loaded for product: ${product.name}`)}
                          className="text-[#44474c] hover:text-black transition-colors p-1.5 hover:bg-[#e5e9eb] rounded-md cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px] flex items-center justify-center">edit</span>
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-5 py-3 border-t border-[#c4c6cc]/20 flex items-center justify-between bg-[#f8f9fa] select-none">
          <span className="text-[10px] text-[#44474c] font-medium">
            Showing 1 to {filteredProducts.length} of {products.length} catalog products
          </span>
          <div className="flex gap-1">
            <button className="px-2.5 py-1 border border-[#c4c6cc] rounded bg-white hover:bg-[#f1f4f6] text-[#44474c] disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center" disabled>
              <span className="material-symbols-outlined text-[14px]">chevron_left</span>
            </button>
            <button className="px-2.5 py-1 border border-[#c4c6cc] rounded bg-white hover:bg-[#f1f4f6] text-[#181c1e] cursor-pointer flex items-center">
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Card List Layout */}
      <div className="block md:hidden space-y-2.5">
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-[#c4c6cc]/30 rounded-xl p-6 text-center text-[#44474c]/50 font-bold select-none shadow-2xs">
            No catalog products matched your selected options.
          </div>
        ) : (
          filteredProducts.map(product => {
            return (
              <div 
                key={product.sku}
                className="bg-white rounded-xl border border-[#c4c6cc]/30 p-3 shadow-2xs flex flex-col gap-2 relative"
              >
                <div className="flex gap-2.5 items-center">
                  <div className="w-11 h-11 bg-[#e0e3e5] rounded-lg overflow-hidden shrink-0 border border-[#c4c6cc]/20 shadow-inner flex items-center justify-center select-none">
                    {product.sku === 'FTW-SLD-002' ? (
                      <span className="material-symbols-outlined text-[#74777d] text-[18px]">image</span>
                    ) : (
                      <img 
                        alt={product.name} 
                        className="w-full h-full object-cover" 
                        src={
                          product.id === '1' ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF4nxKMgf9h1nslgbRNqaIPoeRp039zphn7-5jETCYBs3Kw6rjadR1EJIFjtvSuCwGnYnXgpn6Ko275bca5RTVk0swSH6ay0DHMx3FrGBtpeQvRsf-owM1aggkiJlHbgYe9TudQnrbjBNbyGjVpkrEItM4ba3deao_4ToKgftdHL2ngKpXSk8jB6qsxbDmuMpO4GvukTEqAsi2E1R6I0tY1bBE5zap768977YXHT_GJXh_FWe3BEXxDGEEurjwegi6-t77dQIY5URB' :
                          product.id === '2' ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn_JOLdDA4AFJAm82VSXc8-u0DzqXmm5GuApdFkWgrYKfbTICh4PlsDyqjWRCMgjTArDMxiMu4xc-9reNReSQfycyv0KE4YB6F4bBNowdBTkmPF0bJr5UyROp9Ui5Tbwsdh8oSKFxxrtFYORb5PdwPPFCnaw6cNcsOi3r0e05Z_W75RpSSleXoUst95I1cMZzUs6G26ue4fBhx1nYqNI8T0k06NHiECfltLLZ_L6Hpf1M8Zbi52GIEIKsrECMwsSVB4oyvjZq8THe6' :
                          'https://lh3.googleusercontent.com/aida-public/AB6AXuDk_ZTAV9YluFaWIjk_6kCYtrGq8tYEa5Qd4IQTiiZMy8unTADAZDg6tx51Xmh3gTOikYfx0RtzgZVMSKUOlT1pRPYmLEoHS59G7Yzgjkoyep0Y-DE-2IBJVar-Koqqn0PaSPvApQthvMyLTyvHdQwHfQiR7NSwBrkcV0bsTWfqSz_baF6BvUbR_Qg3-n-T5DlHhB4ghMxsiIqhGfO2uFUsJUJ5b0qC8ExEIsgj81fp8rUy4RR51epfbKK4NEvwCWoQ5ZsncPMoX4hv'
                        }
                      />
                    )}
                  </div>
                  <div className="flex-grow select-none">
                    <span className="font-bold text-[#181c1e] text-[11px] block">{product.name}</span>
                    <span className="font-mono text-[9px] text-[#44474c] block mt-0.5">{product.sku}</span>
                  </div>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[7.5px] font-black uppercase tracking-wider bg-[#f1f4f6] text-[#44474c] border border-[#c4c6cc]/25 select-none shrink-0">
                    {product.tag || 'Standard'}
                  </span>
                </div>

                <div className="flex justify-between items-center border-t border-[#c4c6cc]/10 pt-2 select-none">
                  <div className="flex items-center gap-3">
                    <span className="font-black text-black text-[11px]">${product.price.toFixed(2)}</span>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        product.stock === 0 ? 'bg-[#c4c6cc]' :
                        product.stock <= 15 ? 'bg-[#ba1a1a]' : 'bg-emerald-500'
                      }`} />
                      <span className="text-[10px] font-bold text-[#181c1e]">{product.stock} units</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleActive(product.sku)}
                      className={`relative inline-flex h-4.5 w-8 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${
                        product.active ? 'bg-black' : 'bg-[#e5e9eb] border border-[#c4c6cc]'
                      }`}
                    >
                      <span 
                        className={`inline-block h-3 w-3 rounded-full bg-white transition-transform ${
                          product.active ? 'translate-x-4.5' : 'translate-x-0.5 bg-[#74777d]'
                        }`} 
                      />
                    </button>

                    <button 
                      onClick={() => alert(`Catalog editor loaded for product: ${product.name}`)}
                      className="text-[#44474c] hover:text-black p-1 hover:bg-[#e5e9eb] rounded transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px] flex items-center justify-center">edit</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Dynamic Product Creation Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#c4c6cc]/30 shadow-2xl w-full max-w-[380px] overflow-hidden animate-fadeIn">
            {/* Modal Header */}
            <div className="p-4 border-b border-[#c4c6cc]/10 bg-[#f8f9fa] flex justify-between items-center select-none">
              <h3 className="font-display font-black text-xs text-black uppercase tracking-wider">
                Add Product Variant
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#44474c] hover:text-black p-0.5 rounded-full hover:bg-[#e5e9eb] transition-all cursor-pointer flex items-center"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateProductSubmit} className="p-4 flex flex-col gap-3 select-none">
              {/* Product Name */}
              <div className="flex flex-col gap-0.5">
                <label className="text-[9px] font-black uppercase tracking-widest text-[#44474c]">Product Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Pace Runner X"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full bg-[#f1f4f6] border border-[#c4c6cc]/35 rounded-lg py-2 px-3 text-xs text-black focus:outline-none focus:border-[#0060a8]"
                />
              </div>

              {/* SKU */}
              <div className="flex flex-col gap-0.5">
                <label className="text-[9px] font-black uppercase tracking-widest text-[#44474c]">SKU Reference</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. FTW-VEL-004"
                  value={newProductSku}
                  onChange={(e) => setNewProductSku(e.target.value)}
                  className="w-full bg-[#f1f4f6] border border-[#c4c6cc]/35 rounded-lg py-2 px-3 text-xs text-black focus:outline-none focus:border-[#0060a8]"
                />
              </div>

              {/* Grid block for details */}
              <div className="grid grid-cols-2 gap-3">
                {/* Category selector */}
                <div className="flex flex-col gap-0.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-[#44474c]">Category</label>
                  <select 
                    value={newProductCategory}
                    onChange={(e) => setNewProductCategory(e.target.value)}
                    className="w-full bg-[#f1f4f6] border border-[#c4c6cc]/35 rounded-lg py-2 px-2.5 text-xs text-black focus:outline-none focus:border-[#0060a8]"
                  >
                    <option value="Mens Footwear">Mens Footwear</option>
                    <option value="Mens Apparel">Mens Apparel</option>
                    <option value="Unisex Footwear">Unisex Footwear</option>
                  </select>
                </div>

                {/* Tag Selector */}
                <div className="flex flex-col gap-0.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-[#44474c]">Tag Badge</label>
                  <select 
                    value={newProductTag}
                    onChange={(e) => setNewProductTag(e.target.value)}
                    className="w-full bg-[#f1f4f6] border border-[#c4c6cc]/35 rounded-lg py-2 px-2.5 text-xs text-black focus:outline-none focus:border-[#0060a8]"
                  >
                    <option value="Performance">Performance</option>
                    <option value="Training">Training</option>
                    <option value="Lifestyle">Lifestyle</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Price */}
                <div className="flex flex-col gap-0.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-[#44474c]">Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    min="1"
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                    className="w-full bg-[#f1f4f6] border border-[#c4c6cc]/35 rounded-lg py-2 px-3 text-xs text-black focus:outline-none focus:border-[#0060a8]"
                  />
                </div>

                {/* Stock */}
                <div className="flex flex-col gap-0.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-[#44474c]">Initial Stock</label>
                  <input 
                    type="number" 
                    min="0"
                    value={newProductStock}
                    onChange={(e) => setNewProductStock(e.target.value)}
                    className="w-full bg-[#f1f4f6] border border-[#c4c6cc]/35 rounded-lg py-2 px-3 text-xs text-black focus:outline-none focus:border-[#0060a8]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 border-t border-[#c4c6cc]/10 pt-3 mt-1">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 bg-white border border-[#c4c6cc] text-[#181c1e] py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-[#f1f4f6] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-black text-white py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity cursor-pointer animate-pulse"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
