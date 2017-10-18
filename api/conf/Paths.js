'use strict'
require('dotenv').config()
const path = process.env.BASIC_PATH

module.exports = {
    extern: {
        facebook: {
            getProfile: (id) => `https://graph.facebook.com/v2.10/${id}?access_token=${process.env.FACEBOOK_TOKEN}`
        }
    },
    intern: {
        userParam: `${path}user/{id}`,
        user: `${path}user`
    }
}
