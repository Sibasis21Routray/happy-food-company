import mongoose from 'mongoose';
import Order from './server/src/models/order.model';
import dotenv from 'dotenv';

dotenv.config({ path: './server/.env' });

async function diagnose() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/happy-food');
    const orders = await Order.find({});
    console.log('Total Orders:', orders.length);
    orders.forEach(o => {
      console.log(`ID: ${o._id}, Status: ${o.status}, Amount: ${o.totalAmount}`);
    });
    const nonCancelled = orders.filter(o => o.status !== 'cancelled');
    const nonCancelledSum = nonCancelled.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    console.log('Non-Cancelled Count:', nonCancelled.length);
    console.log('Non-Cancelled Sum:', nonCancelledSum);
    const totalSum = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    console.log('Total Sum (all):', totalSum);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

diagnose();
