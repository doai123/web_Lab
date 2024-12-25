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

// Xử lý tính BMI sử dụng API
document.getElementById("bmiForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // Ngăn hành vi tải lại trang
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);

  if (!height || !weight || height <= 0 || weight <= 0) {
      document.getElementById("bmiResult").textContent =
     "Vui lòng nhập chiều cao và cân nặng hợp lệ!";
      return;
  }

  try {
      const response = await fetch("http://localhost:3000/api/v1/bmi/calculate", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ height : height, weight: weight}),
      });

      if (!response.ok) {
          throw new Error("Không thể tính BMI. Vui lòng thử lại.");
      }

      const data = await response.json();
      document.getElementById("bmiResult").textContent = `BMI: ${data.bmi} - ${data.category}`;
  } catch (error) {
      document.getElementById("bmiResult").textContent = error.message;
  }
});
function loadBmiHistoryFromServer() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '',


    fetch("http://localhost:3000/api/v1/bmi/calculations")
        .then(response => response.json())
        .then(history => {
            if (history.length > 0) {
                history.forEach(entry => {
                    const listItem = document.createElement('li');
                    const date = new Date(entry.timestamp).toLocaleString(); 
                    listItem.textContent = `BMI: ${entry.bmi} - ${entry.category} (Thời gian: ${date})`;
                    historyList.appendChild(listItem);
                });
            } else {
                const noHistoryItem = document.createElement('li');
                noHistoryItem.textContent = "Chưa có lịch sử tính BMI.";
                historyList.appendChild(noHistoryItem);
            }
        })
        .catch(error => {
            const noHistoryItem = document.createElement('li');
            noHistoryItem.textContent = "Lỗi khi tải lịch sử: " + error.message;
            historyList.appendChild(noHistoryItem);
        });
}

document.getElementById("loadHistory").addEventListener("click", function () {
  loadBmiHistoryFromServer();
});

