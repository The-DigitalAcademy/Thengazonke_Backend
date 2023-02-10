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

  const getRatingPerUser = (request, response) => {
    pool.query('SELECT Sum(r.rate)/count(r."userRaterID") as sumOfRate, r."userRateID", count(r."userRaterID") as numberOfRater, u."Userid", u.fullname, u.email FROM public."Rating" r, "Users" u WHERE u."Userid" = r."userRateID" group by r."userRateID", u."Userid", u.fullname;',(error,results) =>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
  }

  const getReviewPerUser = (request, response) => {
    pool.query('  SELECT r."rateID", r."userRaterID", r."userRateID", r."transactionID", r.rate, r.review, r."createdAt", u.email, u.fullname FROM public."Rating" r, "Users" u WHERE u."Userid" = "userRaterID";',(error,results) =>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
  }


module.exports = {

    createRating,
    getRating,
    getRatingPerUser,
    getReviewPerUser

}