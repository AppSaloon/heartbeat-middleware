import HeartbeatMiddlewareOptions from './classes/HeartbeatMiddlewareOptions.js'
import HeartbeatMiddlewareService from './classes/HeartbeatMiddlewareService.js'
import HeartbeatMiddlewareClient from './classes/HeartbeatMiddlewareClient.js'

const service = (options) => {
  const service = new HeartbeatMiddlewareService(new HeartbeatMiddlewareOptions(options))
  return service.run()
}

const client = () => {
  const client = new HeartbeatMiddlewareClient()
  return client.run()
}

const middleWareClient = client()

export default service
export {
  middleWareClient as heartbeatMiddlewareClient
}
