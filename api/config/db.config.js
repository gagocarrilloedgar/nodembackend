require('dotenv').config()
module.exports.production = {
    host: process.env.HOST,
    user: process.env.USER ,
    password: process.env.PSSWD,
    database: process.env.DB,
    dialect: process.env.DIALECT,
    port: process.env.PGPORT,
    SSL: true,
    pool: {
        max: 1,
        min: 1,
        idel: 10000// maximum time, in milliseconds, that a connection can be idle before being released
    }
};

module.exports.host = {
    host: "localhost",
    user: "postgres",
    password: "Ed99Ga99.",
    database: "nodempgtest",
    port: 5432,
    dialect: 'postgres'
};


