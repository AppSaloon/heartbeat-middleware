import express from 'express'
import { heartbeatMiddlewareClient } from '@appsaloon/heartbeat-middleware'

const app = express()
const router = express.Router()

router.get('/status', heartbeatMiddlewareClient)
router.get('/', (req, res) => res.send('This client-service is online.'))

app.use(router)

app.listen(80, () => console.log('client-service is running on port 80'))
