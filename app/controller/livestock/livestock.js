const pool = require('../../config/connection');

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

const getLivestock = (req, res) => {
    pool.query('SELECT * FROM "public"."Livestock" ORDER BY "livestockID" ASC ', (error, results) => {
      res.status(200).send(results.rows)
    }),handleErr
}


const postLivestock = (req, res) => {

    const {UserID, image, price, age, status, weight, categoryID} = req.body;

    pool.query('INSERT INTO "public"."Livestock"("UserID", image, price, age, status, weight, "categoryID") VALUES ($1, $2, $3, $4, $5, $6, $7)',  [UserID, image, price, age, status, weight, categoryID], (error, results) => {
      if (error) {
      }
      res.status(201).send(`Livestock added`)
    })
}


const updateLivestock = (req, res) => {
    const categoryID = req.params.id;
    const categoryName = req.body
  
    pool.query('UPDATE "public"."Category" SET "categoryName"=$1 returning *',[categoryName, categoryID], (error, results) => {
        
          response.status(200).send()
        //response.send(JSON.stringify(results));
        
      }
    )
  }

module.exports = {
    postLivestock,
    getLivestock,
    updateLivestock
}