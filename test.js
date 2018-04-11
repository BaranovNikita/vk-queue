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

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

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

const main = async () => {
  for(let i = 0; i < 5; i++) {
    console.log(i, new Date())
    sendRequests()
    await delay(1000)
  }
}

main()