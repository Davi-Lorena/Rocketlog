import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import { authConfig } from "@/configs/auth"
import { AppError } from "@/utils/AppError"
import exp from "constants"

interface TokenPayload {
    role: string
    sub: string
}

function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
    // Try-catch necessário aqui pois o JWT trabalha com operações síncronas, o que foge do escopo do "express-async-errors"
try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new AppError("Missing authorization header", 401)
    }

    // Bearer <token>
    const [, token] = authHeader.split(" ")

    // sub é renomeado para user_id
    const {role, sub:user_id } = verify(token, authConfig.jwt.secret) as TokenPayload
   
// Devemos fazer uma mescla com a interface "Request" do Express, tendo em vista que user não é uma de suas variáveis tipadas
    req.user = {
        id: user_id,
        role,
    }

    return next()

} catch (error) {
  throw new AppError("Invalid token", 401)
}


}

export { ensureAuthenticated }