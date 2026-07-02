import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart()
  const navigate = useNavigate()

  const shipping = items.length === 0 ? 0 : subtotal > 999 ? 0 : 49
  const total = subtotal + shipping

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Link to="/products" className="text-blue-600 hover:underline font-medium">
                Browse products
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {items.map((item) => (
                <div key={item._id} className="flex items-center gap-4 py-4">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="h-20 w-20 object-cover rounded" />
                  ) : (
                    <div className="h-20 w-20 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                      No image
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-blue-600 font-medium">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-8 h-8 bg-gray-100 rounded hover:bg-gray-200 font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-8 h-8 bg-gray-100 rounded hover:bg-gray-200 font-bold"
                    >
                      +
                    </button>
                  </div>
                  <div className="w-24 text-right font-bold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
            disabled={items.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
