import request from 'supertest'
import httpStatus from 'http-status'
import chai from 'chai'
import chaiUuid from 'chai-uuid'

import app from '../../../app.js'

chai.use(chaiUuid)
const { expect } = chai

describe('Messages routes', () => {
  context('Consuming the message broker by its endpoints', () => {
    describe('POST /messages', () => {
      context('Sending a message to the queue.', () => {
        let response

        before(async () => {
          const message = {
            productId: Math.ceil(Math.random() * 9000 + 1000),
            brand: 'Ask Wonder',
          }

          response = await request(app).post('/messages').send(message)
          await request(app).get('/messages')
        })

        it('should return an "OK" http status.', () => {
          expect(response.status).to.be.eql(httpStatus.OK)
        })

        it('should return a message id.', () => {
          expect(response.body.messageId).to.be.an.uuid('v4')
        })
      })
    })

    describe('GET /messages', () => {
      context('Pulling a message from the queue.', () => {
        let response
        const message = {
          productId: Math.ceil(Math.random() * 9000 + 1000),
          brand: 'Ask Wonder',
        }

        before(async () => {
          await request(app).post('/messages').send(message)
          response = await request(app).get('/messages')
        })

        it('should return an "OK" http status.', () => {
          expect(response.status).to.be.eql(httpStatus.OK)
        })

        it('should return a full message.', () => {
          const { body: pulledMessage } = response
          expect(pulledMessage.content).to.be.eql(message)
        })

        it('should return a "NOT FOUND" http status if there is no more messages available.', async () => {
          const res = await request(app).get('/messages')
          expect(res.status).to.be.eql(httpStatus.NOT_FOUND)
        })
      })
    })

    describe('PUT /messages', () => {
      context('Acknowledging a message to be purged from the queue', () => {
        let response

        before(async () => {
          const message = {
            productId: Math.ceil(Math.random() * 9000 + 1000),
            brand: 'Ask Wonder',
          }

          await request(app).post('/messages').send(message)
          const { body: pulledMessage } = await request(app).get('/messages')
          response = await request(app).put('/messages').send({ messageId: pulledMessage.id })
        })

        it('should return an "OK" http status.', () => {
          expect(response.status).to.be.eql(httpStatus.OK)
        })
      })
    })
  })
})
