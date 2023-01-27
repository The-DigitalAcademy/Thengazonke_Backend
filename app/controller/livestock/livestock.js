const pool = require('../../config/connection');

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

const getLivestock = (req, res) => {
    pool.query('SELECT * FROM "public"."Livestock" ORDER BY "livestockID" ASC ', (error, results) => {
      res.status(200).send(results.rows)
    }),handleErr
}

const getPostedLivestock = (req, res) => {
    pool.query('SELECT d."categoryID", d."categoryName", b."breedName",b."breedID",b.description,l."createdAT",l."UserID",l."livestockID",l.age,l.image,l.price,l.status,l.weight  FROM "Livestock" l, "Category" d, "Breed" b WHERE d."categoryID" = l."categoryID" AND l."breedID" = b."breedID";', (error, results) => {
        res.status(200).send(results)
    }),handleErr
}


const postLivestock = (req, res) => {

    const {UserID, image, price, age, status, weight, categoryID, breedID} = req.body;

    pool.query('INSERT INTO "public"."Livestock"("UserID", image, price, age, status, weight, "categoryID", "breedID") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',  [UserID, image, price, age, status, weight, categoryID, breedID], (error, results) => {
      if (error) {
      }
      res.status(201).send(`Livestock added`)
    })
}


const updateLivestock = (req, res) => {
    const livestockID = req.params.id;
    const { UserID, image, price, age, status, weight, categoryID, breedID }= req.body
  
    pool.query('UPDATE "public"."Category" SET "UserID"=$1, image=$2, price=$3, age=$4, status=$5, weight=$6, "categoryID"=$7, "breedID"=$8 WHERE livestockID=$9 returning *',[UserID, image, price, age, status, weight, categoryID, breedID, livestockID], (error, results) => {
        
          res.status(200).send()
        //response.send(JSON.stringify(results));
        
      }
    )
  }

module.exports = {
    postLivestock,
    getLivestock,
    updateLivestock,
    getPostedLivestock
}