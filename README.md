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
├── docker-compose.mongodb.yml
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (v7+) or Docker
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/ships97/ecom-fullstack.git
cd ecom-fullstack
```

2. Start MongoDB with Docker
```bash
docker-compose -f docker-compose.mongodb.yml up -d
```

3. Install backend dependencies
```bash
cd server
npm install
```

4. Install frontend dependencies
```bash
cd ../client
npm install
```

5. Setup environment variables
```bash
# In server/.env
MONGODB_URI=mongodb://ecom_user:ecom_password@localhost:27017/ecom_db
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

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/orders` - Create order (requires auth)
- `GET /api/orders` - Get user orders (requires auth)

## Docker Commands

```bash
# Start MongoDB
docker-compose -f docker-compose.mongodb.yml up -d

# Stop MongoDB
docker-compose -f docker-compose.mongodb.yml down

# View MongoDB logs
docker-compose -f docker-compose.mongodb.yml logs -f mongodb

# Access MongoDB shell
docker exec -it ecom_mongodb mongosh -u ecom_user -p ecom_password --authenticationDatabase admin
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

MIT
