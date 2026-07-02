import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LoginModal from './LoginModal'

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    // Load user data from localStorage on mount
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = (newToken: string, userData: any) => {
    setToken(newToken)
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            E-Shop
          </Link>
          <div className="space-x-6 flex items-center">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600">
              Products
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-blue-600">
              Cart
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/orders" className="text-gray-700 hover:text-blue-600">
                  My Orders
                </Link>
                <span className="text-gray-700">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />
    </>
  )
}

export default Navbar
