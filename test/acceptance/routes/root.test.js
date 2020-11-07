import request from 'supertest'
import httpStatus from 'http-status'

import app from '../../../app.js'

describe('Root path test', () => {
  describe('GET /', () => {
    let res

    before(async () => {
      res = await request(app).get('/')
    })

    it('should return 404 - [NOT FOUND]', () => {
      expect(res.status).to.be.eql(httpStatus.NOT_FOUND)
    })
  })
})
