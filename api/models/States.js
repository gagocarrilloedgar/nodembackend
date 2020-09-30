module.exports = (sequelize, Sequelize) => {

    const States = sequelize.define("states",
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
                
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
        }, {
    });
    States.associate = models => {
        States.hasMany(models.Frames);
        States.hasMany(models.Forks);
        States.hasMany(models.FWheels);
        States.hasMany(models.Motors);
        States.hasMany(models.RWheels);
        States.hasMany(models.Batteries);
        States.hasMany(models.Bikes);
    }

    return States;
}