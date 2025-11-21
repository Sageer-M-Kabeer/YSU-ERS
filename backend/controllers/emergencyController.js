const Emergency = require('../models/Emergency');

// controllers/emergencyController.js - Update createEmergency function
exports.createEmergency = async (req, res) => {
  try {
    const { title, type, location, description, status, matricNumber } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title field is required" });
    }
    if (!type) {
      return res.status(400).json({ message: "Type field is required" });
    }
    if (!location) {
      return res.status(400).json({ message: "Location field is required" });
    }
    if (!description) {
      return res.status(400).json({ message: "Description field is required" });
    }
    if (!matricNumber) {
      return res.status(400).json({ message: "Matric Number is required" });
    }

    const emergency = await Emergency.create({
      title,
      type,
      location,
      description,
      matricNumber, // Make sure this is included
      status: status || "pending"
    });

    res.status(201).json({
      success: true,
      message: "Emergency created successfully",
      data: emergency
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Emergencies
exports.getAllEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: emergencies
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Emergency by ID
exports.getEmergencyById = async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id);

    if (!emergency) {
      return res.status(404).json({ message: "Emergency not found" });
    }

    res.json({
      success: true,
      data: emergency
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Emergency Status
exports.updateEmergencyStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status
    const allowed = ['pending', 'inProgress', 'completed'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ 
        success: false,
        message: `Invalid status value. Allowed: ${allowed.join(', ')}` 
      });
    }

    const emergency = await Emergency.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency not found"
      });
    }

    res.json({
      success: true,
      message: "Status updated successfully",
      data: emergency
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};