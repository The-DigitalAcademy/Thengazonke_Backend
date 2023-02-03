const pool = require('../../config/connection');

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message })
}

const getNotification = (req, res) => {
    pool.query('SELECT * FROM "public"."notification" ORDER BY "id" ASC ', (error, results) => {
      res.status(200).send(results.rows)
    }),handleErr
}

const createNotification = (req, res) => {
    const {sender_id, recipient_id,type, read} = req.body;
    pool.query('INSERT INTO "public"."Notification"("sender_id", "recipient_id", "type","read")VALUES ($1,$2,$3,$4)',[sender_id, recipient_id,type,read], (error, results) => {
      if (error) {
      }
      res.status(201).send(`Notification created`,results.rows)
    }),handleErr
}


module.exports = {
    createNotification,
    getNotification
}
