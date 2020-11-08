import httpStatus from 'http-status'
import queueManagerCreator from '../clients/queue-manager.js'
import { acknowledgementTimeout } from '../config/index.js'

const queueManager = queueManagerCreator(acknowledgementTimeout)

const MessagesController = {
  async pushMessage(req, res) {
    const { body: message } = req

    const messageId = await queueManager.pushToQueue(message)
    res.status(httpStatus.OK).json({ messageId })
  },

  async pullMessage(req, res) {
    const message = await queueManager.pullFromQueue()

    if (message) res.status(httpStatus.OK).json(message)
    else res.status(httpStatus.NOT_FOUND).json()
  },

  async acknowledgeMessage(req, res) {
    const {
      body: { messageId },
    } = req

    if (await queueManager.acknowledgeMessage(messageId))
      res.status(httpStatus.OK).json({ info: 'message successfully acknowledged' })
    else res.status(httpStatus.NOT_FOUND).json()
  },
}

export default MessagesController
