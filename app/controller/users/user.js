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

    // const fullname = req.body.fullname;
    // const email = req.body.email;
    // const password = req.body.password;
    // const phone= req.body.phone;
    // const address= req.body.address;
    // const status= req.body.status;
    // const usertype = req.body.usertype;

   

    const { fullname, email, password ,phone ,address ,status, usertype} = req.body;

    pool.query('INSERT INTO public."Users" (fullname, email, password, phone, address, status, usertype) VALUES ($1, $2, $3, $4, $5,$6,$7)',  [fullname, email, password, phone, address, status, usertype], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with ID: ${results.insertId}`)
    })
}

module.exports = {
    getUsers,
    postUsers,
  }