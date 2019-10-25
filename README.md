## heartbeat-middleware

### Description
Heartbeat controller for a proxy service (express)

### Usage
`npm i @appsaloon/heartbeat-middleware`


```javascript
const express = require('express')
const heartbeatMiddleware = require('@appsaloon/heartbeat-middleware')

const app = express()

const heartbeatMiddlewareOptions = {
  // statusPath: String,
  // routes: [String],
  // interval: Number,
}

app.use(
  heartbeatMiddleware (
    heartbeatMiddlewareOptions
  )
)

// the rest of your express app
```