import { useLocation, Link, Navigate } from 'react-router-dom'

const OrderConfirmation = () => {
  const location = useLocation()
  const order = (location.state as any)?.order

  if (!order) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <h1 className="text-3xl font-bold mb-2">Order Placed!</h1>
        <p className="text-gray-500 mb-6">
          Thanks {order.shippingAddress?.fullName}, your order has been placed successfully.
        </p>

        <div className="text-left border-t pt-4 mb-6">
          <p className="text-sm text-gray-500 mb-2">Order ID: {order._id}</p>
          <div className="divide-y">
            {order.items.map((item: any) => (
              <div key={item.product} className="flex justify-between py-2 text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold pt-2 border-t mt-2">
            <span>Total:</span>
            <span>₹{order.total.toFixed(2)}</span>
          </div>
        </div>

        <Link
          to="/products"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default OrderConfirmation
