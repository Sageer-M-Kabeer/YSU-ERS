const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: true, 
      default: "admin" 
    },
    password: { 
      type: String, 
      required: true 
    }
  },
  { timestamps: true }
);

// Create a single admin document
adminSchema.statics.initAdmin = async function() {
  const adminCount = await this.countDocuments();
  if (adminCount === 0) {
    await this.create({
      username: "admin",
      password: "admin" // You should hash this in production
    });
    console.log("Default admin created");
  }
};

module.exports = mongoose.model('Admin', adminSchema);