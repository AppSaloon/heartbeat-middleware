import os from 'os'
import got from 'got'
import mergeStatuses from '../lib/mergeStatuses.js'
import getPackage from '../lib/getPackageService.js'

class HeartbeatMiddlewareClient {
  #dependencies = {}
  run () {
    return async (req, res) => {
      const dependenciesOutput = []
      if (req.query && req.query.dependencies && req.query.dependencies.length) {
        const dependencies = req.query.dependencies.split(',')
        for (const url of dependencies) {
          if (!this.#dependencies[url]) this.#dependencies[url] = {}
          const start = new Date()
          try {
            const response = await got(url, {
              timeout: {
                request: 3000
              },
              responseType: 'json'
            })
            const { body, statusCode } = response
            const { name, uptime } = body
            dependenciesOutput.push({
              url,
              name,
              status: statusCode,
              uptime,
              start,
              end: new Date(),
              lastConnection: new Date()
            })
          } catch (error) {
            dependenciesOutput.push({
              url,
              status: error.response?.statusCode || error.code,
              errorMessage: error.message,
              start,
              end: new Date(),
              lastConnection: this.#dependencies[url]?.lastConnection
            })
          }
        }
      }
      const status = mergeStatuses(dependenciesOutput)
      const name = getPackage()
      const uptime = os.uptime()
      res.status(200).json({ status, dependenciesOutput, name, uptime })
    }
  }
}

export default HeartbeatMiddlewareClient
