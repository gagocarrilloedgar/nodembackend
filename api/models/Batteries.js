
module.exports = (sequelize, Sequelize) => {

    const Batteries = sequelize.define("batteries",
        {
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                defaultValue: "Battery",
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

        },
        {
            paranoid: true,
            underscored: true

        });
    Batteries.associate = models => {
        Batteries.belongsTo(models.Bikes,
            {
                foreignKey: {
                    allowNull: false,
                    unique: true
                }
            });
    }
    return Batteries;

}

