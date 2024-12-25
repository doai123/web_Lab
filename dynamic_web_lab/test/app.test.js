const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.json());

// Danh sách tên đã được lưu
const names = [];

// Route POST để chào và lưu tên
app.post("/api/v1/submit", (req, res) => {
  const name = req.body.name;
  names.push(name);
  res.json({ message: `Xin chào, ${name}!`, names });
});

// Route POST để tính BMI
app.post("/api/v1/bmi/", (req, res) => {
  const { weight, height } = req.body;
  
  // Kiểm tra dữ liệu hợp lệ
  if (!weight || !height || weight <= 0 || height <= 0) {
    return res.status(400).json({ message: "Cân nặng và chiều cao phải hợp lệ!" });
  }

  // Công thức tính BMI: BMI = weight / (height * height)
  const bmi = weight / (height * height);
  
  res.json({ bmi });
});

let bmiResults = []; // Lưu trữ các kết quả BMI
app.get("/api/v1/bmi", (req, res) => {
  res.json(bmiResults);
});

describe("POST /api/v1/submit", () => {
  it("should return a greeting and update the names array", async () => {
    const res = await request(app)
      .post("/api/v1/submit")
      .send({ name: "John" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Xin chào, John!");
    expect(res.body.names).toContain("John");
  });
});

describe("POST /api/v1/bmi/calculate", () => {
  it("should return the correct BMI", async () => {
    const res = await request(app)
      .post("/api/v1/bmi/calculate")
      .send({ weight: 70, height: 1.75 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.bmi).toBeCloseTo(22.86, 2); 
  });

  it("should return an error for invalid input", async () => {
    const res = await request(app)
      .post("/api/v1/bmi/calculate")
      .send({ weight: -70, height: 1.75 });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Cân nặng và chiều cao phải hợp lệ!");
  });
});

describe("GET /api/v1/bmi/calculations", () => {
  it("should return all BMI records", async () => {
    // Tạo một số kết quả BMI
    bmiResults.push({ weight: 70, height: 1.75, bmi: 22.86 });
    bmiResults.push({ weight: 80, height: 1.8, bmi: 24.69 });

    const res = await request(app).get("/api/v1/bmi/calculations");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toHaveProperty("bmi", 22.86);
    expect(res.body[1]).toHaveProperty("bmi", 24.69);
  });
});
