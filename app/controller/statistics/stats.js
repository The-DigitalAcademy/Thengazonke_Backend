const { request, response } = require('express')
const pool = require('../../config/connection')


const registeredUserperMonth = (request, response)=>{

    pool.query(`SELECT DATE_TRUNC('month',"createdAt") AS  registered_month, COUNT("Userid") AS count FROM "Users" GROUP BY DATE_TRUNC('month',"createdAt");`,(error,results)=>{
        if (error) {
            throw error
          }
          response.status(200).send(results.rows)
    })
}


const getLivestock = (req, res) => {
    pool.query('SELECT * FROM "public"."Livestock" ORDER BY "livestockID" ASC ', (error, results) => {
      res.status(200).send(results.rows)
    }),handleErr
}




module.exports = {
    registeredUserperMonth
}