const { addBMICalculation, getBMICalculations } = require('../models/bmi');

const calculateBMI = (req, res) => {
    const { height, weight } = req.body;
    const result = addBMICalculation(height, weight);
    if (result.error) {
        return res.status(400).json({ message: result.error });
    }
    res.json(result);
};
const getAllCalculations = (req, res) => {
    const calculations = getBMICalculations();
    res.json(calculations);
};

module.exports = { calculateBMI, getAllCalculations };
