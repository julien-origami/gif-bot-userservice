'use strict'
import UserController from '../controllers/UserController.js'
import Paths from '../conf/Paths'
import Joi from 'joi'

module.exports = (server) => {

    server.route({
        method: 'GET',
        path: Paths.intern.userParam,
        config: {
            tags: ['api'],
            validate: {
                params: {
                    id: Joi.number().integer().required().description('id')
                }
            },
            handler: UserController.getUser
        }
    })

    server.route({
        method: 'POST',
        path: Paths.intern.user,
        handler: UserController.postUser,
        config: {
            tags: ['api'],
            validate: {
                payload: {
                    name: Joi.string().min(1).required().description('name'),
                    picture: Joi.string().min(50).required().description('picture'),
                    idmessenger: Joi.string().min(15).max(17).required().description('idmessenger')
                }
            }
        }
    })

    server.route({
        method: 'DELETE',
        path: Paths.intern.userParam,
        config: {
            tags: ['api'],
            validate: {
                params: {
                    id: Joi.number().integer().required().description('id')
                }
            },
            handler: UserController.deleteUser
        }
    })

    server.route({
        method: 'GET',
        path: Paths.intern.user,
        handler: UserController.getUsers,
        config: {
            tags: ['api']
        }
    })
}
