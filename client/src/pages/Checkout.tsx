import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const [form, setForm] = useState({
    fullName: '',
    addressLine: '',
    city: '',
    postalCode: '',
    phone: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const shipping = items.length === 0 ? 0 : subtotal > 999 ? 0 : 49
  const total = subtotal + shipping

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!token) {
      setError('Please log in before placing an order.')
      return
    }
    if (items.length === 0) {
      setError('Your cart is empty.')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: items.map((item) => ({ _id: item._id, quantity: item.quantity })),
          shippingAddress: form,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to place order')
      }

      clearCart()
      navigate('/order-confirmation', { state: { order: data } })
    } catch (err: any) {
      setError(err.message || 'Something went wrong placing your order')
    } finally {
      setSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-500 mb-4">Your cart is empty.</p>
        <Link to="/products" className="text-blue-600 hover:underline font-medium">
          Browse products
        </Link>
      </div>
    )
  }

  if (!token) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-500 mb-2">You need to be logged in to place an order.</p>
        <p className="text-gray-500">Click "Login" in the navbar, then come back to Checkout.</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="md:col-span-2 bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold mb-2">Shipping Address</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              name="addressLine"
              value={form.addressLine}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
              <input
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? 'Placing order...' : `Place Order — ₹${total.toFixed(2)}`}
          </button>
        </form>

        <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="divide-y mb-4">
            {items.map((item) => (
              <div key={item._id} className="flex justify-between py-2 text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2">
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
        </div>
      </div>
    </div>
  )
}

export default Checkout
