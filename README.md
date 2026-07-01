# E-Commerce Full-Stack Application

A modern full-stack e-commerce application built with Express.js, React, TypeScript, and MongoDB.

## Features

- User authentication with JWT
- Product catalog with search and filtering
- Shopping cart functionality
- Order management
- Admin dashboard
- Responsive design with Tailwind CSS
- Type-safe with TypeScript
- MongoDB for data persistence

## Tech Stack

### Backend
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- Node.js

### Frontend
- React
- TypeScript
- Tailwind CSS
- HTML5 & CSS3
- JavaScript

## Project Structure

```
ecom-fullstack/
├── server/          # Backend Express.js application
├── client/          # Frontend React application
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (v7+) - Install locally from https://www.mongodb.com/try/download/community
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/ships97/ecom-fullstack.git
cd ecom-fullstack
```

2. Install backend dependencies
```bash
cd server
npm install
```

3. Install frontend dependencies
```bash
cd ../client
npm install
```

4. Setup MongoDB

**On Windows:**
- MongoDB is installed as a service by default
- It runs on `localhost:27017`
- Open MongoDB Compass (included with MongoDB) to manage your database

**On macOS:**
```bash
brew services start mongodb-community
```

**On Linux:**
```bash
sudo systemctl start mongod
```

5. Setup environment variables
```bash
# In server/.env (copy from .env.example)
MONGODB_URI=mongodb://localhost:27017/ecom_db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRY=7d
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

6. Start the application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

The application will be available at `http://localhost:3000`

## MongoDB Management

**Access MongoDB shell:**
```bash
mongosh
```

**Common MongoDB commands:**
```bash
# Connect to database
use ecom_db

# View collections
show collections

# View documents
db.users.find()
db.products.find()
db.orders.find()
```

**Or use MongoDB Compass GUI:**
- Download from https://www.mongodb.com/products/compass
- Connect to: `mongodb://localhost:27017`

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/orders` - Create order (requires auth)
- `GET /api/orders` - Get user orders (requires auth)

## Stopping MongoDB

**On Windows:**
- MongoDB runs as a service automatically
- To stop: Open Services (services.msc) and stop MongoDB

**On macOS:**
```bash
brew services stop mongodb-community
```

**On Linux:**
```bash
sudo systemctl stop mongod
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

MIT
