import logger from '../clients/logger-client.js'

const HealthCheckService = {
  async status() {
    logger.debug({
      action: 'healthcheckService.status',
      msg: 'Checking API health',
    })

    // Right now it returns a promise because it would
    // check for any async depedency, like database availability.
    return Promise.resolve({ status: 'ok' })
  },
}

export default HealthCheckService
