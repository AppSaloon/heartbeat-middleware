# heartbeat-middleware

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
        'http://service1/status',
        'http://service3/status',
      ]
    },
    {url: 'http://service3/status'},
    {url: 'http://service4/status'},
  ],
  interval: 30, // default: 60 seconds
  hideOutput: false, // default: false
}

app.get('/status', heartbeatMiddleware(options))

// the rest of your express proxy app
```
### heartbeatMiddlewareOptions
The options variable passed to HeartbeatMiddleware should be an object with the following properties:
* `routes` (required): an array of objects with the following properties:
  * `url` (required): a string
  * `dependencies` (optional): an array of strings
* `interval` (optional, default 60): a number
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