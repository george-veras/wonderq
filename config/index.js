/**
 * This file is designed to keep the settings tidy
 * and in one place only.
 */

const logLevel = process.env.LOG_LEVEL || 'info'
const nodePort = process.env.NODE_PORT || 3000
const acknowledgementTimeout = process.env.ACKNOWLEDGEMENT_TIMEOUT || 5000
const messagesFlushInterval = process.env.FLUSH_INTERVAL || 2500

export { logLevel, nodePort, messagesFlushInterval, acknowledgementTimeout }
