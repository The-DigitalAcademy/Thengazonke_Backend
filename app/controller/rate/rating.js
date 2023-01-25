const pool = require('../../config/connection');

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

// const createRating = (req, res) => {

//     const {userRaterID, userRateID, transactionID,rate,review} = req.body;

   

//     pool.query('INSERT INTO "public"."Rating"("userRaterID", "userRateID","transactionID","rate","review")VALUES ($1,$2,$3,$4,$5)',[userRaterID, userRateID, transactionID,rate,review], (error, results) => {
//       if (error) {
//       }
//       res.status(201).send(`Rating added`)
//     }),handleErr
// }


const createRating = (request, response) => {
    const {serRaterID, userRateID, transactionID,rate,review} = request.body
  
    pool.query('INSERT INTO "public"."Rating"("userRaterID", "userRateID","transactionID","rate","review")VALUES ($1,$2,$3,$4,$5)', [serRaterID, userRateID, transactionID,rate,review], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Rate added with ID: ${results.rows[0].id}`)
    }),handleErr
  }

module.exports = {
    createRating
}