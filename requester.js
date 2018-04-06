const axios = require('axios')

module.exports = (queueInstance) => {
  const loop = () => {
    console.log('queue length', queueInstance.queue.length)
    const current = queueInstance.getFirstMany(20)
    current.forEach(async (request) => {
      const { id, url, body, headers, method } = request
      try {
        const { data } = await axios[method](url, body, {
          headers
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