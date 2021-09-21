const expectConstructorNameToBe = require('../lib/expectConstructorNameToBe.js')
const expectArrayToHaveSize = require('../lib/expectArrayToHaveSize.js')

class HeartbeatMiddlewareOptions {
  #routes
  #interval
  #timeout
  #hideOutput

  constructor (options) {
    try {
      HeartbeatMiddlewareOptions.validate(options)
    } catch (error) {
      throw new Error('invalid HeartbeatMiddlewareOptions: ' + error.message)
    }
    this.#routes = options.routes
    this.#interval = options.interval || 60
    this.#timeout = options.interval || 30
    this.#hideOutput = options.hideOutput || false
  }

  static validate (options) {
    expectConstructorNameToBe(options, 'Object', 'options')
    expectConstructorNameToBe(options.routes, 'Array', 'options.routes')

    for (const [routeIndex, route] of options.routes.entries()) {
      expectConstructorNameToBe(route, 'Object', `options.routes[${routeIndex}]`)
      expectConstructorNameToBe(route.url, 'String', `options.routes[${routeIndex}].url`)
      expectConstructorNameToBe(route.dependencies, 'Array', `options.routes[${routeIndex}].dependencies`, true)

      if (Array.isArray(route.dependencies)) {
        for (const [dependencyIndex, dependency] of route.dependencies.entries()) {
          if (Array.isArray(dependency)) {
            expectArrayToHaveSize(dependency, 2, `options.routes.[${routeIndex}].dependencies.[${dependencyIndex}]`)
            expectConstructorNameToBe(dependency[0], 'String', `options.routes.[${routeIndex}].dependencies.[${dependencyIndex}][0]`)
            expectConstructorNameToBe(dependency[1], 'Number', `options.routes.[${routeIndex}].dependencies.[${dependencyIndex}][1]`)
          } else {
            expectConstructorNameToBe(dependency, 'String', `options.routes.[${routeIndex}].dependencies.[${dependencyIndex}]`)
          }
        }
      }
    }

    expectConstructorNameToBe(options.interval, 'Number', 'options.interval', true)
    expectConstructorNameToBe(options.timeout, 'Number', 'options.timeout', true)
    expectConstructorNameToBe(options.hideOutput, 'Boolean', 'options.hideOutput', true)
  }

  getRoutes () {
    return this.#routes
  }

  getInterval () {
    return this.#interval
  }

  getTimeout () {
    return this.#timeout
  }

  getHideOutput () {
    return this.#hideOutput
  }
}

module.exports = HeartbeatMiddlewareOptions
