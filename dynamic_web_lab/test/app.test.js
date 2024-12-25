const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.json());

// Test: POST /api/v1/submit
describe("POST /api/v1/submit", () => {
  it("should return a greeting and update the names array", async () => {
    const res = await request(app)
      .post("/api/v1/submit")
      .send({ name: "John" });
  });
});

// Test: POST /api/v1/bmi/calculate
describe("POST /api/v1/bmi/calculate", () => {
  it("should return the correct BMI", async () => {
    const res = await request(app)
      .post("/api/v1/bmi/calculate")
      .send({ weight: 70, height: 1.75 });
  });

  it("should return an error for invalid input", async () => {
    const res = await request(app)
      .post("/api/v1/bmi/calculate")
      .send({ weight: -70, height: 1.75 });
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

    const res = await request(app).get("/api/v1/bmi/calculations");
  });
});
