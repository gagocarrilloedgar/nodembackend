const db = require("../models");
const Batteries = db.Batteries;
const Op = db.Sequelize.Op;
const Records = db.Records;

//Create and Save a new User
exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a User
    const part = {
        name: req.body.name,
        price: req.body.price,
        date_of_production: req.body.date_of_production,
        image: req.body.image,
        providerId: req.body.providerId,
        stateId: req.body.stateId,
        bikeUuid: req.body.bikeUuid
    };

    // Save User in the database
    Batteries.create(part)
        .then(data => {
            res.send(data);
            Records.create({
                description: 'New',
                part: data.uuid,
                types: 'Battery',
                bikeUuid: data.bikeUuid,
                userUuid: data.userUuid
            })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });

};

// Retrieve all Users from the database.
exports.getMotor = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    Batteries.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
};

// Find a single battery with an uuid
exports.findOne = (req, res) => {
    Batteries.findOne({
        where: { uuid: req.params.uuid }
    })
        .then(data => res.send(data))
        .catch(err => console.log(err));
};

// Update a User by the uuid in the request
exports.update = (req, res) => {
    Batteries.update(
        {
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            providerId: req.body.providerId,
            stateId: req.body.stateId,
            bikeUuid: req.body.bikeUuid
        },
        {
            where: { uuid: req.params.uuid },
            returning: true,
            plain: true
        }
    )
        .then(data => {
            res.send(data)
            Records.create({
                description: 'Update',
                part: data[1].uuid,
                types: 'Battery',
                bikeUuid: data[1].bikeUuid,
                userUuid: data[1].userUuid
            })
        })
        .catch(err => console.log(err));
};

// Delete a User with the specified uuid in the request
exports.delete = (req, res) => {
    Batteries.findOne({ where: { uuid: req.params.uuid }, force: true })
        .then(
            data => {
                data.destroy();
                Records.create({
                    description: 'Delete',
                    part: data.uuid,
                    types: 'Battery',
                    bikeUuid: data.bikeUuid,
                    userUuid: data.userUuid
                })
                res.redirect('/api/getbikes');
            }
        )
        .catch(err => {
            console.log(err)
        })
};


