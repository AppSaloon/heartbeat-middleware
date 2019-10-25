const getHeartbeat = require('./getHeartbeat')

const initialize = (routes, lastStatus, interval) => {
  routes.forEach((route) => {
    lastStatus[route] = {
      status: undefined,
      start: undefined,
      end: undefined,
    }
    try {
      getHeartbeat(lastStatus, route)
      setInterval(() => getHeartbeat(lastStatus, route), interval * 1000)
    } catch(error) {}
  })
}

module.exports = initialize