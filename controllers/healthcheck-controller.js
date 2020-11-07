import httpStatus from 'http-status'
import HealthCheckService from '../services/healthcheck-service.js'

const HealthCheckController = {
  async status(req, res) {
    const apiHealthStatus = await HealthCheckService.status()
    res.status(httpStatus.OK).json(apiHealthStatus)
  },
}

export default HealthCheckController
