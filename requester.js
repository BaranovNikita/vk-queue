const axios = require('axios')
const MAX_REQUEST_PER_SECOND = 10

module.exports = (queueInstance) => {
  const loop = () => {
    console.log('queue length', queueInstance.queue.length)
    const current = queueInstance.getFirstMany(MAX_REQUEST_PER_SECOND)
    current.forEach(async (request) => {
      const { id, url, body, headers, method, query } = request
      try {
        const { data } = await axios[method](url, body, {
          headers,
          params: query
        })
        if (data.error) {
          console.error(data.error.error_msg)
        }
      } catch (e) {
        console.error(e)
      } finally {
        queueInstance.remove(id)
      }
    })
  }

  setInterval(loop, 1000)
}