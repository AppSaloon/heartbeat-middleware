const initialize = require('./initialize')

const heartbeatMiddleware = (heartbeatMiddlewareOptions) => {
  const {
    statusPath,
    routes,
    interval = 60,
  } = heartbeatMiddlewareOptions
  const lastStatus = {}

  initialize(routes, lastStatus, interval)

  return (req, res, next) => {
    const {
      method,
      path,
    } = req

    if (method === 'GET' && path === statusPath) {
      const statusCode = Object.values(lastStatus).some(({status}) => status !== 200)
        ? 500
        : 200
      res.status(statusCode).json(lastStatus)
    } else {
      next()
    }
  }
}

module.exports = heartbeatMiddleware