const axios = require('axios')

const count = 300

const reqs = []

for(let i = 0; i < count; i++) {
  reqs.push({
    body: {
      test: 5
    }
  })
}

console.log(reqs.length)

const sendRequests = () => {
  reqs.forEach(({ body }) => {
    try {
      axios.post('http://localhost:3000/send', {
        ...body
      })
    } catch (e) {
      console.error(e)
    }
  })
}

setInterval(() => {
  sendRequests()
}, 1000)