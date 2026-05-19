import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

// The 6 premium mock products from the template
const ALL_PRODUCTS = [
  {
    id: 'velocity-phantom',
    name: 'Velocity Phantom',
    brand: 'LUNARIS PRO',
    category: 'Running',
    price: 185.00,
    rating: 4.9,
    reviewsCount: 128,
    sizes: ['8', '8.5', '9', '9.5', '10.5'],
    colors: ['Black', 'Grey'],
    badge: 'New',
    colorHexes: ['#000000', '#808080'],
    imgSrc1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYg75Wd1HojwIw4KUhFBwjhq83FNyXYxUNNqvzDwXjvI3u7cx4nzicRzTY8duDSrhvxYpilIWYFTrrc0Hm3VA3iZDcMcQtNabNgpU57kQYjAHQ5jVbVJVlELH5ZyYw-lcnW2NOd3EwGTLk4zU9nTgg7Q335tNUNL-7IkbVUwaj9urlkldt8RtdB8dc9gnw3rms4QW2hRIZYISgcGKgnmmnmhljab2xieT4bU-ZoovS95DqyP8K6cxba-jTjz_aa6jTfjBAQ3CLXUC2'
  },
  {
    id: 'aero-glide-2',
    name: 'Aero Glide 2.0',
    brand: 'LUNARIS LITE',
    category: 'Running',
    price: 140.00,
    originalPrice: 165.00,
    rating: 4.6,
    reviewsCount: 84,
    sizes: ['7.5', '8', '8.5', '9', '10.5', '11'],
    colors: ['White', 'Blue'],
    badge: 'Sale',
    colorHexes: ['#ffffff', '#a2c9ff'],
    imgSrc1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXrzgwSPSRTnulpTqFXBQOUJdlnsRx4sS95u0U4trLrT0CjXbp8uLj9qK76SvSHAwiCtunnWQqKsBMYp5QWJenM0Za3ezZTBM7PNQO17tR0OCJdf7meCvCs7sHyClYGiCuiBJuL-ZzG0slmKd6f7PXOdznO8dhtvT7BoCUczypYfh8mq2x3aJhbbRAe8aRLck-v91Tac-I6pewXg_tdqFjNl-ibXu410W-YK2syZMQH-yPDndKMpvEWk8zz8HmPFfVGTP90XOoyGAC'
  },
  {
    id: 'summit-peak',
    name: 'Summit Peak',
    brand: 'LUNARIS TERRA',
    category: 'Training',
    price: 195.00,
    rating: 5.0,
    reviewsCount: 42,
    sizes: ['8', '8.5', '9', '9.5', '11'],
    colors: ['Grey', 'Black'],
    colorHexes: ['#808080', '#000000'],
    imgSrc1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS7iN4cI2LM2MRNfNPsELNWnpxvgBFbd4I8P3bXtNwj-DqzP1j1BjLMF2sQmcSBVytI7PhX_up4n09JRs_3JSSB3PIZgJe9rDcN6QCCWeNJYsyOiu8L8BHS3KSu-xigH39BiqQ4b6-y81XA518Z2BB7tHGvapNy1IRKtXtDyxPGHZMWXgBXh4JkwVEGycSWfHRp2v0nGU2KtEKGRGwU_e7kqfAnpwEZ09a9QwHpjMhmBObQ1lfKXiDNNT60Ae8x5W3CZ2SH0eJGnYL'
  },
  {
    id: 'nexus-slip',
    name: 'Nexus Slip',
    brand: 'LUNARIS CORE',
    category: 'Recovery',
    price: 130.00,
    rating: 4.4,
    reviewsCount: 210,
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10.5', '11'],
    colors: ['Black', 'Grey'],
    badge: 'Low Stock',
    colorHexes: ['#000000', '#1a1a1a'],
    imgSrc1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1_wuyDCapxZvH_Td7iOtj0RqJb6wfWC88fbdPMlwNRi-sSxKJYzzLwFgYyrOKN6FIIerFYxntWxJXszXAEeTdK_IpHdh8aHMbQhaYRD14uXnTEhEDee6pXbuTfZnKCgulqCHrv4iTqz9TE_-7bvzcPc6y0KbhWLms0Q_HDGMa3VdaJ6XEoa3WJ3CqZD4vnKs4zk4KXoDNAU7awgsZzsqtZSyBKe3M-u_CUiKlUf9R04SgtmLKaMQp1PqzGPDs6J_Zg0yQ8Lu52qoj'
  },
  {
    id: 'aeromax-elite',
    name: 'AeroMax Elite',
    brand: 'LUNARIS PRO',
    category: 'Running',
    price: 240.00,
    rating: 4.9,
    reviewsCount: 128,
    sizes: ['8', '8.5', '9', '9.5', '10', '10.5', '11', '12'],
    colors: ['White', 'Blue'],
    badge: 'Elite',
    colorHexes: ['#ffffff', '#a2c9ff'],
    imgSrc1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHFDhdExrS5zDK9zZ0iv8bQ8LaXiJNM8sno1bI-KEUJBpZAnQrIAeXgVrf3gX9Ebr5Z9mHn3nXanJnwktzzXEj_VOn3bftbRZL6t7Iv5oDAKygiClGgFBGL145y-8DXvl3-dZ4yTjdNAeLI_CkKWqlh1sNligDKyzVF74ASSXc-ZlxRQQAK8085IVdLSVzfZvpXnJxiPzV38zxrT51dtiMWtdjDvZ_AK1SHbx_EvJNJf2KnHSUiFCKShxd6pBxvfbsC_D0kQnvN6xB'
  },
  {
    id: 'shadow-form-x',
    name: 'Shadow Form X',
    brand: 'LUNARIS CORE',
    category: 'Recovery',
    price: 150.00,
    rating: 4.5,
    reviewsCount: 198,
    sizes: ['8', '8.5', '9', '9.5', '10.5', '11'],
    colors: ['Black', 'Grey'],
    colorHexes: ['#000000', '#1a1a1a'],
    imgSrc1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV-4eQ0XAtCJMgpQNhM7_SM0CYkXVrd33BsswWnoIvh8gWLLQe9AcD2GhsY7HdsoZfqpzbFnwdwFbj438u5U1I8m7Tg8Nf20CNWrvYIthQCpwJg-7lymgmjps5TAgNUS1AASMgmibIl4v4FtM1ckOMq5xQckHdg8v7mR-zBQBWtV8PWMhAnywQvlPLZi6M6PZ696F-x6gt0-l2VRqfmQRzSnRHsUKnSJtmBrrNRlxh8Qs1JuGTVurB9u46nTTsw6O2lbLjcNfr0MU4'
  }
]

