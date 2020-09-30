module.exports = (sequelize, Sequelize) => {

    const Records = sequelize.define("records",
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            part: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            types: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        }, {
        paranoid: true,
        underscored: true


    });

    Records.associate = models => {
        Records.belongsTo(models.Users,
            {
                foreignKey: { allowNull: true}
            });
        Records.belongsTo(models.Bikes,
            {
                foreignKey: { allowNull: true }
            });
    }
    return Records;
}