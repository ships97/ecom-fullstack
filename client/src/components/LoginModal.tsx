import { useState } from 'react'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (token: string, user: any) => void
}

const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
  const [isLoginForm, setIsLoginForm] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const endpoint = isLoginForm ? '/api/auth/login' : '/api/auth/register'
      const payload = isLoginForm
        ? { email: formData.email, password: formData.password }
        : formData

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Authentication failed')
        return
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      onLogin(data.token, data.user)
      onClose()
    } catch (err) {
      setError('Network error. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {isLoginForm ? 'Login' : 'Register'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginForm && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                required={!isLoginForm}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 font-medium"
          >
            {loading ? 'Processing...' : isLoginForm ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center border-t pt-4">
          <p className="text-gray-600 text-sm mb-3">
            {isLoginForm ? "Don't have an account?" : 'Already have an account?'}
          </p>
          <button
            onClick={() => {
              setIsLoginForm(!isLoginForm)
              setFormData({ name: '', email: '', password: '' })
              setError('')
            }}
            className="text-blue-600 hover:underline font-medium text-sm"
          >
            {isLoginForm ? 'Create Account' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
