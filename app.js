// Express
import express from 'express'
import routes from './routes/index.js'

// Init express app
const app = express()

app.use(express.json())

// Routes
app.use('/', routes)

export default app
