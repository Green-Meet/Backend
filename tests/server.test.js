const request = require("supertest");
const baseURL = "http://localhost:8001"

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(baseURL).get("/");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /actions", () => {
  const newUser = {
    user_id: 89,
    last_name: "Toto",
    first_name: "Tata",
    email: "toto@yopmail.com",
    city: "Paris",
    password: "toto89"
  }
  beforeAll(async () => {
    await request(baseURL).post("/register").send(newUser);
  })
  afterAll(async () => {
    await request(baseURL).delete(`/account/${newUser.user_id}`)
  })
  it("should return 200", async () => {
    const response = await request(baseURL).get("/admin/users");
    expect(response.statusCode).toBe(200);
  });
  it("should return newUser", async () => {
    const response = await request(baseURL).get("/admin/users");
    console.log(response.body.data)
    expect(response.body.data.length >= 1).toBe(true);
  });
});