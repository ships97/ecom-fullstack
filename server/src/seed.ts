import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product';

dotenv.config();

const sampleProducts = [
  {
    name: 'Wireless Headphones',
    description: 'Over-ear Bluetooth headphones with noise cancellation and 30-hour battery life.',
    price: 2499,
    stock: 25,
    category: 'electronics',
    image: 'https://placehold.co/400x300/1E3A8A/FFFFFF?text=Wireless+Headphones',
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracker with heart rate monitor, GPS, and 7-day battery life.',
    price: 3999,
    stock: 15,
    category: 'electronics',
    image: 'https://placehold.co/400x300/065F46/FFFFFF?text=Smart+Watch',
  },
  {
    name: 'Cotton T-Shirt',
    description: 'Comfortable 100% cotton crew-neck t-shirt, available in multiple colors.',
    price: 499,
    stock: 100,
    category: 'clothing',
    image: 'https://placehold.co/400x300/B91C1C/FFFFFF?text=Cotton+T-Shirt',
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes with breathable mesh upper and cushioned sole.',
    price: 1999,
    stock: 40,
    category: 'footwear',
    image: 'https://placehold.co/400x300/B45309/FFFFFF?text=Running+Shoes',
  },
  {
    name: 'Backpack',
    description: 'Durable 30L backpack with laptop compartment, ideal for daily commute or travel.',
    price: 1299,
    stock: 30,
    category: 'accessories',
    image: 'https://placehold.co/400x300/4C1D95/FFFFFF?text=Backpack',
  },
  {
    name: 'Coffee Mug',
    description: 'Ceramic coffee mug, 350ml capacity, microwave and dishwasher safe.',
    price: 299,
    stock: 60,
    category: 'home',
    image: 'https://placehold.co/400x300/92400E/FFFFFF?text=Coffee+Mug',
  },
  {
    name: 'Desk Lamp',
    description: 'Adjustable LED desk lamp with 3 brightness levels and USB charging port.',
    price: 899,
    stock: 20,
    category: 'home',
    image: 'https://placehold.co/400x300/A16207/FFFFFF?text=Desk+Lamp',
  },
  {
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat, 6mm thick, includes carrying strap.',
    price: 799,
    stock: 35,
    category: 'fitness',
    image: 'https://placehold.co/400x300/166534/FFFFFF?text=Yoga+Mat',
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecom_db');
    console.log('MongoDB connected for seeding');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(sampleProducts);
    console.log(`Seeded ${sampleProducts.length} products`);

    await mongoose.disconnect();
    console.log('Done. Disconnected from MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seed();