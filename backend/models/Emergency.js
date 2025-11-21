// models/Emergency.js
const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'inProgress', 'completed'],
    default: 'pending'
  },
  matricNumber: {
    type: String,
    required: true  // Make it required
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Emergency', emergencySchema);