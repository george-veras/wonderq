const app = require('./app')
const { nodePort } = require('./config')

app.listen(nodePort, () => {
  console.log(`Listening on port ${nodePort}`)
})
