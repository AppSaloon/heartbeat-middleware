# heartbeat-middleware

## Description

Heartbeat controller for a proxy service (express)

## Usage

`npm i @appsaloon/heartbeat-middleware`

```javascript
const express = require('express')
const heartbeatMiddleware = require('@appsaloon/heartbeat-middleware')

const app = express()

const heartbeatMiddlewareOptions = {
  routes: [
    'http://service1',
    'http://service2',
  ],
  interval: 30, // default: 60 seconds
}

app.get('/status', heartbeatMiddleware (
    heartbeatMiddlewareOptions
  )
)

// the rest of your express app
```

## GET /status responses

### 200

```json
{
    "http://service1": {
        "status": 200,
        "start": "2019-10-25T15:58:16.097Z",
        "end": "2019-10-25T15:58:16.157Z"
    },
    "http://service2": {
        "status": 200,
        "start": "2019-10-25T15:58:16.078Z",
        "end": "2019-10-25T15:58:16.126Z"
    }
}
```

### 500

```json
{
    "http://service1": {
        "status": 200,
        "start": "2019-10-25T15:58:16.097Z",
        "end": "2019-10-25T15:58:16.157Z"
    },
    "http://service2": {
        "status": "Error: connection timeout",
        "start": "2019-10-25T15:58:16.078Z",
        "end": "2019-10-25T15:58:16.126Z"
    }
}
```
