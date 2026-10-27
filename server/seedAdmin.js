const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Profile = require('./models/Profile');

dotenv.config();

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!mongoUri) {
      throw new Error('MONGO_URI or MONGODB_URI is required');
    }

    if (!email || !password) {
      throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required');
    }

    await mongoose.connect(mongoUri);

    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin already exists in local DB');
      await mongoose.connection.close();
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const adminUser = await User.create({
      email,
      passwordHash,
      role: 'admin'
    });

    const existingProfile = await Profile.findOne({ userId: adminUser._id });
    if (!existingProfile) {
      const localPart = String(email).split('@')[0].trim().slice(0, 100);
      await Profile.create({
        userId: adminUser._id,
        fullName: localPart,
        position: 'Staff'
      });
    }

    console.log(`Admin user created successfully: ${email}`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed admin:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedAdmin();
