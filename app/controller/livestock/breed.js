const pool = require('../../config/connection');

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

// const getCategory = (req, res) => {
//     pool.query('SELECT * FROM public."Users" ORDER BY "Userid" ASC ', (error, results) => {
//       res.status(200).send(results.rows)
//     }),handleErr
// }


const postBreed = (req, res) => {

    const {categoryID, breedName, description} = req.body;

    pool.query('INSERT INTO "public"."Breed"("categoryID", "breedName","description")VALUES ($1,$2,$3)',[categoryID,breedName,description], (error, results) => {
      if (error) {
      }
      res.status(201).send(`Breed added`)
    }),handleErr
}

//update breed
const updateBreed = (request, response) => {
    const id = parseInt(request.params.id)
    const { categoryID, breedName, description } = request.body
  
    pool.query(
      'UPDATE "public"."Breed" SET  "categoryID"= $1, "breedName" = $2 , "description"=$3 WHERE "breedID" = $4',
      [categoryID, breedName,description, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Breed modified with ID: ${id}`)
      }
    )
  }

  //delete breed
    
const removeBreed = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM "public"."Breed" WHERE "breedID" = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Breed deleted with ID: ${id}`)
    })
  }

  //get all breed
  const breed = (req, res) => {
    
    {
            
           pool.query('SELECT "breedID", "categoryID", "breedName", "description","createdAt" FROM "public"."Breed"', function (error, results) 

            {
                 if(error){
                  res.send('data not found')
    
                 }else{
                  res.send(results.rows)
                 }
    
            })
            
          }}
//get breed by id
          const getBreedById = (request, response) => {
            const id = parseInt(request.params.id)
          
            pool.query('SELECT * FROM "public"."Breed" WHERE "breedID" = $1', [id], (error, results) => {
              if (error) {
                throw error
              }
              response.status(200).json(results.rows)
            })
          }

module.exports = {
    postBreed,
    updateBreed,
    removeBreed,
    breed,
    getBreedById
}