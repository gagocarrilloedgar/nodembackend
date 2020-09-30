module.exports = (sequelize, Sequelize) => {

    const FWheels = sequelize.define("fwheels",
        {
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                defaultValue: "Front wheel",
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
    FWheels.associate = models => {
        FWheels.belongsTo(models.Bikes,
            {
                foreignKey: {
                    allowNull: false,
                    unique:true
                }
            });
    }
    return FWheels;
}