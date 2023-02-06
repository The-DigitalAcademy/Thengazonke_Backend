const pool = require('../../config/connection');

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

const createTransaction = (req, res) => {

    const {livestockID, userID,status,buyerID} = req.body;

    pool.query('INSERT INTO "public"."Transaction"("livestockID", "userID", "status","buyerID")VALUES ($1,$2,$3,$4)',[livestockID, userID,status,buyerID], (error, results) => {
      if (error) {
      }
      res.status(201).send(`Transaction created`)
    }),handleErr
}

const updateTransaction = (request, response) => {
  const id = parseInt(request.params.id)
  const {status}  = request.body

  pool.query(' UPDATE "public"."Transaction" SET "status" =$1 WHERE "transactionID"=$2',[status, id],(error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Transaction modified with ID: ${id}`)
    }
  )
}

const getFullTransaction = (req, res) => {
  pool.query('SELECT t.status,t."transDate", t."transactionID",u.fullname,u."Userid", l.age, l.image,l.price,l.weight, c."categoryName", b."breedName" FROM public."Transaction" t, "Livestock" l, "Users" u, "Category" c, "Breed" b WHERE t."livestockID" = l."livestockID" AND t."userID" = u."Userid" AND l."categoryID" = c."categoryID" AND l."breedID" = b."breedID" ORDER BY t."transactionID" ASC ', (error, results) => {
    res.status(200).send(results.rows)
  }),handleErr
}
const getTransaction = (req, res) => {
  pool.query('SELECT * FROM "public"."Transaction" ORDER BY "transactionID" ASC ', (error, results) => {
    res.status(200).send(results.rows)
  }),handleErr
}

const deleteTransaction = (req, res) => {

  const transactionID = req.params.id;
  const { status } = req.body

  pool.query('UPDATE "public"."Transaction" SET status=$1 WHERE "transactionID" = $2;',[status,transactionID], (error, results) => {

        res.status(200).send('transaction archived')
      //response.send(JSON.stringify(results));

    }
  )
}

module.exports = {
    createTransaction,
    getTransaction,
    updateTransaction,
    getFullTransaction,
    deleteTransaction

}
