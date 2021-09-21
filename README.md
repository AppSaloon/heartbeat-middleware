# heartbeat-middleware

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## Description

Heartbeat controller for a proxy service.

This middleware can be used to add a GET "/status" endpoint to your Express proxy application.

It will periodically request the status of other services. When the "/status" endpoint is requested, this middleware will respond with either statusCode `200` when all other services are reachable, or `500` when at least one service is unreachable.

## Purpose

You can use heartbeat-middleware to add `domain.org/status` to services like [UptimeRobot](https://uptimerobot.com/) to make sure you will be notified of connectivity problems within your Express applications.

## Usage (Express proxy application)

`npm i @appsaloon/heartbeat-middleware`

```javascript
const express = require('express')
const heartbeatMiddleware = require('@appsaloon/heartbeat-middleware')

const app = express()
const options = {
   routes: [
    {url: 'http://service1/status'},
    {
      url: 'http://service2/status',
      dependencies: [
        ['http://service1/status', 20], // default: 30 seconds -- the timeout of the request from client to dependency
        'http://service3/status',
      ]
    },
    {url: 'http://service3/status'},
    {url: 'http://service4/status'},
  ],
  interval: 60, // default: 60 seconds
  timeout: 30, // default: 30 seconds -- the timeout of the request from service to client
  hideOutput: false, // default: false
}

app.get('/status', heartbeatMiddleware(options))

// the rest of your express proxy app
```

### heartbeatMiddlewareOptions

The options variable passed to HeartbeatMiddleware should be an object with the following properties:

* `routes` (required): an array of objects with the following properties:
  * `url` (required): a string
  * `dependencies` (optional): an array of either:
    * string (dependency url)
    * array of size 2:
      * string (dependency url)
      * number (timeout in seconds)
* `interval` (optional, default 60): a number
* `timeout` (optional, default 30): a number
* `hideOutput` (optional, default false): a boolean

---

The `url` of a route will be pinged by the middleware and the client will respond with `200`.

If `dependencies` is provided for a route, the client will ping each dependency and respond with `200` if all dependencies also respond with `200`. If any of the dependencies are unreachable, the client will respond with `500`.

`interval` is the duration measured in seconds between calls to the client.

`hideOutput` can be set to `true` if you wish to hide the output of the proxy application's "/status" endpoint.

## Usage (Express client application)

`npm i @appsaloon/heartbeat-middleware`

```javascript
const express = require('express')
const { heartbeatMiddlewareClient } = require('@appsaloon/heartbeat-middleware')

const app = express()
app.get('/status', heartbeatMiddlewareClient)

// the rest of your express client app
```

No further configuration is required for the client middleware.

## Demo

A demo is provided in this repository. The demo contains a docker-compose.yml file with the following services:

* proxy-service
* service1
* service2
* service3
* service4

The proxy service is set up to route requests from localhost:3000/service1 to service1, and so on.

The proxy service also has a /status endpoint which will respond with either `200` or `500`, depending on whether or not all the services are reachable.

To start the demo, run `npm run demo` and visit <http://localhost:3000/status>.

This demo setup has deliberately been broken to show what happens to the output when one or more services become unreachable by heartbeat-middleware.
In this case, service1 has been disabled. This will also cause <http://service2/status> to respond with a `500` status code because service1 has been added to the dependencies array of service2 in the heartbeat middleware options.

To fix the demo, uncomment line 27 in  ./demo/docker-compose.yml, and then run  `npm run demo` again:

```yaml
#    command: node ./src/index.js
```
