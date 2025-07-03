import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Admin from './models/Admin.js';

// For quick demo, you can hardcode username/password here or use process.argv
const username = 'admin'; // Change as needed
const password = 'admin123'; // Change as needed

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const existing = await Admin.findOne({ username });
    if (existing) {
      console.log('Admin user already exists.');
      process.exit(0);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();
    console.log('Admin user created successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
}

createAdmin(); 