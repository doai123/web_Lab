const express = require("express");
const router = express.Router();
const { submitName } = require("../controllers/nameController.js");
const { calculateBMI, getAllCalculations } = require('../controllers/BmiController');
// Route cho endpoint /submit
router.post("/submit", submitName);
router.post('/bmi/calculate', calculateBMI);
router.get('/bmi/calculations', getAllCalculations);

module.exports = router;
