/**
 * This file is designed to keep the settings tidy
 * and in one place only.
 */

const logLevel = process.env.LOG_LEVEL || 'info'
const nodePort = process.env.NODE_PORT || 3000
const messagesFlushInterval = process.env.FLUSH_INTERVAL || 5000

export { logLevel, nodePort, messagesFlushInterval }
