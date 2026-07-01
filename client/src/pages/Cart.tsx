const Cart = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 bg-white rounded-lg shadow-lg p-6">
          <p className="text-gray-500 text-center py-8">Your cart is empty</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>₹0.00</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total:</span>
              <span>₹0.00</span>
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50" disabled>
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
