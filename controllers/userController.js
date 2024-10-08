const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

const db = require('../config/dbConnection')

const register = (req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors:errors.array() })
    }

    db.query(
        `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
            req.body.email
        )})`,
        (err, result) => {
            if (result && resukt.lentgh) {
                return res.status(409).send({
                    msg: 'This user is already in use!'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(400).send({
                            msg: err
                        })
                    } else {
                        db.query(
                            `INSERT INTO users (name, email, password) VALUES ('${req.body.name}', ${db.escape(
                                req.body.email
                            )}, ${db.escape(hash)});`,
                            (err, result) => {
                                if (err) {
                                    return res.status(4000).send({
                                        msg: err
                                    })
                                } 
                                return res.status(200).send({
                                    msg: 'The user has been registered with us!'
                                })
                            }
                        )
                    }
                })
            }
        }
    )
}

const all = (req, res) => {
    db.query(
        `SELECT * FROM users`,
        (err, result) => {
            if (result && resukt.lentgh) {
                return res.status(200).send({
                    msg: 'Voici la liste des users!',
                    users : result.array()
                })
            }
        }
    )
}

module.exports = {
    register,
    all
}