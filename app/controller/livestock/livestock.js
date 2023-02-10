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
    pool.query('SELECT d."categoryID", d."categoryName", b."breedName",b."breedID",l.description,l."createdAT",l."UserID",l."livestockID",l.age,l.image,l.price,l.status,l.weight, l.address,l.quantity,l.color,l.gender  FROM "Livestock" l, "Category" d, "Breed" b WHERE d."categoryID" = l."categoryID" AND l."breedID" = b."breedID";', (error, results) => {
        res.status(200).send(results.rows)
    }),handleErr
}

const getPostedLivestockByUser = (req, res) => {
    pool.query('SELECT d."categoryID", d."categoryName", b."breedName",b."breedID",b.description,l."createdAT",l."UserID",l."livestockID",l.age,l.image,l.price,l.status,l.weight, u.address, u.email,u.fullname,u.phone,u.usertype FROM "Livestock" l, "Category" d, "Breed" b,"Users" u WHERE d."categoryID" = l."categoryID" AND l."breedID" = b."breedID" AND l."UserID" = u."Userid";', (error, results) => {
        res.status(200).send(results.rows)
    }),handleErr
}

const postLivestock = (req, res) => {

    // const {UserID, image, price, age, status, weight, categoryID, breedID,} = req.body;
    const {UserID, image, price, age, status, weight, categoryID, breedID, description, color, quantity, address, gender}  = req.body

    pool.query('INSERT INTO "public"."Livestock"("UserID", image, price, age, status, weight, "categoryID", "breedID", description, color, quantity, address, gender) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13 )',  [UserID, image, price, age, status, weight, categoryID, breedID, description, color, quantity, address, gender], (error, results) => {
      if (error) {
      }
      res.status(201).send(`Livestock added`)
    })
}

const updateLivestock = (request, response) => {
  const id = parseInt(request.params.id)
  const {UserID, image, price, age, status, weight, categoryID, breedID, description, color, quantity, address,gender}  = request.body

  pool.query('UPDATE public."Livestock" SET "UserID"=$1, image=$2, price=$3, age=$4, status=$5, weight=$6,"categoryID"=$7, "breedID"=$8, description=$9, color=$10, quantity=$11, address=$12 gender=$13 WHERE "livestockID" =$14;',[UserID, image, price, age, status, weight, categoryID, breedID, description, color, quantity, address,gender, id],(error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Livestock modified with ID: ${id}`)
    }
  )
}

const deleteLivestock= (req, res) => {

  const id = req.params.id;
  const { status } = req.body

  pool.query('UPDATE "public"."Livestock" SET status=$1 WHERE "livestockID" = $2;',[status,id], (error, results) => {

        console.log('Backend status',status)
        console.log(id)
        res.status(200).send('transaction archived')
      //response.send(JSON.stringify(results));

    }
  )
}

module.exports = {
    postLivestock,
    getLivestock,
    updateLivestock,
    getPostedLivestock,
    getPostedLivestockByUser,
    deleteLivestock
}