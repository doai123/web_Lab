const net = require('net');

function isPortOpen(port, host = '127.0.0.1') {
    return new Promise((resolve, reject) => {
        const socket = new net.Socket();

        socket.setTimeout(2000); // Thời gian chờ (2 giây)

        socket.on('connect', () => {
            console.log(`Cổng ${port} đang được sử dụng.`);
            socket.end();
            reject(new Error(`Cổng ${port} đang bị chiếm dụng, vui lòng chọn cổng khác!`));
        });

        socket.on('timeout', () => {
            console.log(`Cổng ${port} không mở (timeout).`);
            socket.destroy();
            resolve();
        });

        socket.on('error', (err) => {
            console.log(`Cổng ${port} không mở: ${err.message}`);
            resolve(); // Nếu có lỗi khác (cổng không mở), coi như cổng có thể sử dụng
        });

        socket.connect(port, host);
    });
}

// Kiểm tra cổng 3000 và 8080
isPortOpen(3000).catch(() => {});  // Cổng 3000
isPortOpen(8080).catch(() => {});  // Cổng 8080
