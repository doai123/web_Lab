// Xử lý lưu tên
document.getElementById("nameForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Ngăn hành vi tải lại trang
    const name = document.getElementById("name").value; // Lấy giá trị từ input
    const response = await fetch("http://localhost:3000/api/v1/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    });
  
    const data = await response.json();
    document.getElementById("nameResponse").textContent = data.message;
  });
  
  // Xử lý tính BMI
  function calculateBMI() {
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
  
    if (!height || !weight || height <= 0 || weight <= 0) {
      document.getElementById("result").textContent =
        "Vui lòng nhập chiều cao và cân nặng hợp lệ!";
      return;
    }
  
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
  
    let classification = "";
    if (bmi < 18.5) {
      classification = "Thiếu cân";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      classification = "Bình thường";
    } else if (bmi >= 25 && bmi < 29.9) {
      classification = "Thừa cân";
    } else {
      classification = "Béo phì";
    }
  
    document.getElementById("result").textContent = `BMI: ${bmi} - ${classification}`;
  }
  