import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('lunaris_cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('lunaris_cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, size, color, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.color === color
      )

      if (existingIndex > -1) {
        const newItems = [...prevItems]
        newItems[existingIndex].quantity += quantity
        return newItems
      } else {
        return [...prevItems, { product, size, color, quantity }]
      }
    })
  }

  const removeFromCart = (productId, size, color) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.product.id === productId && item.size === size && item.color === color)
      )
    )
  }

  const adjustQuantity = (productId, size, color, amount) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.product.id === productId && item.size === size && item.color === color) {
            const nextQty = item.quantity + amount
            return { ...item, quantity: nextQty }
          }
          return item
        })
        .filter((item) => item.quantity > 0)
    })
  }

  const clearCart = () => {
    setCartItems([])
  }

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  
  const totalPrice = cartItems.reduce(
    (acc, item) => {
      const priceStr = String(item?.product?.price || '0')
      const priceVal = parseFloat(priceStr.replace('$', '')) || 0
      return acc + priceVal * (item.quantity || 0)
    },
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        adjustQuantity,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
