import express from 'express'
import MessagesController from '../controllers/messages-controller.js'

const router = express.Router()

// Prefix: /message
router.post('/', MessagesController.pushMessage)
router.get('/', MessagesController.pullMessage)

export default router
