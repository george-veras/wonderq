import { v4 as uuidv4 } from 'uuid'

const messagesReady = []
const unacknowledgedMessages = {}

// setTimeout(() => {
//   db.first = db['202010071713'];
//   db.last = db['202010071715'];
// }, 
// 1*1000);

export default timeoutMilliseconds => {
  return {
    pushToQueue: message => {
      const id = uuidv4()
      messagesReady.push({ id, content: message })
      return id
    },

    pullFromQueue: () => {
      const pulledMessage = messagesReady.shift()
      unacknowledgedMessages[pulledMessage.id] = pulledMessage.content
      return pulledMessage
    },

    acknowledgeMessage: messageId => {
      delete unacknowledgedMessages[messageId]
    },
  }
}
