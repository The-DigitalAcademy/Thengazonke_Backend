const pool = require('../../config/connection');

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

// const getCategory = (req, res) => {
//     pool.query('SELECT * FROM public."Users" ORDER BY "Userid" ASC ', (error, results) => {
//       res.status(200).send(results.rows)
//     }),handleErr
// }


const postCategory = (req, res) => {

    const {categoryName} = req.body;

    pool.query('INSERT INTO "public"."Category" ("categoryName") VALUES ($1)',  [categoryName], (error, results) => {
      if (error) {
      }
      res.status(201).send(`categoryName added`)
    })
}





module.exports = {
    postCategory,
}