const pool = require("../../config/connection");

const handleErr = (err, req, res, next) => {
  res.status(400).send({ error: err.message });
};

const getNotification = (req, res) => {
  pool.query(
    'SELECT * FROM "public"."notifications" ORDER BY "id" ASC ',
    (error, results) => {
      res.status(200).send(results.rows);
    }
  ),
    handleErr;
};

const createNotification = (req, res) => {
  const { sender_id, recipient_id, type, read, deleted , content } = req.body;


  pool.query(
    'INSERT INTO "public"."notifications"("sender_id", "recipient_id", "type","read" ,"deleted")VALUES ($1,$2,$3,$4,$5,$6)',
    [sender_id, recipient_id, content , type, read ,deleted],
    (error, results) => {
      if (error) {
      }
      res.status(201).send(`Notification created successfully`);
     
    }
  ),
    handleErr;
};

const update_read_Notification = (request, response) => {
  const id = parseInt(request.params.id)
  const { read } = req.body;

  pool.query('UPDATE public."notifications" SET "read"=$1;',[read],(error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Notification read successfully with ID: ${id}`)
    }
  )
}


const delete_Notification = (request, response) => {
  const id = parseInt(request.params.id)
  const { deleted } = req.body;

  pool.query('UPDATE public."notifications" SET "read"=$1;',[deleted],(error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Notification read successfully with ID: ${id}`)
    }
  )
}

module.exports = {
  createNotification,
  getNotification,
};
