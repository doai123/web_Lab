const request = require("supertest");
const express = require("express");
const router = require("./path-to-your-router"); // Đảm bảo bạn sử dụng đúng đường dẫn đến router của mình

const app = express();
app.use(express.json());
app.use("/api/v1", router);  // Đảm bảo rằng bạn sử dụng đúng router

// Test: POST /api/v1/submit
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

// Test: POST /api/v1/bmi/calculate
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

// Test: GET /api/v1/bmi/calculations
describe("GET /api/v1/bmi/calculations", () => {
  it("should return all BMI records", async () => {
    // Tạo một số kết quả BMI giả lập
    const bmiResults = [
      { weight: 70, height: 1.75, bmi: 22.86 },
      { weight: 80, height: 1.8, bmi: 24.69 },
    ];

    // Kiểm tra API GET
    const res = await request(app).get("/api/v1/bmi/calculations");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toHaveProperty("bmi", 22.86);
    expect(res.body[1]).toHaveProperty("bmi", 24.69);
  });
});
