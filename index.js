const express = require('express')
const bodyParser = require('body-parser')
const Queue = require('./Queue')
const nanoid = require('nanoid')

const queue = new Queue()
const port = 3000

require('./requester')(queue)

const server = express()

server.use(bodyParser.urlencoded({
  extended: true
}))

server.use(bodyParser.json())

server.post('/send', (req, res) => {
  const { headers, body } = req
  delete headers.host
  queue.add({
    id: nanoid(),
    url: 'http://localhost:3000/',
    body,
    headers: {
      ...headers,
      'content-type': 'application/json;charset=utf-8'
    },
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
  console.log(`> Ready on http://localhost:${port}`)
})