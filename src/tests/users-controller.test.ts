import request from "supertest"
import { app } from "@/app"
import { prisma } from "@/database/prisma"

describe("UsersController", () => {
    let user_id: string

afterAll(async () => {
    await prisma.user.delete({
        where: { id: user_id}
    })
})

    it("should create a new user Succesfully", async () => {
    const response = await request(app).post("/users").send({
        name: "test user",
        email: "testuser@example.com",
        password: "password123"
    })
    
expect(response.status).toBe(201)
expect(response.body).toHaveProperty("id")
expect(response.body.name).toBe("test user")

user_id = response.body.id

 })
});
