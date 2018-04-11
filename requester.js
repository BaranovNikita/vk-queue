const axios = require('axios')
const { MAX_REQUEST_COUNT, PER_TIME_MS } = require('./config')

module.exports = (queueInstance) => {
  let success = true
  const loop = () => {
    // console.log('queue length', queueInstance.queue.length)
    if (!success) {
      return
    }
    const current = queueInstance.getFirstMany(MAX_REQUEST_COUNT)
    let counter = current.length
    if (current.length) {
      success = false
    }
    current.forEach(async (request) => {
      const { id, url, body, headers, method } = request
      try {
        const { data } = await axios[method](url, body, {
          headers,
          params: body
        })
        if (data.error) {
          console.error(data.error.error_msg, new Date())
        } else {
          console.log('success', data, new Date())
        }
      } catch (e) {
        console.error(e, new Date())
      } finally {
        queueInstance.remove(id)
        counter--
        if (!counter) {
          success = true
        }
      }
    })
  }

  setInterval(loop, PER_TIME_MS)
}