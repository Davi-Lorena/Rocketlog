import { DeliveriesController } from "@/controllers/deliveries-controller"

import { Router } from "express";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"

import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const deliveriesController = new DeliveriesController()

const deliveriesRoutes = Router()

deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale"]))
deliveriesRoutes.post("/", deliveriesController.create)
deliveriesRoutes.get("/", deliveriesController.index)

export { deliveriesRoutes }