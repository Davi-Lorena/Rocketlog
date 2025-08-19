import { DeliveriesController } from "@/controllers/deliveries-controller"

import { Router } from "express";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"

import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const deliveriesController = new DeliveriesController()

const deliveriesRoutes = Router()

deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["Sale"]))
deliveriesRoutes.post("/", deliveriesController.create)


export { deliveriesRoutes }