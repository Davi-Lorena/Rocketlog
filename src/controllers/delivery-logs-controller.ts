import { Request, Response } from 'express'

class DeliveryLogsController {
    async create(req: Request, res: Response) {
        return res.json({ message: "ok" });
    }
}

export { DeliveryLogsController }