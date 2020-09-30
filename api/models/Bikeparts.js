
module.exports = (sequelize, Sequelize) => {

    const Bikeparts = sequelize.define("bikeparts",
        {
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            }
        }, {
        paranoid: true,
        underscored: true

    });

    /*Bikeparts.associate = models => {
        Bikeparts.belongsTo(models.Bikes,
            {
                foreignKey: {
                    allowNull: false,
                    constraints: true
                }
            });
        Bikeparts.hasOne(models.Frames,
            {
                onDelete: "cascade"
            });
        Bikeparts.hasOne(models.Forks,
            {
                onDelete: "cascade"
            });
        Bikeparts.hasOne(models.FWheels,
            {
                onDelete: "cascade"
            });
        Bikeparts.hasOne(models.RWheels,
            {
                onDelete: "cascade"
            });
        Bikeparts.hasOne(models.Motors,
            {
                onDelete: "cascade"
            });
        Bikeparts.hasOne(models.Batteries,
            {
                onDelete: "cascade"
            });
    };*/

    return Bikeparts;

}
