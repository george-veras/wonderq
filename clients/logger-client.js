const logLibrary = require('pino')
const { logLevel } = require('../config')

/**
 * Logger instance config using pinojs.
 * This client is designed to abstract the log library
 * and provide flexibility for the team to change it when it seems fit.
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

module.exports = {
  debug: loggerInstance.debug,
  info: loggerInstance.info,
  warn: loggerInstance.warn,
  error: loggerInstance.error,
  fatal: loggerInstance.fatal,
  silent: loggerInstance.silent,
}
