import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import { hash } from "bcrypt"
import { z } from "zod"

class UsersController {
    async create(req: Request, res: Response)  {
        const bodySchema = z.object({
            name: z.string().trim().min(2),
            email: z.string().email(),
            password: z.string().min(6),
        })
        
        const { name, email, password } = bodySchema.parse(req.body)

        const userWithSameEmail = await prisma.user.findFirst({
            where: {
                 email 
            }
        })

        if(userWithSameEmail) {
            throw new AppError("User with this email already exists")
        }
        
const hashedPassword = await hash(password, 8)

const user = await prisma.user.create({ 
    data: {
        name,
        email,
        password: hashedPassword
        // Podemos notar que nessas linhas de código acima utilizamos a mesma lógica do "where: { email }", tendo em vista que, diferentemente da senha, para name e email temos implicitamente um "name: name"
    }
})

// Na linha abaixo eu remove a senha do usuário e utilizo o spread para capturar todos os outros parâmetros para exibição
const {password: _, ...userWithoutPassword} = user

        return res.status(201).json(userWithoutPassword)

    }
}

export { UsersController }