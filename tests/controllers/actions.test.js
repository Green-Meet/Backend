
const request = require("supertest");
const baseURL = "http://localhost:8001";

let cookie;

// LOGIN
describe("Should post new action and delete it", () => {
    const account = {
        email: "adrien@yopmail.com",
        password: "adrien"
    }

    const newAction = {
        title: "Test Action",
        type: "ramassage",
        description: "Test de description d'une action créée dans le seul but de tester la route post /actions",
        address: "10 rue test 06000 Nice",
        city: "Nice",
        beginDate: "2022-10-13",
        endDate: "2022-10-14",
        beginTime: "18:00",
        endTime: "18:00",
    }

    beforeAll(async () => {
        const response = await request(baseURL).post("/login").send(account);
        cookie = response.header['set-cookie']  
    })

    afterAll(async () => {
        const actions = await request(baseURL).get("/actions");
        filteredAction = actions.body.data.filter(a => a.title === "Test Action")
        console.log(filteredAction[0].action_id)
        await request(baseURL).delete(`/actions/${filteredAction[0].action_id}`).set('Cookie', cookie)
    })

    it("should post a new action", async () => {
        const response = await request(baseURL).post("/actions").set('Cookie', cookie).send(newAction);            
        expect(response.statusCode).toBe(201);
    });
});
