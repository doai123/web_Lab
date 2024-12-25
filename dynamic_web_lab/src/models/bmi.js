const BMICalculations = [];

const addBMICalculation = (height, weight) => {
    if (!height || height <= 0 || !weight || weight <= 0) {
        return { error: "Chiều cao và cân nặng phải là giá trị hợp lệ và dương." };
    }

    const heightInMeters = height / 100;

    const bmi = weight / (heightInMeters * heightInMeters);

    const roundedBmi = bmi.toFixed(2);
    const category = categorizeBMI(roundedBmi);

    const calculation = {
        height,
        weight,
        bmi: roundedBmi,
        category,
        timestamp: new Date().toISOString(),
    };

    BMICalculations.push(calculation);
    return calculation; 
};

const getBMICalculations = () => {
    return BMICalculations;
};

const categorizeBMI = (bmi) => {
    if (bmi < 18.5) {
        return "Gầy";
    } else if (bmi < 24.9) {
        return "Bình thường";
    } else if (bmi < 29.9) {
        return "Thừa cân";
    } else {
        return "Béo phì";
    }
};

module.exports = { addBMICalculation, getBMICalculations };
