import { env } from "../env"

export const authConfig = {
    jwt: {
        secret: env.JWT_SECRET,
        // Em uma situação profissional real, essa variável de ambiente acima poderia ser um hash personalizado para dar mais segurança.
        expiresIn: "1d"
    }
}