import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface OrderItem {
  product: string
  name: string
  price: number
  quantity: number
}

interface Order {
  _id: string
  items: OrderItem[]
  shippingAddress: {
    fullName: string
    addressLine: string
    city: string
    postalCode: string
    phone: string
  }
  subtotal: number
  shipping: number
  total: number
  status: string
  createdAt: string
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!response.ok) {
          throw new Error('Failed to fetch orders')
        }
        const data = await response.json()
        setOrders(data)
      } catch (err) {
        console.error('Error fetching orders:', err)
        setError('Could not load your orders. Is the backend server running?')
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [token])

  if (!token) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">My Orders</h1>
        <p className="text-gray-500">Please log in to view your orders.</p>
      </div>
    )
  }

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading your orders...</div>
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center bg-white rounded-lg shadow p-8">
          <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
          <Link to="/products" className="text-blue-600 hover:underline font-medium">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                <div>
                  <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {order.status}
                </span>
              </div>

              <div className="divide-y border-t border-b mb-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-2 text-sm">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Shipping to: {order.shippingAddress.fullName}, {order.shippingAddress.city}
                </p>
                <p className="font-bold text-lg">₹{order.total.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
