const express = require('express');
const router = express.Router();
const {
  createEmergency,
  getAllEmergencies,
  getEmergencyById,
  updateEmergencyStatus
} = require('../controllers/emergencyController');

router.post('/create-emergency', createEmergency);
router.get('/', getAllEmergencies);
router.get('/:id', getEmergencyById);
router.patch('/:id/status', updateEmergencyStatus);

module.exports = router;