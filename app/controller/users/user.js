const pool = require('../../config/connection');

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

const getUsers = (req, res) => {
    pool.query('SELECT * FROM public."Users" ORDER BY "Userid" ASC ', (error, results) => {
      res.status(200).send(results.rows)
    }),handleErr
}




const postUsers = (req, res) => {   

    const { fullname, email, password ,phone ,address ,status, usertype} = req.body;

    pool.query('INSERT INTO public."Users" (fullname, email, password, phone, address, status, usertype) VALUES ($1, $2, $3, $4, $5,$6,$7)',  [fullname, email, password, phone, address, status, usertype], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with ID: ${results.insertId}`)
    })
}

const updateUser = (req, res) => {

    const Userid = req.params.id;
    const { fullname, email, phone ,address ,status, usertype } = req.body
  
    pool.query('UPDATE "public"."Users" SET fullname=$1, email=$2, phone=$3, address=$4, status=$5, usertype=$6 WHERE "Userid" = $7;',[fullname, email, phone ,address ,status, usertype, Userid], (error, results) => {
        
          res.status(200).send()
        //response.send(JSON.stringify(results));
        
      }
    )
  }

module.exports = {
    getUsers,
    postUsers,
    updateUser
  }