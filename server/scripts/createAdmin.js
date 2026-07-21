require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// ─── Credentials — change these before running ───────────────────────────────
const USERNAME = 'admin';
const PASSWORD = 'admin123';
// ─────────────────────────────────────────────────────────────────────────────

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/real-estate-cms');
    console.log('Connected to MongoDB...');

    const existing = await Admin.findOne({ username: USERNAME.toLowerCase() });
    if (existing) {
      console.log(`Admin "${USERNAME}" already exists. Skipping.`);
      process.exit(0);
    }

    const hashed = await bcrypt.hash(PASSWORD, 10);
    await Admin.create({ username: USERNAME.toLowerCase(), password: hashed });

    console.log(`\n✅ Admin account created successfully!`);
    console.log(`   Username : ${USERNAME}`);
    console.log(`   Password : ${PASSWORD}`);
    console.log(`\n   Login at : http://localhost:5173/admin\n`);
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err.message);
    process.exit(1);
  }
};

seed();
