import { Request, Response } from "express"
import { z } from "zod"

class UsersController {
    create(req: Request, res: Response)  {
        const bodySchema = z.object({
            name: z.string().trim().min(2),
            email: z.string().email(),
            password: z.string().min(6),
        })

        const { name, email, password } = bodySchema.parse(req.body)
        

        return res.status(201).json({
            message: "OK", name, email, password
        })

    }
}

export { UsersController }