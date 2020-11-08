import express from 'express'
import HealthcheckRoutes from './healthcheck.js'
import MessagesRoutes from './messages.js'

const router = express.Router()
router.use('/healthcheck', HealthcheckRoutes)
router.use('/messages', MessagesRoutes)

export default router
