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

    const {categoryID, breedName} = req.body;

    pool.query('INSERT INTO "public"."Breed"("categoryID", "breedName")VALUES ($1,$2)',[categoryID,breedName], (error, results) => {
      if (error) {
      }
      res.status(201).send(`Breed added`)
    }),handleErr
}

//update breed
const updateBreed= (req, res) => {


    const id=parseInt(req.params.id)
    const {breedName,categoryID} = req.body; 

    var breed={

      "breedName":breedName,
      "categoryID":categoryID
    
   
  }
   pool.query(' UPDATE public."Breed" SET "categoryID"=$1, "breedName"=$2 WHERE  breedID = $3;',[breed,id], function (error, results, fields) 
    {
         if(error){
          res.send('data not sent')

         }else{
          res.send(' breed Updated succesfully!')
         }

    })
  }

  //delete breed

  const removeBreed = (req, res) => {
    
    
    {
    const id=parseInt(req.params.id)
            
           con.query('DELETE FROM public."Breed" WHERE  breedID = $1;',[id], function (error, results, fields) 

            {
                 if(error){
                  res.send('not deleted')
    
                 }else{
                  res.send(results)
                 }
    
            })
       
  }}
    
  //get all breed
  const breed = (req, res) => {
    
    {
            
           pool.query('SELECT "breedID", "categoryID", "breedName", "createdAt" FROM public."Breed"', function (error, results) 

            {
                 if(error){
                  res.send('data not found')
    
                 }else{
                  res.send(results.rows)
                 }
    
            })
            
          }}

module.exports = {
    postBreed,
    updateBreed,
    removeBreed,
    breed
}