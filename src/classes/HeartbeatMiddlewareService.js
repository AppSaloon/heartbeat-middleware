import os from 'os'
import got from 'got'
import mergeStatuses from '../lib/mergeStatuses.js'
import getPackage from '../lib/getPackageService.js'

class HeartbeatMiddlewareService {
  #options
  #lastStatus
  #name

  constructor (options) {
    this.#options = options
    this.#lastStatus = {}
    this.#name = getPackage()
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
        const uptime = os.uptime()
        res.json({ name: this.#name, status, uptime, dependencies: Object.values(this.#lastStatus) })
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

  async getHeartbeat (route) {
    let searchParams
    const hasDependencies = Array.isArray(route.dependencies)
    if (hasDependencies) {
      searchParams = new URLSearchParams({ dependencies: route.dependencies })
    }

    const start = new Date()
    try {
      const response = await got(route.url, {
        searchParams,
        timeout: {
          request: 6000
        },
        responseType: 'json'
      })

      const { body, statusCode } = response

      let status = statusCode
      const { dependencies, name, uptime } = body
      if (hasDependencies) {
        status = mergeStatuses(dependencies)
      }

      this.#lastStatus[route.url] = {
        url: route.url,
        name,
        status,
        uptime,
        start,
        end: new Date(),
        lastConnection: new Date()
      }
      if (hasDependencies) {
        this.#lastStatus[route.url].dependencies = dependencies
      }
    } catch (error) {
      this.#lastStatus[route.url] = {
        url: route.url,
        status: error.response?.statusCode || error.code,
        errorMessage: error.message,
        start,
        end: new Date(),
        lastConnection: this.#lastStatus[route.url]?.lastConnection
      }
    }
  }
}

export default HeartbeatMiddlewareService
