const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <section className="text-center py-20 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to E-Shop</h1>
        <p className="text-xl mb-8">Discover amazing products at great prices</p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100">
          Shop Now
        </button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">⚡ Fast Shipping</h2>
          <p className="text-gray-600">Get your orders delivered quickly to your doorstep</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">🔒 Secure Payment</h2>
          <p className="text-gray-600">Shop safely with our encrypted payment system</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">📞 24/7 Support</h2>
          <p className="text-gray-600">Get help anytime with our customer support team</p>
        </div>
      </section>
    </div>
  )
}

export default Home
