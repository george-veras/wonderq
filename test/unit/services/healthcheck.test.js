import HealthCheckService from '../../../services/healthcheck-service.js'

describe('HealthCheckService', () => {
  describe('check()', () => {
    it('should return { stauts: "ok" } ', async () => {
      const status = await HealthCheckService.status()
      expect(status).to.be.eql({
        status: 'ok',
      })
    })
  })
})
