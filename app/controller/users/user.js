const pool = require('../../config/connection');

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

const getUsers = (req, res) => {
    pool.query('SELECT * FROM public."Users" ORDER BY "Userid" ASC ', (error, results) => {
      res.status(200).send(results.rows)
    }),handleErr
}

module.exports = {
    getUsers
  }