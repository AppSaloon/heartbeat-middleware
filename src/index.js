const initialize = require('./initialize')

const heartbeatMiddleware = (heartbeatMiddlewareOptions) => {
  const {
    routes,
    interval = 60
  } = heartbeatMiddlewareOptions
  const lastStatus = {}

  initialize(routes, lastStatus, interval)

  return (req, res) => {
    const routeStatuses = Object.values(lastStatus)
      .filter((routeStatus) => Boolean(routeStatus))
    const statusCode = routeStatuses.length && routeStatuses.some(({ status }) => status !== 200)
      ? 500
      : 200
    res.status(statusCode).json(lastStatus)
  }
}

module.exports = heartbeatMiddleware
