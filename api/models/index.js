'use strict'

const { production, host } = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(production.database, production.user, production.password, {
    host: production.host,
    dialect: production.dialect,
    dialectOptions: {
        encrypt: true,

        ssl: {
            "require": false
        }
    },///uncomment for Azure db connection
    pool: {
        max: production.pool.max,
        min: production.pool.min,
        idle: production.idle,
    },
});

/*const sequelize = new Sequelize(host.database, host.user, host.password, {
    host: host.host,
    dialect: host.dialect,
});*/

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// adding the models to the db
db.Records = require("./Records.js")(sequelize, Sequelize);
db.Providers = require("./Providers.js")(sequelize, Sequelize);
db.States = require("./States.js")(sequelize, Sequelize);
db.Warranties = require("./Warranties.js")(sequelize, Sequelize);
db.Brands = require("./Brands.js")(sequelize, Sequelize);
db.Models = require("./Models.js")(sequelize, Sequelize);
db.RWheels = require("./RWheels.js")(sequelize, Sequelize);
db.FWheels = require("./FWheels.js")(sequelize, Sequelize);
db.Forks = require("./Forks.js")(sequelize, Sequelize);
db.Motors = require("./Motors.js")(sequelize, Sequelize);
db.Batteries = require("./Batteries.js")(sequelize, Sequelize);
db.Frames = require("./Frames.js")(sequelize, Sequelize);
//db.Bikeparts = require("./Bikeparts.js")(sequelize, Sequelize);
db.Bikes = require("./Bikes.js")(sequelize, Sequelize);
db.Users = require("./Users.js")(sequelize, Sequelize);


Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.Bikes.sync();
module.exports = db;