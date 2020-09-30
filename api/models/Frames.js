
module.exports = (sequelize, Sequelize) => {

    const Frames = sequelize.define("frames",
        {
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            name:{
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

    });
    Frames.associate = models => {
        Frames.belongsTo(models.Bikes,
            {
                foreignKey: {
                    allowNull: false,
                    unique: true
                },
                onDelete: 'CASCADE'
            });
            
    }
    return Frames;

}