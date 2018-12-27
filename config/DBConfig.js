const mysql = require('mysql');

// module.exports = mysql.createPool({
//    connectionLimit : 100,
//    host : 'db4free.net',
//    user :  'rapidqube',
//    password: 'root1234',
//    database: 'mysaned'
// })

module.exports = mysql.createPool({
   connectionLimit : 100,
   host : '127.0.0.1',
   user :  'root',
   password: 'Rpqb$2018',
   database: 'SHARJAH'
})
