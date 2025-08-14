import { Router } from "express"
import { usersRouter } from "./users-routes"
import { sessionsRoutes } from "./sessions-routes"

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/sessions", sessionsRoutes)

export { routes }
