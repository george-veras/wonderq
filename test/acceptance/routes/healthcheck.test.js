import request from 'supertest'
import httpStatus from 'http-status'

import app from '../../../app.js'

describe('HealthCheck test', () => {
  describe('GET /healthcheck', () => {
    let response

    before(async () => {
      response = await request(app).get('/healthcheck')
    })

    it('should return 200 - [OK]', () => {
      expect(response.status).to.be.eql(httpStatus.OK)
    })

    it("should return { status: 'ok' }", () => {
      expect(response.body).to.have.property('status', 'ok')
    })
  })
})
