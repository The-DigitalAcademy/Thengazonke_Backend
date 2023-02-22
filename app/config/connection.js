const Pool = require('pg').Pool
const pool = new Pool({
  // user: 'postgres',
  //   database: 'thengazonkeDB',
  //   password: 'Letsdoit!',
  //   host: 'localhost',

    user: 'djaklifj',
  database: 'djaklifj',
  password: 'DKwTKeY5SZFs8uQ58NDgxxehI16YOAuu',
  host: 'ruby.db.elephantsql.com',
  
    port: 5432,
//   max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
})

module.exports = pool
