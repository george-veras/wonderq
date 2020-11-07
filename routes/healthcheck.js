import express from 'express'
import HealthCheckController from '../controllers/healthcheck-controller.js'

const router = express.Router()

// Prefix: /healthcheck
router.get('/', HealthCheckController.status)

export default router
