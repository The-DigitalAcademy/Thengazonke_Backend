const { request, response } = require('express');
const pool = require('../../config/connection');

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

const createRating = (request, response) => {
    const {userRaterID, userRateID, transactionID,rate,review} = request.body
  
    pool.query('INSERT INTO "public"."Rating"("userRaterID", "userRateID","transactionID","rate","review")VALUES ($1,$2,$3,$4,$5)', [userRaterID, userRateID, transactionID,rate,review], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Rate added with ID: ${results.rows}`)
    })
  }



const getRating = (request, response) => {
    pool.query('SELECT * FROM "public"."Rating" ORDER BY "rateID" ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getRatingPerUser = function (request, response) {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM "public"."Rating" WHERE "userRateID" =$1',[id],(error,results) =>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
  }

module.exports = {

    createRating,
    getRating,
    getRatingPerUser

}