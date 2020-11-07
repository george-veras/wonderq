const request = require('supertest')
const httpStatus = require('http-status')

const app = require('../../../app')

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
