'use-strict'
import Db from '../conf/Db'

module.exports = {
    getUsers: () => {
        return Db.query('SELECT * FROM users', [])
    },
    getUser: (id) => {
        return Db.query('SELECT * FROM users WHERE id = $1 OR idmessenger = ($1::text)', [id])
    },
    deleteUser: (id) => {
        return Db.query('DELETE FROM users WHERE id = $1', [id])
    },
    createUser: (user) => {
        return Db.query('INSERT INTO users(name, picture, idMessenger) VALUES($1, $2, $3) RETURNING *', [user.name, user.picture, user.idmessenger])
    }
}
