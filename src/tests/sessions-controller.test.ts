import  request from "supertest"

import { app } from "@/app"
import { prisma } from "@/database/prisma"

describe("SessionsController", () => {
    let user_id: string

afterAll(async () => {
    await prisma.user.delete({
        where: { id: user_id}
    })
})

   it("should authenticate and get access token", async () => {
       const user = await request(app).post("/users").send({
           name: "Auth test user",
           email: "auth_testuser@example.com",
           password: "password123"
       })

       user_id = user.body.id

       const sessionResponse = await request(app).post("/sessions").send({
           email: "auth_testuser@example.com",
           password: "password123"
       })
       
       expect(sessionResponse.status).toBe(200)
       expect(sessionResponse.body.token).toEqual(expect.any(String)) // Verifico se existe o token e se ele é do tipo string
   
    })
})
