import request from 'supertest'
import httpStatus from 'http-status'
import chai from 'chai'
import chaiUuid from 'chai-uuid'
chai.use(chaiUuid)
const { expect } = chai

import app from '../../../app.js'

describe.only('Messages routes', () => {
  context('Consuming the message broker by its endpoints', () => {
    let enqueuedMessages = {}

    describe('POST /messages', () => {
      context('Sending a message to the queue.', () => {
        let response

        before(async () => {
          const message = {
            productId: Math.ceil(Math.random() * 9000 + 1000),
            brand: 'Ask Wonder'
          }

          response = await request(app)
            .post('/messages')
            .send(message)

          enqueuedMessages[response.body.messageId] = message
        })

        it('should return an "OK" http status.', () => {
          expect(response.status).to.be.eql(httpStatus.OK)
        })

        it('should return a message id.', () => {
          expect(response.body.messageId).to.be.an.uuid('v4')
        })
      })

      context('Sending a batch of 50 messages to the queue.', () => {
        before(async () => {
          for (let i = 0; i < 50; i++) {
            const message = {
              productId: Math.random() * 9000 + 1000,
              brand: 'Ask Wonder'
            }

            const response = await request(app)
              .post('/messages')
              .send(message)

            enqueuedMessages[response.body.messageId] = message
          }
        })

        it('should have a total of 51 uuid by now.', () => {
          expect(Object.keys(enqueuedMessages).length).to.be.eql(51)
        })
      })
    })
    debugger
    describe('GET /messages', () => {
      context('Pulling a message from the queue.', () => {
        let response

        before(async () => {
          response = await request(app).get('/messages')
        })

        it('should return an "OK" http status.', () => {
          expect(response.status).to.be.eql(httpStatus.OK)
        })

        it('should return a full message.', () => {
          const { body: pulledMessage } = response
          debugger
          expect(pulledMessage.content).to.be.eql(enqueuedMessages[pulledMessage.id])
        })
      })

      context('Pulling all the remaining messages from the queue.', () => {
        let allMsgsCheck = true

        before(async () => {
          for (let i = 0; i < 50; i++) {
            const response = await request(app).get('/messages')
            if (enqueuedMessages[response.body.messageId] === 'undefined') {
              allMsgsCheck = false
              break
            }
          }
        })

        it('should return the same messages that were queued', () => {
          expect(allMsgsCheck).to.be.true
        })
      })

      context('Pulling from an empty queue.', () => {
        let response

        before(async () => {
          response = await request(app).get('/messages')
        })

        it('should return an "NOT FOUND" http status.', () => {
          expect(response.status).to.be.eql(httpStatus.NOT_FOUND)
        })
      })
    })
    debugger
    describe('PUT /messages', () => {
      debugger
      let enqueuedMessagesIds = Object.keys(enqueuedMessages)
      debugger
      let response

      context('Acknowledging a message to be purged from the queue', () => {
        let messageId = enqueuedMessagesIds.pop()

        before(async () => {
          response = await request(app)
            .put('/messages')
            .send({ messageId })
        })

        it('should return an "OK" http status.', () => {
          expect(response.status).to.be.eql(httpStatus.OK)
        })
      })

      // context('Acknowledging all the remaining pulled messages.', () => {

      // })
    })
  })
})
