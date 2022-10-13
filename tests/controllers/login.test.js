const request = require("supertest");
const baseURL = "http://localhost:8001";

// LOGIN
describe("Login with main account", () => {
  const account = {
    email: "adrien@yopmail.com",
    password: "adrien"
  }

  it("should send a login cookie", async () => {
    const response = await request(baseURL).post("/login").send(account);
    expect(response.header['set-cookie'].length).toBe(1);
  });
});