export default function Shop() {
  const navigate = useNavigate()

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('All Footwear')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [selectedSize, setSelectedSize] = useState('9')
  const [selectedColor, setSelectedColor] = useState('Black')
  const [selectedBrands, setSelectedBrands] = useState(['LUNARIS CORE'])
  const [sortBy, setSortBy] = useState('Featured')
  const [viewMode, setViewMode] = useState('grid')

  // Mobile Filter Drawer Toggle
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  // Clear filters
  const handleClearAll = () => {
    setSelectedCategory('All Footwear')
    setMinPrice('')
    setMaxPrice('')
    setSelectedSize('')
    setSelectedColor('')
    setSelectedBrands([])
  }

  // Handle brand checkbox
  const handleBrandChange = (brandName) => {
    setSelectedBrands(prev =>
      prev.includes(brandName)
        ? prev.filter(b => b !== brandName)
        : [...prev, brandName]
    )
  }

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(product => {
      // Category Filter
      if (selectedCategory !== 'All Footwear' && product.category !== selectedCategory) {
        return false
      }

      // Price Filters
      if (minPrice && product.price < parseFloat(minPrice)) {
        return false
      }
      if (maxPrice && product.price > parseFloat(maxPrice)) {
        return false
      }

      // Size Filter
      if (selectedSize && !product.sizes.includes(selectedSize)) {
        return false
      }

      // Color Filter
      if (selectedColor && !product.colors.includes(selectedColor)) {
        return false
      }

      // Brand Filter
      const normalizedProductBrand = product.brand.toUpperCase()
      const normalizedSelectedBrands = selectedBrands.map(b => b.toUpperCase())
      if (normalizedSelectedBrands.length > 0 && !normalizedSelectedBrands.includes(normalizedProductBrand)) {
        return false
      }

      return true
    }).sort((a, b) => {
      if (sortBy === 'New Arrivals' || sortBy === 'Featured') {
        return a.badge === 'New' ? -1 : 1
      }
      if (sortBy === 'Price: Low to High') {
        return a.price - b.price
      }
      if (sortBy === 'Price: High to Low') {
        return b.price - a.price
      }
      return 0
    })
  }, [selectedCategory, minPrice, maxPrice, selectedSize, selectedColor, selectedBrands, sortBy])

  // Filter Sidebar Content UI containing all template criteria
  const FilterSidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col gap-lg bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">

      {/* Categories */}
      <div className="flex flex-col gap-sm">
        <h3 className="font-label-lg text-xs uppercase tracking-widest text-primary font-bold">Categories</h3>
        <ul className="flex flex-col gap-xs font-body-sm text-sm text-on-surface-variant">
          {['All Footwear', 'Running', 'Training', 'Lifestyle', 'Recovery'].map((cat) => (
            <li key={cat}>
              <button
                onClick={() => {
                  setSelectedCategory(cat)
                  if (isMobile) setMobileDrawerOpen(false)
                }}
                className={`hover:text-secondary transition-colors text-left w-full cursor-pointer ${selectedCategory === cat ? 'font-bold text-secondary' : 'text-on-surface-variant'
                  }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div className="flex flex-col gap-sm border-t border-outline-variant/20 pt-4">
        <h3 className="font-label-lg text-xs uppercase tracking-widest text-primary font-bold">Price</h3>
        <div className="flex items-center gap-xs">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant rounded px-2 py-1.5 font-body-sm text-xs text-primary focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
          />
          <span className="text-on-surface-variant">-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant rounded px-2 py-1.5 font-body-sm text-xs text-primary focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
          />
        </div>
      </div>

      {/* Sizes */}
      <div className="flex flex-col gap-sm border-t border-outline-variant/20 pt-4">
        <h3 className="font-label-lg text-xs uppercase tracking-widest text-primary font-bold">Size</h3>
        <div className="grid grid-cols-3 gap-xs">
          {['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'].map((size) => {
            const isOutOfStock = size === '10' // Emulate template OOS
            const isSelected = selectedSize === size
            return (
              <button
                key={size}
                disabled={isOutOfStock}
                onClick={() => setSelectedSize(isSelected ? '' : size)}
                className={`py-2 text-center rounded-lg transition-all text-xs font-bold border cursor-pointer ${isOutOfStock
                  ? 'border-outline-variant/30 text-outline-variant opacity-45 cursor-not-allowed'
                  : isSelected
                    ? 'bg-secondary text-on-secondary border-secondary shadow-sm scale-102'
                    : 'border-outline-variant text-primary hover:border-secondary'
                  }`}
              >
                {size}
              </button>
            )
          })}
        </div>
      </div>

      {/* Colors */}
      <div className="flex flex-col gap-sm border-t border-outline-variant/20 pt-4">
        <h3 className="font-label-lg text-xs uppercase tracking-widest text-primary font-bold">Color</h3>
        <div className="flex flex-wrap gap-xs">
          {[
            { name: 'Black', hex: '#000000' },
            { name: 'White', hex: '#ffffff' },
            { name: 'Blue', hex: '#a2c9ff' },
            { name: 'Grey', hex: '#808080' }
          ].map((color) => {
            const isSelected = selectedColor === color.name
            return (
              <button
                key={color.name}
                onClick={() => setSelectedColor(isSelected ? '' : color.name)}
                style={{ backgroundColor: color.hex }}
                className={`w-8 h-8 rounded-full border border-outline-variant ring-2 ring-offset-2 ring-offset-background transition-all cursor-pointer ${isSelected ? 'ring-secondary border-secondary scale-105' : 'ring-transparent hover:ring-outline-variant'
                  }`}
                title={color.name}
              />
            )
          })}
        </div>
      </div>

      {/* Brands */}
      <div className="flex flex-col gap-sm border-t border-outline-variant/20 pt-4">
        <h3 className="font-label-lg text-xs uppercase tracking-widest text-primary font-bold">Brand</h3>
        <div className="flex flex-col gap-xs font-body-sm text-sm text-on-surface-variant">
          {['LUNARIS CORE', 'LUNARIS LITE', 'LUNARIS PRO', 'LUNARIS TERRA'].map((brand) => {
            const isChecked = selectedBrands.includes(brand)
            return (
              <label key={brand} className="flex items-center gap-xs cursor-pointer group select-none">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleBrandChange(brand)}
                  className="rounded border-outline-variant text-secondary focus:ring-secondary h-4 w-4 bg-surface-container-low"
                />
                <span className={`group-hover:text-secondary transition-colors ${isChecked ? 'text-secondary font-semibold' : 'text-on-surface-variant'
                  }`}>
                  {brand}
                </span>
              </label>
            )
          })}
        </div>
      </div>

      {/* Clear Action */}
      <button
        onClick={() => {
          handleClearAll()
          if (isMobile) setMobileDrawerOpen(false)
        }}
        className="mt-md bg-transparent border border-outline-variant text-primary font-label-lg text-xs uppercase tracking-widest py-3 rounded-lg hover:border-secondary hover:text-secondary transition-colors w-full cursor-pointer font-bold"
      >
        Clear All
      </button>

    </div>
  )

  return (
    <div className="flex-grow w-full bg-background text-on-background animate-fadeIn pb-24 md:pb-12">

      {/* Sticky Filter Header (Mobile Viewport Only) */}
      <div className="md:hidden px-margin-mobile pt-sm pb-xs sticky top-0 z-40 bg-background border-b border-surface-container-high shadow-sm">
        <div className="flex justify-between items-end mb-xs">
          <div>
            <h1 className="text-2xl font-bold text-primary italic">
              {selectedCategory === 'All Footwear' ? 'Sneakers' : selectedCategory}
            </h1>
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              {filteredProducts.length} items found
            </p>
          </div>
        </div>

        {/* Horizontal filter chips list */}
        <div className="flex gap-xs overflow-x-auto pb-xs pt-2 hide-scrollbar snap-x">
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="flex items-center gap-2 border border-outline-variant bg-surface-container-lowest rounded-full px-4 py-2 text-xs font-bold whitespace-nowrap snap-start text-primary cursor-pointer hover:border-secondary"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span> Filter
          </button>

          <div className="relative border border-outline-variant bg-surface-container-lowest rounded-full px-3 py-1 flex items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none text-xs font-bold text-primary outline-none cursor-pointer appearance-none pr-4"
            >
              <option value="Featured">Sort: Featured</option>
              <option value="New Arrivals">New Arrivals</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
            </select>
          </div>

          <button
            onClick={() => setViewMode(prev => prev === 'grid' ? 'list' : 'grid')}
            className="flex items-center gap-2 border border-outline-variant bg-surface-container-lowest rounded-full px-4 py-2 text-xs font-bold whitespace-nowrap snap-start text-primary cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">
              {viewMode === 'grid' ? 'view_list' : 'grid_view'}
            </span>
          </button>
        </div>

        {/* Scrolling Active Selection Chips */}
        <div className="flex gap-xs pt-1.5 pb-0.5 overflow-x-auto hide-scrollbar">
          {selectedSize && (
            <button
              onClick={() => setSelectedSize('')}
              className="flex items-center gap-1 bg-secondary text-on-secondary rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
            >
              Size: {selectedSize} <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          )}
          {selectedColor && (
            <button
              onClick={() => setSelectedColor('')}
              className="flex items-center gap-1 bg-secondary text-on-secondary rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
            >
              Color: {selectedColor} <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          )}
          {selectedBrands.map(brand => (
            <button
              key={brand}
              onClick={() => handleBrandChange(brand)}
              className="flex items-center gap-1 bg-secondary text-on-secondary rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
            >
              {brand} <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          ))}
          {(selectedSize || selectedColor || selectedBrands.length > 0) && (
            <button
              onClick={handleClearAll}
              className="bg-surface-container-high text-on-surface-variant rounded-full px-3 py-1 text-[10px] whitespace-nowrap hover:bg-surface-container-highest transition-colors font-bold"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-lg grid grid-cols-12 gap-gutter">

        {/* Desktop Left Column Filter Bar */}
        <aside className="col-span-3 hidden md:flex flex-col gap-lg pr-md border-r border-outline-variant/20">
          <div className="flex justify-between items-center pb-2">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined">tune</span> Filters
            </h2>
            {(selectedSize || selectedColor || selectedBrands.length > 0) && (
              <button
                onClick={handleClearAll}
                className="text-xs text-secondary hover:underline cursor-pointer font-semibold"
              >
                Clear All
              </button>
            )}
          </div>
          <FilterSidebarContent />
        </aside>

        {/* Right Column Product Grid */}
        <main className="col-span-12 md:col-span-9 flex flex-col gap-lg">

          {/* Desktop Only breadcrumb & sorting headers */}
          <div className="flex flex-col gap-sm hidden md:flex">
            <nav className="font-body-sm text-xs text-on-surface-variant flex items-center gap-2">
              <a className="hover:text-secondary transition-colors cursor-pointer" href="/">Home</a>
              <span>/</span>
              <a className="hover:text-secondary transition-colors cursor-pointer" href="/shop">Shop</a>
              <span>/</span>
              <span className="text-primary font-bold">{selectedCategory}</span>
            </nav>

            <div className="flex justify-between items-end border-b border-outline-variant/20 pb-4">
              <div className="flex items-baseline gap-2">
                <h1 className="text-3xl font-black text-primary uppercase tracking-wide">
                  {selectedCategory === 'All Footwear' ? 'Sneakers' : selectedCategory}
                </h1>
                <span className="font-body-md text-xs text-on-surface-variant font-bold">
                  ({filteredProducts.length} items found)
                </span>
              </div>

              <div className="flex items-center gap-md">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-black">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent border-none font-body-sm text-sm text-primary focus:ring-0 cursor-pointer pr-8 outline-none font-bold"
                  >
                    <option value="Featured">Featured</option>
                    <option value="New Arrivals">New Arrivals</option>
                    <option value="Price: Low to High">Price: Low to High</option>
                    <option value="Price: High to Low">Price: High to Low</option>
                  </select>
                </div>

                <div className="flex gap-2 text-on-surface-variant border-l border-outline-variant/20 pl-4">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`hover:text-secondary transition-colors ${viewMode === 'grid' ? 'text-secondary' : 'opacity-50'}`}
                  >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: viewMode === 'grid' ? "'FILL' 1" : "'FILL' 0" }}>grid_view</span>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`hover:text-secondary transition-colors ${viewMode === 'list' ? 'text-secondary' : 'opacity-50'}`}
                  >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: viewMode === 'list' ? "'FILL' 1" : "'FILL' 0" }}>view_list</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Active Chips Row */}
          <div className="flex flex-wrap gap-xs hidden md:flex items-center">
            {selectedSize && (
              <div className="bg-surface-container-high px-3 py-1 rounded-full flex items-center gap-xs text-xs text-primary font-bold border border-outline-variant/20">
                Size: {selectedSize}
                <button onClick={() => setSelectedSize('')} className="hover:text-error transition-colors flex items-center ml-1 cursor-pointer">
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            )}
            {selectedColor && (
              <div className="bg-surface-container-high px-3 py-1 rounded-full flex items-center gap-xs text-xs text-primary font-bold border border-outline-variant/20">
                Color: {selectedColor}
                <button onClick={() => setSelectedColor('')} className="hover:text-error transition-colors flex items-center ml-1 cursor-pointer">
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            )}
            {selectedBrands.map(brand => (
              <div key={brand} className="bg-surface-container-high px-3 py-1 rounded-full flex items-center gap-xs text-xs text-primary font-bold border border-outline-variant/20">
                Brand: {brand}
                <button onClick={() => handleBrandChange(brand)} className="hover:text-error transition-colors flex items-center ml-1 cursor-pointer">
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            ))}
          </div>

          {/* Active Product Listing Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-surface-container-low rounded-2xl border border-outline-variant/20">
              <span className="material-symbols-outlined text-4xl text-outline">search_off</span>
              <h3 className="text-lg text-primary font-bold mt-4">No matching athletic footwear</h3>
              <p className="text-xs text-on-surface-variant mt-2">Adjust your price selectors or change size metrics.</p>
              <button
                onClick={handleClearAll}
                className="mt-6 border border-secondary text-secondary font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className={`grid gap-x-sm gap-y-md ${viewMode === 'grid'
              ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
              : 'grid-cols-1'
              }`}>

              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate('/product/aeromax-elite')}
                  className={`group cursor-pointer gap-xs ${viewMode === 'list'
                    ? 'flex flex-row bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4 shadow-sm items-center animate-fadeIn'
                    : 'flex flex-col relative'
                    }`}
                >
                  {/* Image frame */}
                  <div className={`relative overflow-hidden bg-surface-container-low border border-outline-variant rounded-[16px] shadow-sm transition-all duration-300 ${viewMode === 'list'
                    ? 'w-28 sm:w-44 aspect-square shrink-0'
                    : 'aspect-[4/5] w-full'
                    }`}>
                    <img
                      src={product.imgSrc1}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-2 left-2 bg-primary text-on-primary text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {product.badge}
                      </div>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                      className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-surface/80 backdrop-blur-sm rounded-full text-on-surface-variant hover:text-error transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">favorite</span>
                    </button>
                  </div>

                  {/* Descriptions */}
                  <div className={`px-1 mt-2 flex-grow flex flex-col justify-between ${viewMode === 'list' ? 'pl-4 mt-0' : ''
                    }`}>
                    <div>
                      <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-black block">
                        {product.brand}
                      </span>
                      <h3 className="font-bold text-sm text-primary truncate mt-0.5 group-hover:text-secondary transition-all">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-black text-sm text-primary">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-outline line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-secondary mt-2">
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="text-[11px] font-bold text-primary">{product.rating}</span>
                      <span className="text-[10px] text-outline">({product.reviewsCount})</span>
                    </div>
                  </div>

                </div>
              ))}

            </div>
          )}

          {/* Load More Products CTA */}
          <div className="py-lg flex justify-center w-full mt-6">
            <button className="w-full md:w-64 px-4 py-4 bg-transparent border border-outline text-primary font-bold text-xs uppercase tracking-[0.2em] rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer">
              Load More Products
            </button>
          </div>

        </main>
      </div>

      {/* Slide-Up Mobile Filter Drawer Modal */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-[100] md:hidden flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="absolute inset-0" onClick={() => setMobileDrawerOpen(false)} />

          <div className="relative bg-surface-container-low rounded-t-3xl border-t border-outline-variant/30 w-full max-h-[85vh] overflow-y-auto px-margin-mobile py-lg flex flex-col gap-sm shadow-2xl z-10 animate-slideUp">

            <div className="flex justify-center mb-1">
              <div className="w-12 h-1.5 bg-outline-variant/60 rounded-full" />
            </div>

            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
              <h2 className="font-bold text-lg text-primary uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined">tune</span> Filter Sneakers
              </h2>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="py-4">
              <FilterSidebarContent isMobile={true} />
            </div>

            <div className="sticky bottom-0 bg-surface-container-low border-t border-outline-variant/15 pt-4 pb-6 flex gap-4">
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="flex-grow bg-secondary text-[#1B1B1D] font-black text-xs uppercase tracking-widest py-4 rounded-lg text-center cursor-pointer shadow-lg active:scale-98 transition-all"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
