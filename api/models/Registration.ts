import mongoose from 'mongoose';

const RegistrationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    whatsapp: { type: String, required: true },
    countryOfOrigin: { type: String, required: true },
    countryOfResidence: { type: String, required: true },
    ipAddress: { type: String },
    location: {
      city: String,
      country: String,
      timezone: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    status: { type: String, enum: ['pending', 'active', 'verified'], default: 'pending' },
  },
  { timestamps: true }
);

export const Registration =
  mongoose.models.Registration || mongoose.model('Registration', RegistrationSchema);


