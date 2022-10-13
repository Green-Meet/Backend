const request = require("supertest");
const baseURL = "http://localhost:8001";

// LOGOUT
describe("Logout main account", () => {
  it("should clear cookie", async () => {
    const response = await request(baseURL).get("/logout");
    expect(response.header['set-cookie'][0]).toContain('jwt=;');
  });
});