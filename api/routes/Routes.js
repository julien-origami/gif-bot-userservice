'use strict'
import UserController from '../controllers/UserController.js'
import Paths from '../conf/Paths'
import Joi from 'joi'

module.exports = (server) => {

    server.route({
        method: 'GET',
        path: Paths.intern.userParam,
        handler: UserController.getUser
    })

    server.route({
        method: 'POST',
        path: Paths.intern.user,
        handler: UserController.postUser,
        config: {
            validate: {
                payload: {
                    name: Joi.string().min(1).required(),
                    picture: Joi.string().min(50).required(),
                    idmessenger: Joi.string().min(15).max(17).required()
                }
            }
        }
    })

    server.route({
        method: 'DELETE',
        path: Paths.intern.userParam,
        handler: UserController.deleteUser
    })

    server.route({
        method: 'GET',
        path: Paths.intern.user,
        handler: UserController.getUsers
    })
}
