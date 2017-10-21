'use strict'
import Hapi from 'hapi'
require('dotenv').config()
import Db from './api/conf/Db'
import routes from './api/routes/Routes'
import swaggered from 'hapi-swaggered'
import swaggeredUI from 'hapi-swaggered-ui'
import vision from 'vision'
import inert from 'inert'

if (!process.env.PATH && process.env.PG_CON) {
  throw 'Make sure you defined PG_CON and PATH in your .env file'
}

const server = new Hapi.Server()
//server.connection({ port: 4324, host: '192.168.100.1', routes: { cors: true } })
server.connection({ port: 4324, host: '192.168.43.20', routes: { cors: true } , labels: ['api'] })

server.register([
    vision,
    inert,
    {
        register: swaggered,
        options: {
            info: {
                title: 'User Service API',
                description: 'API documentation for User Service',
                version: '1.0'
            }
        }
    },
    {
        register: swaggeredUI,
        options: {
            title: 'Gif Bot User-Service API',
            path: '/docs',
            swaggerOptions: {}
        }
    }
], {
    select: 'api'
}, (err) => { if (err) { throw err } })

routes(server)

server.start((err) => {
    if (err) {
        throw err
    }
    console.log('Server running at:', server.info.uri)
})

Db.client.connect((err) => {
    if (err) {
        throw err
        console.error('connection error', err.stack)
    }
})
