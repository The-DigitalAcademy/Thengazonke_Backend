const express = require('express');
const bodyParser = require('body-parser')
const pg = require('pg');
const app = express();
const routes = require('./app/routes/router');
require('dotenv').config()


// postgres://djaklifj:DKwTKeY5SZFs8uQ58NDgxxehI16YOAuu@ruby.db.elephantsql.com/djaklifj
const config = {
    user: process.env.DB_USENAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_POST,
    max: process.env.DB_CLIENT_MAX, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
const cors = require('cors');

var corsOptions = {
    Access_Control_Allow_Origin: "*",
    origin:"*",
    methode:['GET','POST','PATCH','DELETE','PUT'],
    allowedHeaders:'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}
app.use(cors(corsOptions));
console.log(process.env.DB_IDLETIMEOUTMILLIS);

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const pool = new pg.Pool(config);

app.get('/', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        client.query('SELECT NOW()', (err, result) => {
            done();
            if (err) {
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            return res.status(200).json({ success: true, data: result });
        });
    });
});

app.use('/', routes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
