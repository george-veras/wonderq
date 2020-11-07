const app = require('./app')
const logger = require('./clients/logger-client')
const { nodePort } = require('./config')

app.listen(nodePort, () => {
  logger.info({
    action: 'starting API',
    msg: `Listening on port ${nodePort}`,
  })
})
