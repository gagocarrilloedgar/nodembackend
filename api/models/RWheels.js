
module.exports = (sequelize, Sequelize) => {

    const RWheels = sequelize.define("rwheels",
        {
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                defaultValue: "Rear wheel",
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,

            },
            date_of_production: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            image: {
                type: Sequelize.STRING,
            },
        }, {
        paranoid: true,
        underscored: true

    });
    RWheels.associate = models => {
        RWheels.belongsTo(models.Bikes,
            {
                foreignKey: {
                    allowNull: false,
                    unique: true
                }
            });
    }
    return RWheels;

}
