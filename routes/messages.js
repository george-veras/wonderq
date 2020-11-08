import express from 'express'
import asyncHandler from 'express-async-handler'
import MessagesController from '../controllers/messages-controller.js'

const router = express.Router()

// Prefix: /messages
router.get('/', asyncHandler(MessagesController.pullMessage))
router.post('/', asyncHandler(MessagesController.pushMessage))
router.put('/', asyncHandler(MessagesController.acknowledgeMessage))

export default router
