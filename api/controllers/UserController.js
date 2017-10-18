'use-strict'
import PgController from './PgController'
import Boom from 'boom'
import fetch from 'node-fetch'
import Paths from '../conf/Paths'

exports.getUser = (request, reply) => {
    PgController.getUser(request.params.id)
    .then(rows => {
        if (rows.length > 0){
            reply(rows[0])
        }else{
            fetchFacebookProfile(reply, request.params.id)
        }
    })
}

exports.postUser = (request, reply) => {
    PgController.createUser(request.payload)
    .then(rows => reply(rows[0]))
    .catch(e => {
        reply(Boom.badRequest())
    })
}

exports.deleteUser = (request, reply) => {
    PgController.deleteUser(request.params.id)
    .then(() => reply())
}

exports.getUsers = (request, reply) => {
    PgController.getUsers()
    .then(rows => reply(rows))
}

function fetchFacebookProfile(reply, id){
    return fetch(Paths.extern.facebook.getProfile(id))
    .then(res => res.json())
    .then((json) => {
        if(json.first_name){
            const user = {
                name: `${json.first_name} ${json.last_name}`,
                picture: json.profile_pic,
                idmessenger: json.id
            }
            PgController.createUser(user)
            .then(rows => reply(rows[0]))
            .catch(e => {
                reply(Boom.notFound())
            })
        } else {
            reply(Boom.notFound())
        }
    })
    .catch(function(err) {
        console.log(err)
        reply(Boom.notFound())
    })
}
