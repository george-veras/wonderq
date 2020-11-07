/**
 * This file is designed to keep the settings tidy
 * and in one place only.
 */

module.exports = {
  logLevel: process.env.LOG_LEVEL || 'info',
  nodePort: process.env.NODE_PORT || 3000,
}
