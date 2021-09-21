const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const heartbeatMiddleware = require('@appsaloon/heartbeat-middleware')

const app = express()

const options = {
  routes: [
    { url: 'http://service1/status' }, // service1 should be reachable from the proxy service
    {
      url: 'http://service2/status', // service2 should be reachable from the proxy service
      dependencies: [
        ['http://service1/status', 2], // service1 should be reachable from within service2 with a timeout of 2 seconds
        'http://service3/status' // service3 should be reachable from within service2
      ]
    },
    { url: 'http://service3/status' }, // service3 should be reachable from the proxy service
    { url: 'http://service4/status' } // service4 should be reachable from the proxy service
  ],
  interval: 60, // default: 60 seconds
  timeout: 30, // default: 30 seconds
  hideOutput: false // default: false
}
app.get('/status', heartbeatMiddleware(options))

app.use('/service1', createProxyMiddleware({ target: 'http://service1', pathRewrite: { '^/service1': '' } }))
app.use('/service2', createProxyMiddleware({ target: 'http://service2', pathRewrite: { '^/service2': '' } }))
app.use('/service3', createProxyMiddleware({ target: 'http://service3', pathRewrite: { '^/service3': '' } }))
app.use('/service4', createProxyMiddleware({ target: 'http://service4', pathRewrite: { '^/service4': '' } }))
app.get('/', (req, res) => res.send('The proxy-service is online.'))

app.listen(80, () => console.log('proxy-service is running on port 80'))
