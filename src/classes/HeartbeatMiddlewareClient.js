const got = require('got')
const mergeStatuses = require('../lib/mergeStatuses.js')

class HeartbeatMiddlewareClient {
  run () {
    return (req, res) => {
      const dependencyPromises = []
      if(req.query && req.query.dependencies && req.query.dependencies.length) {
        const dependencies = req.query.dependencies.split(',')
        for(const url of dependencies) {
          const promise = new Promise((resolve) => {
            got(url, {timeout: 3000})
              .then((res) => {
                resolve({
                  url,
                  status: res.statusCode
                })
              })
              .catch((error) => {
                resolve({
                  url,
                  status: error.message
                })
              })
          })
          dependencyPromises.push(promise)
        }
      }
      Promise.all(dependencyPromises)
        .then((dependencies) => {
          const status = mergeStatuses(dependencies)
          res.status(200).json({status, dependencies})
        })
    }
  }
}

module.exports = HeartbeatMiddlewareClient