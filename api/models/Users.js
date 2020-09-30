
module.exports = (sequelize, Sequelize) => {

    const Users = sequelize.define("user",
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

            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            user_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            id_doc: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            phone: {
                type: Sequelize.STRING,
            },
            is_verified: {
                type: Sequelize.BOOLEAN,
            },
        }, {
        paranoid: true,
        underscored: true

    });

    Users.associate = models => {
        Users.hasMany(models.Bikes,
            {
                onDelete: "CASCADE"
            });
        Users.hasMany(models.Records,
            {
                onDelete: "CASCADE"
            });
    };

    return Users;
}