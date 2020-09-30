module.exports = (sequelize, Sequelize) => {

    const Forks = sequelize.define("forks",
        {
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
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
    Forks.associate = models => {
        Forks.belongsTo(models.Bikes,
            {
                foreignKey: { 
                    allowNull: false,
                    unique: true,
                }
            });
            
        }
    return Forks;
}