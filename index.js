'use strict'
import Hapi from 'hapi'
require('dotenv').config()
import Db from './api/conf/Db'

if (!process.env.PATH && process.env.PG_CON) {
  throw 'Make sure you defined PG_CON and PATH in your .env file'
}

const server = new Hapi.Server()
server.connection({ port: 4324, host: '192.168.100.1', routes: { cors: true } })
//server.connection({ port: 4324, host: '192.168.43.20', routes: { cors: true } })

const routes = require('./api/routes/Routes')
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
