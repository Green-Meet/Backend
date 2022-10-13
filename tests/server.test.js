const request = require("supertest");
const baseURL = "http://localhost:8001"

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(baseURL).get("/");
    expect(response.statusCode).toBe(200);
  });
});