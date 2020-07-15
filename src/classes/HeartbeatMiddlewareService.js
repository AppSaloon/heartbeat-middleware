const got = require('got')
const mergeStatuses = require('../lib/mergeStatuses.js')

class HeartbeatMiddlewareService {
  #options
  #lastStatus

  constructor (options) {
    this.#options = options
    this.#lastStatus = {}
  }

  run () {
    this.init()
    return (req, res) => {
      const routeStatuses = Object
        .values(this.#lastStatus)
        .filter((routeStatus) => Boolean(routeStatus))

      const status = mergeStatuses(routeStatuses)
      res.status(status)
      if (this.#options.getHideOutput()) {
        res.send()
      } else {
        res.json({ status, ...this.#lastStatus })
      }
    }
  }

  init () {
    this.#options.getRoutes().forEach((route) => {
      this.getHeartbeat(route)
      setInterval(
        () => this.getHeartbeat(route),
        this.#options.getInterval() * 1000
      )
    })
  }

  getHeartbeat (route) {
    let url = route.url
    const hasDependencies = Array.isArray(route.dependencies)
    if (hasDependencies) {
      const query = new URLSearchParams({ dependencies: route.dependencies })
      url = `${url}?${query}`
    }

    const start = new Date()
    const promise = new Promise((resolve) => {
      got(url, { timeout: 6000 })
        .then((res) => {
          if (hasDependencies) {
            return JSON.parse(res.body).dependencies
          }
        })
        .then((dependencies) => {
          const status = mergeStatuses(dependencies)
          resolve({
            status,
            dependencies
          })
        })
        .catch((error) => {
          resolve({
            status: error.message
          })
        })
    })
    promise.then(({ status, dependencies }) => {
      this.#lastStatus[route.url] = {
        status,
        start,
        end: new Date()
      }
      if (hasDependencies) {
        this.#lastStatus[route.url].dependencies = dependencies
      }
    })
  }
}

module.exports = HeartbeatMiddlewareService
