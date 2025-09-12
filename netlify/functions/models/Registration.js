const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  whatsapp: {
    type: String,
    required: true,
    trim: true
  },
  countryOfOrigin: {
    type: String,
    required: true,
    trim: true
  },
  countryOfResidence: {
    type: String,
    required: true,
    trim: true
  },
  group: {
    type: String,
    enum: ['local', 'diaspora'],
    default: 'diaspora'
  },
  ipAddress: {
    type: String,
    trim: true
  },
  location: {
    city: String,
    country: String,
    timezone: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'active'],
    default: 'pending'
  },
  timestamp: {
    type: String,
    default: () => new Date().toISOString()
  },
  userAgent: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Create the model
const Registration = mongoose.models.Registration || mongoose.model('Registration', registrationSchema);

module.exports = { Registration };
