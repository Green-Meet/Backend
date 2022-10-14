const request = require("supertest");
const baseURL = "http://localhost:8001"

// CREATE AND DELETE NEW USER
describe("Create an new test user", () => {
    const newUser = {
        lastName: "Toto",
        firstName: "Tata",
        email: "toto@yopmail.com",
        city: "Paris",
        password: "toto89"
    }

    beforeAll(async () => {
        await request(baseURL).post("/register").send(newUser); 
    })

    afterAll(async () => {
        const response = await request(baseURL).get("/admin/users");
        const user = response.body.data.filter(user => user.first_name === "Toto");
        await request(baseURL).delete(`/account/${user[0].user_id}`)
    })

    it("should have new user registered", async () => {
        const response = await request(baseURL).get("/admin/users");
        expect(response.body.data.length === 2).toBe(true);
        reversedData = response.body.data.reverse()
        expect(reversedData[0].first_name === "Toto").toBe(true);
    });
});

//FIND A USER
describe("Find main user by his ID", () => {
    beforeAll(async () => {
        const account = {
            email: "adrien@yopmail.com",
            password: "adrien"
        }
        await request(baseURL).post("/login").send(account);
    });

    it("should response with user data", async() => {
        const response = await request(baseURL).get("/account/6");
        expect(response.body.data.last_name).toBe("Adrien");
    });
})