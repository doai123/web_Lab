document
    .getElementById("nameForm")
    .addEventListener("submit", async function (e) {
        // Ngăn hành vi mặc định của form (ngăn tải lại trang)
        e.preventDefault();

        // Lấy giá trị nhập từ trường input có id là 'name'
        const name = document.getElementById("name").value;

        // Gửi yêu cầu POST đến server tại route '/submit' với dữ liệu JSON
        const response = await fetch("http://localhost:3000/api/v1/submit", {
            method: "POST", // Sử dụng phương thức POST để gửi dữ liệu
            headers: {
                "Content-Type": "application/json", // Định nghĩa kiểu nội dung gửi là JSON
            },
            body: JSON.stringify({ name: name }), // Chuyển đổi đối tượng { name: name } thành chuỗi JSON
        });

        // Chờ phản hồi từ server và chuyển đổi phản hồi từ JSON thành đối tượng JavaScript
        const data = await response.json();

        // Hiển thị thông điệp trả về từ server trong phần tử có id là 'response'
        document.getElementById("nameResponse").textContent = data.message;
    });
