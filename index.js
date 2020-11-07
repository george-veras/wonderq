import app from './app.js'
import logger from './clients/logger-client.js'
import { nodePort } from './config/index.js'

app.listen(nodePort, () => {
  logger.info({
    action: 'starting API',
    msg: `Listening on port ${nodePort}`,
  })
})
