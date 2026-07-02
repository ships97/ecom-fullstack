import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext';

interface Product {
  _id: string
  name: string
  price: number
  description: string
  image: string
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [addedId, setAddedId] = useState<string | null>(null)
  const { addToCart } = useCart()

  const handleAddToCart = (product: Product) => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    setAddedId(product._id)
    setTimeout(() => setAddedId(null), 1200)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Could not load products. Is the backend server running?')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading products...</div>
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>
      {products.length === 0 ? (
        <div className="text-center text-gray-500 py-12 bg-white rounded-lg">
          No products available yet
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                  No image
                </div>
              )}
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">₹{product.price}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    {addedId === product._id ? 'Added!' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Products