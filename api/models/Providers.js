module.exports = (sequelize, Sequelize) => {

    const Providers = sequelize.define("providers",
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,

            },
        }, {
        paranoid: true,
        underscored: true

    });

    Providers.associate = models => {
        Providers.hasMany(models.Forks);
        /*Providers.belongsTo(models.Bikeparts,
            {
                foreignKey: {
                    allowNull: false
                }
            });*/
        Providers.hasMany(models.Frames);
        Providers.hasMany(models.FWheels);
        Providers.hasMany(models.Motors);
        Providers.hasMany(models.RWheels);
        Providers.hasMany(models.Batteries);
    }
    return Providers;

}
