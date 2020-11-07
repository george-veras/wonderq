import logLibrary from 'pino'
import { logLevel } from '../config/index.js'

/**
 * Logger instance config using pinojs.
 * This client is designed to abstract the log library
 * and provide flexibility for the team to change it whenever it seems fit.
 *
 * See: https://github.com/pinojs/pino
 */
const config = Object.freeze({
  base: null, // Disable "pid", "hostname" and "name" fields
  level: logLevel,
  formatters: {
    level: (label) => ({ level: label }),
  },
  timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
})

/** @type {pino.Logger} */
const loggerInstance = logLibrary(config)

export default {
  debug: (content) => loggerInstance.debug(content),
  info: (content) => loggerInstance.info(content),
  warn: (content) => loggerInstance.warn(content),
  error: (content) => loggerInstance.error(content),
}
