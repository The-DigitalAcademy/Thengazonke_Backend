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

const updateTransaction = (request, response) => {
  const id = parseInt(request.params.id)
  const {status}  = request.body

  pool.query(
   // 'UPDATE "public"."Breed" SET  "categoryID"= $1, "breedName" = $2 , "description"=$3 WHERE "breedID" = $4',


   ' UPDATE "public"."Transaction" SET "status" =$1 WHERE "transactionID"=$2',


    [status, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Breed modified with ID: ${id}`)
    }
  )
}

const getTransaction = (req, res) => {
  pool.query('SELECT * FROM "public"."Transaction" ORDER BY "transactionID" ASC ', (error, results) => {
    res.status(200).send(results.rows)
  }),handleErr
}


module.exports = {
    createTransaction,
    getTransaction,
    updateTransaction
}
