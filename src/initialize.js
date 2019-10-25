const getHeartbeat = require('./getHeartbeat')

const initialize = (routes, lastStatus, interval) => {
  routes.forEach((route) => {
    try {
      getHeartbeat(lastStatus, route)
      setInterval(() => getHeartbeat(lastStatus, route), interval * 1000)
    } catch(error) {}
  })
}

module.exports = initialize