import httpStatus from 'http-status'
import queueManager from '../clients/queue-manager.js'

const MessagesController = {
  async pushMessage(req, res) {
    const { body: message } = req

    const messageId = queueManager.pushToQueue(message)

    res.status(httpStatus.OK).json({ messageId })
  },

  async pullMessage(req, res) {
    const message = queueManager.pullFromQueue()

    res.status(httpStatus.OK).json(message)
  },

  async acknowledgeMessage(req, res) {
    const {
      body: { messageId },
    } = req

    if (queueManager.acknowledgeMessage(messageId))
      res.status(httpStatus.OK).json({ info: 'message successfully acknowledged' })
    else res.status(httpStatus[500])
  },
}

export default MessagesController
