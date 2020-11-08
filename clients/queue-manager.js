import { v4 as uuidv4 } from 'uuid'
import binarySearchAlgorithm from '../helpers/binary-search-algorithm.js'
import { messagesFlushInterval } from '../config/index.js'

// This array will work as a queue for messages available to be picked.
const messagesReady = []

// This works as a helper dictionary, it grants me a O(1) search by id.
const unacknowledgedMessages = {}

// This array will be ordered by a timestamp.
const timerToRequeueBuffer = []

export default (timeoutMilliseconds) => {
  const purgeExpiredMessages = () => {
    const timestampThreshold = Date.now() - timeoutMilliseconds
    // A binary search would save me from having to processes and move each message one by one.
    // The binary search has a complexity of O(log n).
    const firstExpiredMsgIndex = binarySearchAlgorithm.getFirstExpiredIndex(timestampThreshold, timerToRequeueBuffer)

    // Again, no need to lock the array.
    const expiredMessages = timerToRequeueBuffer.splice(0, firstExpiredMsgIndex + 1)
    messagesReady.push(...expiredMessages)

    // Flush the helper dictionary
    expiredMessages.forEach((msg) => delete unacknowledgedMessages[msg.id])
  }

  setInterval(purgeExpiredMessages, messagesFlushInterval)

  return {
    pushToQueue: (message) => {
      const id = uuidv4()
      messagesReady.push({ id, content: message })
      return id
    },

    pullFromQueue: () => {
      if (!messagesReady.length) return false

      const pulledMessage = messagesReady.shift()
      pulledMessage.timestamp = Date.now()

      const index = timerToRequeueBuffer.push(pulledMessage) - 1
      unacknowledgedMessages[pulledMessage.id] = index
      return pulledMessage
    },

    acknowledgeMessage: (messageId) => {
      const indexToPurge = unacknowledgedMessages[messageId]
      if (typeof indexToPurge === 'undefined') return false

      const messageToPurge = timerToRequeueBuffer[indexToPurge]
      if (typeof messageToPurge === 'undefined') return false

      const timestampThreshold = Date.now() - timeoutMilliseconds
      if (messageToPurge.id === messageId && messageToPurge.timestamp > timestampThreshold) {
        // One doesn't need to lock the array here because javascript is not multi-threaded.
        // Asynchronous does not mean multiple threads.
        timerToRequeueBuffer.splice(indexToPurge, 1)

        delete unacknowledgedMessages[messageId]
        return true
      }

      return false
    },

    purgeExpiredMessages,

    getQueueLength: () => {
      return messagesReady.length
    },

    getUnackCount: () => {
      return Object.keys(unacknowledgedMessages).length
    },
  }
}
