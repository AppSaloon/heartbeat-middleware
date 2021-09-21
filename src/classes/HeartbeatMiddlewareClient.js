const os = require('os')
const got = require('got')
const mergeStatuses = require('../lib/mergeStatuses.js')
const getPackage = require('../lib/getPackageService.js')

class HeartbeatMiddlewareClient {
  #dependencies = {}
  run () {
    return (req, res) => {
      const dependencyPromises = []
      if (req.query && req.query.dependencies && req.query.dependencies.length) {
        const dependencies = req.query.dependencies.split(',')
        for (const dependency of dependencies) {
          const url = Array.isArray(dependency) ? dependency[0] : dependency
          const timeoutInSeconds = Array.isArray(dependency) ? dependency[1] : 30
          if (!this.#dependencies[url]) this.#dependencies[url] = {}
          const start = new Date()
          const promise = new Promise((resolve) => {
            got(url, {
              timeout: timeoutInSeconds * 1000,
              responseType: 'json'
            })
              .then(({ body, statusCode }) => {
                const { name, uptime } = body

                this.#dependencies[url].lastConnection = new Date()
                resolve({
                  url,
                  name,
                  status: statusCode,
                  uptime,
                  start,
                  end: new Date(),
                  lastConnection: new Date()
                })
              })
              .catch((error) => {
                resolve({
                  url,
                  status: error.response?.statusCode || error.code,
                  errorMessage: error.message,
                  start,
                  end: new Date(),
                  lastConnection: this.#dependencies[url]?.lastConnection
                })
              })
          })
          dependencyPromises.push(promise)
        }
      }
      Promise.all(dependencyPromises)
        .then((dependencies) => {
          const status = mergeStatuses(dependencies)
          const name = getPackage()
          const uptime = os.uptime()
          res.status(200).json({ status, dependencies, name, uptime })
        })
    }
  }
}

module.exports = HeartbeatMiddlewareClient
