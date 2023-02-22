const express = require('express');
const bodyParser = require('body-parser')
const pg = require('pg');
const app = express();
const routes = require('./app/routes/router');


//postgres://djaklifj:DKwTKeY5SZFs8uQ58NDgxxehI16YOAuu@ruby.db.elephantsql.com/djaklifj
const config = {
    user: 'djaklifj',
    database: 'djaklifj',
    password: 'DKwTKeY5SZFs8uQ58NDgxxehI16YOAuu',
    host: 'ruby.db.elephantsql.com',
    port: 5432,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

// const config = {
//     user: 'postgres',
//     database: 'thengazonkeDB',
//     password: 'Letsdoit!',
//     host: 'localhost://',
//     port: 5432,
//     max: 10, // max number of clients in the pool
//     idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
// };

const cors = require('cors');

var corsOptions = {
    Access_Control_Allow_Origin: "*",
    origin:"*",
    methode:['GET','POST','PATCH','DELETE','PUT'],
    allowedHeaders:'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}
app.use(cors(corsOptions));


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
