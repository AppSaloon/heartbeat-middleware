const got = require('got')

const getHeartbeat = (lastStatus, route) => {
  const url = `${route}/status`
  const options = {
    timeout: 2000,
  }
  const start = new Date()
  const promise = new Promise((resolve) => {
    got(url, options)
      .then((res) => {
        resolve({
          status: res.statusCode,
          end: new Date(),
        })
      })
      .catch(({message: status}) => {
        console.error(new Error(`no heartbeat on ${url}: ${status}`))
        resolve({
          status,
          end: new Date()
        })
      })
  })
  promise.then(({status, end}) => {
    lastStatus[route] = {
      status,
      start,
      end,
    }
  })
}

module.exports = getHeartbeat