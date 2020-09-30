module.exports = (sequelize, Sequelize) => {

    const Warranties = sequelize.define("warranties",
        {
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
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
    Warranties.associate = models => {
        Warranties.belongsTo(models.Bikes,
            {
                foreignKey: {
                    allowNull: false,
                    unique: true
                }
            });
    };
    return Warranties;

}
