const HeartbeatMiddlewareOptions = require('./classes/HeartbeatMiddlewareOptions.js')
const HeartbeatMiddlewareService = require('./classes/HeartbeatMiddlewareService.js')
const HeartbeatMiddlewareClient = require('./classes/HeartbeatMiddlewareClient.js')

const service = (options) => {
  const service = new HeartbeatMiddlewareService(new HeartbeatMiddlewareOptions(options))
  return service.run()
}

const client = () => {
  const client = new HeartbeatMiddlewareClient()
  return client.run()
}

module.exports = service
module.exports.heartbeatMiddlewareClient = client()
