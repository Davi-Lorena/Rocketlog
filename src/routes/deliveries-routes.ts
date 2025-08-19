import { DeliveriesController } from "@/controllers/deliveries-controller"

import { Router } from "express";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"

const deliveriesController = new DeliveriesController()

const deliveriesRoutes = Router()

deliveriesRoutes.use(ensureAuthenticated)
deliveriesRoutes.post("/", deliveriesController.create)


export { deliveriesRoutes }