class Queue {
  constructor () {
    this.queue = []
  }

  add (item) {
    this.queue.push(item)
  }

  getFirstMany (count) {
    return this.queue.slice(0, count)
  }

  remove (id) {
    const idx = this.queue.findIndex(el => el.id === id)
    this.queue = [
      ...this.queue.slice(0, idx),
      ...this.queue.slice(idx + 1)
    ]
  }
}

module.exports = Queue