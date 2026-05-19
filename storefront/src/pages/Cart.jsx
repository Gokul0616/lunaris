import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const navigate = useNavigate()
  const { cartItems, removeFromCart, adjustQuantity, totalPrice } = useCart()

  const tax = totalPrice * 0.088 // 8.8% estimated sales tax
  const total = totalPrice + tax

  return (
    <div className="flex-grow w-full bg-background text-on-background animate-fadeIn pb-24 md:pb-12">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-lg mt-4">
        
        <h1 className="text-3xl font-black text-primary mb-8 uppercase tracking-wide">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center px-4 py-20 bg-surface-container-low rounded-2xl border border-outline-variant/15 flex flex-col items-center">
            <span className="material-symbols-outlined text-4xl text-outline mb-4">shopping_bag</span>
            <h2 className="text-lg text-primary font-bold">Your shopping cart is currently empty</h2>
            <p className="text-xs text-on-surface-variant mt-2 max-w-[320px] w-full px-4">
              Explore the LUNARIS Pro Series catalog to add engineered high-performance athletic gear to your lineup.
            </p>
            <button 
              onClick={() => navigate('/shop')}
              className="mt-6 bg-secondary text-on-secondary px-8 py-3.5 rounded-lg font-bold text-xs uppercase tracking-widest hover:scale-102 transition-all active:scale-95 cursor-pointer shadow"
            >
              Browse Shop
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            
            {/* Left Column: Cart Items List */}
            <div className="md:col-span-8 space-y-4">
              {cartItems.map((item, index) => {
                const uniqueKey = `${item.product.id}-${item.size}-${item.color}-${index}`
                return (
                  <div 
                    key={uniqueKey} 
                    className="flex items-start gap-md bg-surface-container-lowest p-4 border border-outline-variant rounded-xl shadow-sm hover:shadow-md transition-all relative animate-fadeIn"
                  >
                    {/* Thumbnail Frame */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-surface-container-low border border-outline-variant/30 flex items-center justify-center">
                      <img 
                        src={item.product.imgSrc} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>

                    {/* Meta & Info details */}
                    <div className="flex-grow flex flex-col justify-between h-full min-h-[96px]">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-primary text-sm sm:text-base hover:text-secondary cursor-pointer transition-colors" onClick={() => navigate('/product/aeromax-elite')}>
                            {item.product.name}
                          </h3>
                          <button 
                            onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                            className="text-outline hover:text-error transition-colors p-1 cursor-pointer flex items-center justify-center"
                            aria-label="Remove item"
                          >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                          </button>
                        </div>
                        
                        <p className="text-xs text-on-surface-variant mt-1 font-medium">
                          Size: {item.size} | Color: {item.color}
                        </p>
                      </div>

                      {/* Adjust Quantity Block */}
                      <div className="flex justify-between items-end mt-4">
                        <div className="flex items-center border border-outline-variant/70 rounded-full bg-surface-container-low">
                          <button 
                            onClick={() => adjustQuantity(item.product.id, item.size, item.color, -1)}
                            className="px-3 py-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-xs font-black">remove</span>
                          </button>
                          <span className="px-2 text-xs font-black text-primary">{item.quantity}</span>
                          <button 
                            onClick={() => adjustQuantity(item.product.id, item.size, item.color, 1)}
                            className="px-3 py-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-xs font-black">add</span>
                          </button>
                        </div>

                        <span className="font-black text-primary text-base sm:text-lg">
                          ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                  </div>
                )
              })}
            </div>

            {/* Right Column: Checkout Subtotal Summary */}
            <div className="md:col-span-4">
              <div className="bg-surface-container-lowest p-md border border-outline-variant rounded-xl shadow-md sticky top-24">
                <h2 className="text-lg font-black mb-4 uppercase tracking-wider text-primary border-b border-outline-variant/10 pb-2">
                  Summary
                </h2>
                
                <div className="space-y-3.5 border-b border-outline-variant/20 pb-4 mb-4 font-medium text-xs sm:text-sm text-on-surface-variant">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-primary">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-secondary font-black tracking-wide uppercase text-xs">FREE STANDARD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax (8.8%)</span>
                    <span className="font-bold text-primary">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between font-black text-xl mb-6 text-primary">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-secondary text-on-secondary py-4 rounded-lg font-bold uppercase tracking-widest shadow-lg hover:scale-102 active:scale-95 transition-all text-xs cursor-pointer"
                >
                  Checkout Now
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}
