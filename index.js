const express = require('express')
const bodyParser = require('body-parser')
const nanoid = require('nanoid')
const morgan = require('morgan')

const Queue = require('./Queue')
const { MAX_REQUEST_COUNT, PER_TIME_MS } = require('./config')

const queue = new Queue()
const port = 3000

require('./requester')(queue)

const server = express()

server.use(morgan('combined'))

server.use(bodyParser.urlencoded({
  extended: true
}))

server.use(bodyParser.json())

server.post('/send', (req, res) => {
  const { headers, body } = req
  delete headers.host
  queue.add({
    id: nanoid(),
    url: 'https://api.vk.com/method/messages.send',
    body,
    headers,
    method: 'post'
  })
  res.json({
    success: true
  })
})

server.get('/', (req, res) => {
  res.send('Hello')
})

server.post('/', (req, res) => {
  res.send('Posted')
})

server.listen(port, (err) => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${port} with MAX COUNT = ${MAX_REQUEST_COUNT} and TIME = ${PER_TIME_MS}`)
})