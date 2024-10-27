// models/Admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  timestamps: true
});

// Hash password before saving
adminSchema.pre('save', async function(next) {
  const admin = this;
  
  if (admin.isModified('password')) {
    admin.password = await bcrypt.hash(admin.password, 8);
  }
  
  next();
});

// Generate auth token
adminSchema.methods.generateAuthToken = async function() {
  const admin = this;
  const token = jwt.sign({ _id: admin._id.toString() }, process.env.JWT_SECRET || "rahasiaABDES", {
    expiresIn: '24h'
  });
  
  admin.tokens = admin.tokens.concat({ token });
  await admin.save();
  
  return token;
};

// Login validation
adminSchema.statics.findByCredentials = async (email, password) => {
  const admin = await Admin.findOne({ email });
  
  if (!admin) {
    throw new Error('Invalid login credentials');
  }
  
  const isMatch = await bcrypt.compare(password, admin.password);
  
  if (!isMatch) {
    throw new Error('Invalid login credentials');
  }
  
  return admin;
};

// Remove sensitive data when sending admin object
adminSchema.methods.toJSON = function() {
  const admin = this;
  const adminObject = admin.toObject();
  
  delete adminObject.password;
  delete adminObject.tokens;
  
  return adminObject;
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;