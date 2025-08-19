import { Request, Response, NextFunction } from 'express'

import { AppError } from '@/utils/AppError'


// Factory function: permite que você "pré-configure" o middleware com os papéis necessários antes de usá-lo em uma rota, tornando-o reutilizável em diferentes endpoints.
function verifyUserAuthorization(role: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
       if(!req.user) {
        throw new AppError("User unauthorized", 401)
       } 

       // Nesse if eu capturo a role do usuário e verifico se ela não existe 
if(!role.includes(req.user.role)) {
            throw new AppError("User does not have permission to perform this action", 401)
        }

        return next()
    }
}

export { verifyUserAuthorization }