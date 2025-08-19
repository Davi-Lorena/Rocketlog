import { Router } from "express"
import { usersRouter } from "./users-routes"
import { sessionsRoutes } from "./sessions-routes"
import { deliveriesRoutes } from "./deliveries-routes"

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/sessions", sessionsRoutes)
routes.use("/deliveries", deliveriesRoutes)


export { routes }
