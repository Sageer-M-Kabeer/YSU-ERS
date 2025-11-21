const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());   // ← MOST IMPORTANT

// Connect DB
connectDB();

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/emergencies', require('./routes/emergencyRoutes'));

app.get('/', (req, res) => {
  res.send("ER Backend is running...");
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on 0.0.0.0:5000");
});
