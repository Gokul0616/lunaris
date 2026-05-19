import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleQuickAdd = (e) => {
    e.stopPropagation()
    // Add default size & color for accessory quick-add
    addToCart(product, 'One Size', 'Standard', 1)
  }

  return (
    <div className="group flex flex-col gap-4 cursor-pointer">
      <div className="bg-surface-container-low rounded-xl aspect-square overflow-hidden relative shadow-[0_4px_12px_rgba(13,27,42,0.05)] border border-surface-variant">
        <img 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          src={product.imgSrc} 
        />
        
        {/* Quick Add Button */}
        <button 
          onClick={handleQuickAdd}
          className="absolute bottom-4 right-4 bg-surface rounded-full p-2.5 shadow-md hover:bg-primary hover:text-on-primary transition-all duration-300 active:scale-90 text-primary border border-outline-variant/30 flex items-center justify-center cursor-pointer"
          aria-label="Add to cart"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
        </button>
      </div>

      <div>
        <div className="font-label-sm text-label-sm uppercase tracking-widest text-secondary mb-1">
          {product.category}
        </div>
        <h4 className="font-label-lg text-label-lg text-primary group-hover:opacity-80 transition-opacity">
          {product.name}
        </h4>
        <div className="font-body-sm text-body-sm text-on-surface-variant mt-1">
          {product.price}
        </div>
      </div>
    </div>
  )
}
