module.exports = (sequelize, Sequelize) => {

    const Models = sequelize.define("models",
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
    Models.associate = models => {
        Models.hasMany(models.Bikes,
            {
                foreignKey: {
                    allowNull: false
                }
            });
    }
    
    
    return Models;
}
