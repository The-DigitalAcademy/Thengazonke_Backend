const pool = require('../../config/connection');

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

const createTransaction = (req, res) => {

    const {livestockID, userID,status} = req.body;

    pool.query('INSERT INTO "public"."Transaction"("livestockID", "userID", "status")VALUES ($1,$2,$3)',[livestockID, userID,status], (error, results) => {
      if (error) {
      }
      res.status(201).send(`Transaction created`)
    }),handleErr
}


module.exports = {
    createTransaction
}
