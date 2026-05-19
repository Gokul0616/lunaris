import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function Checkout() {
  const navigate = useNavigate()
  const { cartItems, totalPrice, clearCart } = useCart()
  const { user } = useAuth()

  // Stepper state: 1 = Shipping, 2 = Payment
  const [activeStep, setActiveStep] = useState(1)

  // Form input states
  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [saveInfo, setSaveInfo] = useState(false)

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState('gpay') // 'gpay' or 'card'
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [isPaying, setIsPaying] = useState(false)

  // Focused label helpers
  const [focusedField, setFocusedField] = useState(null)

  // Calculate pricing
  const subtotal = cartItems.length > 0 ? totalPrice : 185.00
  const tax = subtotal * 0.088
  const finalTotal = subtotal + tax

  // Transition from Shipping to Payment
  const handleShippingSubmit = (e) => {
    e.preventDefault()
    if (!fullName || !address || !city || !zip) {
      alert('Please fill out all shipping fields.')
      return
    }
    // Proceed to Step 2
    setActiveStep(2)
  }

  // Final Payment confirmation
  const handlePaymentSubmit = async (e) => {
    if (e) e.preventDefault()
    
    if (paymentMethod === 'card') {
      if (!cardNumber || !cardExpiry || !cardCvv) {
        alert('Please fill out all card payment details.')
        return
      }
    }

    setIsPaying(true)

    try {
      // 1. Load Razorpay Script dynamically
      const loaded = await loadRazorpayScript()
      if (!loaded) {
        alert('Failed to load Razorpay Payment Gateway. Please check your internet connection.')
        setIsPaying(false)
        return
      }

      // 2. Fetch Razorpay Key ID dynamically from backend
      const keyResponse = await fetch(`${API_URL}/api/payments/key`)
      if (!keyResponse.ok) {
        const keyErr = await keyResponse.json()
        throw new Error(keyErr.detail || 'Failed to fetch payment configuration from server')
      }
      const { key } = await keyResponse.json()

      // 3. Create Order on the backend
      const orderResponse = await fetch(`${API_URL}/api/payments/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: finalTotal })
      })

      if (!orderResponse.ok) {
        const orderErr = await orderResponse.json()
        throw new Error(orderErr.detail || 'Failed to initialize payment gateway order')
      }

      const orderData = await orderResponse.json()

      // 4. Configure Razorpay checkout options
      const options = {
        key: key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'LUNARIS Premium Footwear',
        description: 'Secure Order Payment',
        image: '/logo.png',
        order_id: orderData.order_id,
        handler: async function (response) {
          try {
            // Send authorized payment data back to server for HMAC signature verification
            const verifyResponse = await fetch(`${API_URL}/api/payments/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response)
            })

            if (verifyResponse.ok) {
              // Signature matches, clear storefront cart on success and redirect
              clearCart()
              navigate('/order-confirmed')
            } else {
              const verifyErr = await verifyResponse.json()
              alert(verifyErr.detail || 'Payment signature verification failed. Your transaction is unauthorized.')
            }
          } catch (verifyErr) {
            console.error('Payment signature verification error:', verifyErr)
            alert('An error occurred while verifying the payment signature.')
          } finally {
            setIsPaying(false)
          }
        },
        prefill: {
          name: fullName,
          email: user?.email || '',
          contact: ''
        },
        theme: {
          color: '#1e1b4b' // Dark violet premium theme matching Lunaris aesthetics
        },
        modal: {
          ondismiss: function () {
            setIsPaying(false)
          }
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      console.error('Payment gateway error:', err)
      alert(err.message || 'An error occurred during the payment setup process.')
      setIsPaying(false)
    }
  }

  return (
    <div className="flex-grow w-full bg-surface text-on-surface animate-fadeIn pb-24 md:pb-12">
      {/* Top Header */}
      <header className="bg-surface flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-20 border-b border-outline-variant select-none">
        <button 
          onClick={() => {
            if (activeStep === 2) {
              setActiveStep(1)
            } else {
              navigate('/cart')
            }
          }}
          className="p-2 -ml-2 text-primary hover:text-secondary transition-colors cursor-pointer flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[20px] flex items-center justify-center">arrow_back</span>
          <span className="text-[10px] uppercase font-bold tracking-widest hidden sm:inline">Back</span>
        </button>
        <span 
          onClick={() => navigate('/')}
          className="text-headline-sm font-headline-sm font-black tracking-[0.25em] text-primary cursor-pointer hover:opacity-85 select-none uppercase"
        >
          LUNARIS
        </span>
        <div className="w-10"></div> {/* Spacer for symmetry */}
      </header>

      <main className="max-w-[1000px] mx-auto px-margin-mobile pt-sm pb-xl flex flex-col md:grid md:grid-cols-12 md:gap-gutter">
        
        {/* Left Column: Progress Stepper & Dynamic Step Render */}
        <div className="md:col-span-7 flex flex-col">
          
          {/* Progress Stepper */}
          <section className="py-sm flex items-center justify-between select-none">
            {/* Step 1: Shipping */}
            <div className="flex flex-col items-center gap-xs flex-1 cursor-pointer" onClick={() => activeStep === 2 && setActiveStep(1)}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                activeStep > 1 ? 'bg-emerald-500 text-white' : 'bg-primary text-on-primary'
              } shadow-sm`}>
                {activeStep > 1 ? (
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                ) : (
                  <span className="text-xs font-bold">1</span>
                )}
              </div>
              <span className={`text-[10px] uppercase tracking-wider font-black ${
                activeStep === 1 ? 'text-primary' : 'text-emerald-500'
              }`}>Shipping</span>
            </div>
            
            <div className={`stepper-line mb-5 mx-2 flex-grow h-[2px] transition-colors ${
              activeStep > 1 ? 'bg-emerald-500' : 'bg-outline-variant'
            }`}></div>
            
            {/* Step 2: Payment */}
            <div className="flex flex-col items-center gap-xs flex-1">
              <div className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center text-xs font-bold ${
                activeStep === 2 ? 'border-primary bg-primary text-on-primary scale-110 shadow-sm' : 'border-outline text-on-surface-variant opacity-40'
              }`}>
                2
              </div>
              <span className={`text-[10px] uppercase tracking-wider font-black ${
                activeStep === 2 ? 'text-primary' : 'text-on-surface-variant opacity-40'
              }`}>Payment</span>
            </div>
            
            <div className="stepper-line mb-5 mx-2 flex-grow h-[2px] bg-outline-variant opacity-40"></div>
            
            {/* Step 3: Confirmation */}
            <div className="flex flex-col items-center gap-xs flex-1 opacity-40">
              <div className="w-8 h-8 rounded-full border-2 border-outline flex items-center justify-center font-bold text-xs">
                3
              </div>
              <span className="text-[10px] uppercase tracking-wider font-black text-on-surface-variant">Confirmed</span>
            </div>
          </section>

          {/* STEP 1: SHIPPING FORM */}
          {activeStep === 1 && (
            <div className="animate-fadeIn">
              <h1 className="text-headline-lg-mobile font-headline-lg-mobile mt-lg mb-md text-primary font-black uppercase tracking-tight select-none">
                Shipping Address
              </h1>

              <form onSubmit={handleShippingSubmit} className="space-y-md">
                {/* Full Name */}
                <div className="flex flex-col gap-xs">
                  <label 
                    className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                      focusedField === 'fullName' ? 'text-secondary' : 'text-on-surface-variant'
                    }`}
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <input 
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl h-14 px-md text-sm text-white focus:border-secondary transition-all focus:outline-none" 
                    id="fullName" 
                    placeholder="Enter your full name" 
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                {/* Street Address */}
                <div className="flex flex-col gap-xs">
                  <label 
                    className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                      focusedField === 'address' ? 'text-secondary' : 'text-on-surface-variant'
                    }`}
                    htmlFor="address"
                  >
                    Street Address
                  </label>
                  <input 
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl h-14 px-md text-sm text-white focus:border-secondary transition-all focus:outline-none" 
                    id="address" 
                    placeholder="123 Performance Way" 
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onFocus={() => setFocusedField('address')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                {/* Grid for City and Zip */}
                <div className="grid grid-cols-2 gap-md">
                  <div className="flex flex-col gap-xs">
                    <label 
                      className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                        focusedField === 'city' ? 'text-secondary' : 'text-on-surface-variant'
                      }`}
                      htmlFor="city"
                    >
                      City
                    </label>
                    <input 
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl h-14 px-md text-sm text-white focus:border-secondary transition-all focus:outline-none" 
                      id="city" 
                      placeholder="Portland" 
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      onFocus={() => setFocusedField('city')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  <div className="flex flex-col gap-xs">
                    <label 
                      className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                        focusedField === 'zip' ? 'text-secondary' : 'text-on-surface-variant'
                      }`}
                      htmlFor="zip"
                    >
                      Zip Code
                    </label>
                    <input 
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl h-14 px-md text-sm text-white focus:border-secondary transition-all focus:outline-none" 
                      id="zip" 
                      placeholder="97201" 
                      type="text"
                      required
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      onFocus={() => setFocusedField('zip')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>

                {/* Checkbox Save */}
                <div className="flex items-center gap-sm pt-xs select-none">
                  <input 
                    className="w-5 h-5 rounded border-outline text-primary focus:ring-primary cursor-pointer" 
                    id="saveInfo" 
                    type="checkbox"
                    checked={saveInfo}
                    onChange={(e) => setSaveInfo(e.target.checked)}
                  />
                  <label className="text-xs font-bold text-on-surface-variant cursor-pointer" htmlFor="saveInfo">
                    Save this address for future purchases
                  </label>
                </div>
                
                {/* Submit button */}
                <button 
                  type="submit"
                  className="w-full bg-primary text-on-primary h-14 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-xs active:scale-98 transition-transform shadow-lg cursor-pointer hover:opacity-90 mt-8"
                >
                  Continue to Payment
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: PAYMENT METHOD */}
          {activeStep === 2 && (
            <div className="animate-fadeIn">
              <h1 className="text-headline-lg-mobile font-headline-lg-mobile mt-lg mb-md text-primary font-black uppercase tracking-tight select-none">
                Payment Method
              </h1>

              <div className="space-y-md">
                
                {/* Google Pay Card Option */}
                <div 
                  onClick={() => setPaymentMethod('gpay')}
                  className={`p-md rounded-xl border transition-all cursor-pointer select-none flex flex-col gap-sm ${
                    paymentMethod === 'gpay' ? 'border-primary bg-surface-container-high' : 'border-outline-variant bg-surface-container-low hover:bg-surface-container-high/60'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-sm">
                      <input 
                        type="radio" 
                        name="payment"
                        checked={paymentMethod === 'gpay'}
                        onChange={() => setPaymentMethod('gpay')}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <span className="text-xs font-black uppercase tracking-wider text-primary">Google Pay</span>
                    </div>
                    {/* Mock Google Pay Logo */}
                    <div className="bg-white px-2.5 py-1 rounded text-black font-sans font-black tracking-tighter text-[9px] select-none flex items-center gap-0.5">
                      <span className="text-blue-600">G</span>
                      <span className="text-red-500">o</span>
                      <span className="text-yellow-500">o</span>
                      <span className="text-blue-600">g</span>
                      <span className="text-green-500">l</span>
                      <span className="text-red-500">e</span>
                      <span className="text-black ml-0.5 font-bold">Pay</span>
                    </div>
                  </div>
                  
                  {paymentMethod === 'gpay' && (
                    <div className="mt-xs pt-xs border-t border-outline-variant/35 animate-fadeIn">
                      <p className="text-[10px] text-on-surface-variant font-medium mb-3 leading-relaxed">
                        Pay quickly and securely using your saved Google cards and shipping profiles.
                      </p>
                      
                      {/* Interactive GPay Button */}
                      <button 
                        type="button"
                        disabled={isPaying}
                        onClick={handlePaymentSubmit}
                        className="w-full bg-background hover:bg-surface-container-low text-primary h-14 rounded-xl flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md cursor-pointer border border-outline disabled:opacity-40 disabled:pointer-events-none"
                      >
                        {isPaying ? (
                          <div className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span className="text-[10px] font-black uppercase tracking-widest">Authorizing GPay...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 select-none">
                            <span className="text-sm font-semibold tracking-wide font-sans">Pay with </span>
                            <span className="bg-white px-2 py-0.5 rounded text-black font-sans font-black tracking-tighter text-[9px] flex items-center gap-0.5 ml-1">
                              <span className="text-blue-600">G</span>
                              <span className="text-red-500">o</span>
                              <span className="text-yellow-500">o</span>
                              <span className="text-blue-600">g</span>
                              <span className="text-green-500">l</span>
                              <span className="text-red-500">e</span>
                              <span className="text-black ml-0.5 font-bold">Pay</span>
                            </span>
                          </div>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Credit/Debit Card Option */}
                <div 
                  onClick={() => setPaymentMethod('card')}
                  className={`p-md rounded-xl border transition-all cursor-pointer select-none flex flex-col gap-sm ${
                    paymentMethod === 'card' ? 'border-primary bg-surface-container-high' : 'border-outline-variant bg-surface-container-low hover:bg-surface-container-high/60'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-sm">
                      <input 
                        type="radio" 
                        name="payment"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <span className="text-xs font-black uppercase tracking-wider text-primary">Credit or Debit Card</span>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]">credit_card</span>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="mt-xs pt-xs border-t border-outline-variant/35 space-y-md animate-fadeIn" onClick={(e) => e.stopPropagation()}>
                      {/* Card Number */}
                      <div className="flex flex-col gap-xs">
                        <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant">Card Number</label>
                        <input 
                          type="text" 
                          placeholder="•••• •••• •••• ••••"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl h-12 px-md text-xs text-white focus:border-secondary transition-all focus:outline-none"
                        />
                      </div>

                      {/* Expiry & CVV */}
                      <div className="grid grid-cols-2 gap-md">
                        <div className="flex flex-col gap-xs">
                          <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant">Expiry Date</label>
                          <input 
                            type="text" 
                            placeholder="MM/YY"
                            required
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl h-12 px-md text-xs text-white focus:border-secondary transition-all focus:outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-xs">
                          <label className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant">CVV</label>
                          <input 
                            type="password" 
                            placeholder="•••"
                            required
                            maxLength="3"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl h-12 px-md text-xs text-white focus:border-secondary transition-all focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Standard payment submission button */}
                      <button 
                        type="button"
                        disabled={isPaying}
                        onClick={handlePaymentSubmit}
                        className="w-full bg-primary text-on-primary h-14 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-xs active:scale-98 transition-transform shadow-lg cursor-pointer hover:opacity-90 mt-4 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {isPaying ? (
                          <div className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-on-primary" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>Processing...</span>
                          </div>
                        ) : (
                          <>
                            Pay ${(finalTotal).toFixed(2)} Secured
                            <span className="material-symbols-outlined text-[18px]">lock</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Right Column: Order Summary Card */}
        <div className="md:col-span-5 md:mt-24">
          <section className="mt-xl md:mt-0 p-md bg-surface-container-low border border-outline-variant rounded-xl shadow-sm">
            <h2 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-md select-none">
              Order Summary
            </h2>
            
            {/* Items list */}
            <div className="space-y-4">
              {cartItems.length === 0 ? (
                // Fallback to Aero Glide Pro if navigated directly
                <div className="flex gap-md items-center">
                  <div className="w-16 h-16 bg-surface-variant rounded-xl overflow-hidden shrink-0 border border-outline-variant/30">
                    <img 
                      alt="Aero Glide Pro" 
                      className="w-full h-full object-cover" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA333f1OnkQzze_MUiOMb6NK4WGG3JLJkHZgd0WjWEAcTagYzBzT5czxqcjzpZHKVMgfA8D5UfKLMIDZtYewuV_xKGZwOihIwRVVyRyQwoIbD13YBIHyI1B-DbFapq5NqJRfyBtC_CsrPSa75QpYmgVN5xs5NwEIOLIOlaAUl5a_yyUosY1hTiPrZpgCmPLECHMrIQYlZSEkrMyPvhyzjYdasRfSHMGFxXfuef6itd4Ccp5LbI85zycu-1XjRbVo4C3ibmKRrAtxhZo"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xs font-black text-primary uppercase">Aero Glide Pro</h3>
                    <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">Midnight Blue / Size 10.5</p>
                    <p className="text-xs font-black mt-1">$185.00</p>
                  </div>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-md items-center">
                    <div className="w-16 h-16 bg-surface-variant rounded-xl overflow-hidden shrink-0 border border-outline-variant/30">
                      <img 
                        alt={item.product.name} 
                        className="w-full h-full object-cover" 
                        src={item.product.imgSrc}
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xs font-black text-primary uppercase truncate max-w-[150px]">
                        {item.product.name}
                      </h3>
                      <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">
                        Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                      </p>
                      <p className="text-xs font-black mt-1">
                        ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Totals Section */}
            <div className="mt-md pt-md border-t border-outline-variant space-y-xs font-medium text-xs">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span className="font-bold text-primary">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Shipping</span>
                <span className="text-secondary font-black tracking-wide uppercase text-[10px]">Free</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Estimated Tax (8.8%)</span>
                <span className="font-bold text-primary">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-primary pt-xs border-t border-outline-variant/10">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </section>
        </div>

      </main>
    </div>
  )
}
