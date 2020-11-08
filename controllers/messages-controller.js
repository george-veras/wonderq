import httpStatus from 'http-status'
import queueManagerCreator from '../clients/queue-manager.js'

const queueManager = queueManagerCreator(4000)

const MessagesController = {
  async pushMessage(req, res) {
    const { body: message } = req

    const messageId = queueManager.pushToQueue(message)
    res.status(httpStatus.OK).json({ messageId })
  },

  async pullMessage(req, res) {
    const message = queueManager.pullFromQueue()

    if (message)
      res.status(httpStatus.OK).json(message)
    else res.status(httpStatus.NOT_FOUND).json()
  },

  async acknowledgeMessage(req, res) {
    const {
      body: { messageId },
    } = req

    if (queueManager.acknowledgeMessage(messageId))
      res.status(httpStatus.OK).json({ info: 'message successfully acknowledged' })
    else res.status(httpStatus.NOT_FOUND).json()
  },
}

export default MessagesController
