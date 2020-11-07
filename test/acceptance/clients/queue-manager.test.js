import chai from 'chai'
import chaiUuid from 'chai-uuid'
chai.use(chaiUuid)
const { expect } = chai
import queueManagerCreator from '../../../clients/queue-manager.js'
const queueManager = queueManagerCreator(7000)

describe('Queue Manager', () => {
  context('Pushing and pulling messages from the queue.', () => {
    const firstMessage = 'just a dummy message'
    const secondMessage = 'second dummy message'
    let firstMessageId
    let secondMessageId

    describe('.pushToQueue(message)', () => {
      before(() => {
        firstMessageId = queueManager.pushToQueue(firstMessage)
        secondMessageId = queueManager.pushToQueue(secondMessage)
      })

      it('should enqueue messages and return its ids.', () => {
        expect(firstMessageId).to.be.a.uuid('v4')
        expect(secondMessageId).to.be.a.uuid('v4')
      })
    })

    describe('.pullFromQueue()', () => {
      let expectedFirstMessage
      let expectedSecondMessage

      before(() => {
        expectedFirstMessage = queueManager.pullFromQueue()
        expectedSecondMessage = queueManager.pullFromQueue()
      })

      it('should pull messages from the queue.', () => {
        expect(expectedFirstMessage).to.have.property('content', firstMessage)
        expect(expectedSecondMessage).to.have.property('content', secondMessage)
      })
    })
  })
})
