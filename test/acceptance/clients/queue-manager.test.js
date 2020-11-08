import chai from 'chai'
import chaiUuid from 'chai-uuid'
import queueManagerCreator from '../../../clients/queue-manager.js'

chai.use(chaiUuid)
const { expect } = chai
const queueManager = queueManagerCreator(3000)

describe('Queue Manager', () => {
  context('Pushing and pulling messages from the queue.', () => {
    const firstMessage = 'just a dummy message'
    const secondMessage = 'second dummy message'
    let firstMessageId
    let secondMessageId

    describe('.pushToQueue(message)', () => {
      before(async () => {
        firstMessageId = await queueManager.pushToQueue(firstMessage)
        secondMessageId = await queueManager.pushToQueue(secondMessage)
      })

      it('should enqueue messages and return its ids.', () => {
        expect(firstMessageId).to.be.a.uuid('v4')
        expect(secondMessageId).to.be.a.uuid('v4')
      })
    })

    describe('.pullFromQueue()', () => {
      let expectedFirstMessage
      let expectedSecondMessage

      before(async () => {
        expectedFirstMessage = await queueManager.pullFromQueue()
        expectedSecondMessage = await queueManager.pullFromQueue()
      })

      it('should pull messages from the queue.', () => {
        expect(expectedFirstMessage).to.have.property('content', firstMessage)
        expect(expectedSecondMessage).to.have.property('content', secondMessage)
      })

      it('should remove the messages from the "ready" queue.', async () => {
        expect(await queueManager.getQueueLength()).to.be.eql(0)
      })

      it('should put the messages in "awaiting for acknowledgement" state.', async () => {
        expect(await queueManager.getUnackCount()).to.be.eql(2)
      })
    })

    context('Acknowledging a message before it is timed out', () => {
      before(async () => {
        await queueManager.acknowledgeMessage(firstMessageId)
      })

      it('should delete the message', async () => {
        expect(await queueManager.getUnackCount()).to.be.eql(1)
      })
    })

    context('A message has timed out', () => {
      before(async () => {
        await new Promise((resolve) => setTimeout(resolve, 4000))
      })

      it('should remove the message from the "awaiting for acknowledgement" state.', async () => {
        expect(await queueManager.getUnackCount()).to.be.eql(0)
      })

      it('should return the message to the queue.', async () => {
        expect(await queueManager.getQueueLength()).to.be.eql(1)
      })
    })

    context('Trying to acknowledge a timed out message.', () => {
      let result

      before(async () => {
        result = await queueManager.acknowledgeMessage(secondMessageId)
      })

      it('should refuse the acknowledgement.', () => {
        expect(result).to.be.false
      })
    })
  })
})
