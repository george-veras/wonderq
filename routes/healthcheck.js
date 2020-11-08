import express from 'express'
import asyncHandler from 'express-async-handler'
import HealthCheckController from '../controllers/healthcheck-controller.js'

const router = express.Router()

// Prefix: /healthcheck
router.get('/', asyncHandler(HealthCheckController.status))

export default router
