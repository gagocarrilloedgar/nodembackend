module.exports = (sequelize, Sequelize) => {

    const Brands = sequelize.define("brands",
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
        paranoid: true,
        underscored: true

    });
    Brands.associate = models => {
        Brands.hasMany(models.Models,
            {
                foreignKey: {
                    allowNull: false
                }
            });
    }
    return Brands;
}