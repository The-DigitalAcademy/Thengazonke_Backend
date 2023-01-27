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


const getTransaction = (req, res) => {
  pool.query('SELECT * FROM "public"."Transaction" ORDER BY "transactionID" ASC ', (error, results) => {
    res.status(200).send(results.rows)
  }),handleErr
}

const updateTransaction = (req, res) => {
  const transactionID = parseInt(req.params.id);
  const {livestockID, userID, status } = req.body

  pool.query('UPDATE "public"."Transaction" SET "livestockID"=$1, "userID"=$2, status=$3 WHERE transactionID = $4;',
  [livestockID, userID, status, transactionID], (error, results) => {
      
        res.status(200).send()
      //response.send(JSON.stringify(results));
      
    }
  )
}



module.exports = {
    createTransaction,
    getTransaction,
    updateTransaction
}
