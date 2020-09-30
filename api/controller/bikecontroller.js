const db = require("../models");
const Bikes = db.Bikes;
const Op = db.Sequelize.Op;
const Records = db.Records;

//Create and Save a new bike
exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Bike
    const bike = {
        frameid: req.body.frameid,
        name: req.body.name,
        userUuid: req.body.userUuid,
        modelId: req.body.modelId,
        stateId: req.body.stateId,
    };

    // Save Bike in the database
    Bikes.create(bike)
        .then(data => {
            res.status(200).send(data);
            Records.create({
                description: 'New',
                part: data.uuid,
                types: 'Bikes',
                bikeUuid: data.uuid,
                userUuid: data.userUuid
            })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the bike."
            });
        });

};

// Get only bikes without the relations
exports.findAll = (req, res) => Bikes.findAll().then(allBikes => res.send(allBikes)).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users."
    })
});

exports.getBikes = (req, res) => Bikes.findAll({
    include: [
        { all: true, nested: true }
    ]
}
).then(allBikes => res.send(allBikes));

// Find a single bike with an uuid
exports.findOne = (req, res) => {
    Bikes.findOne({
        where: { uuid: req.params.uuid }
    })
        .then(data => res.send(data))
        .catch(err => console.log(err));
};

// Get bikes by state
exports.getByState = (req, res) => {
    Bikes.findAll({ where: { stateId: req.params.stateId } })
        .then(data => res.status(200).send(data))
        .catch(
            err => console.error(err)
        );
}

// Update a User by the uuid in the request
exports.update = (req, res) => {
    Bikes.update(
        {
            frameid: req.body.frameid,
            name: req.body.name,
            userUuid: req.body.userUuid,
            modelId: req.body.modelId,
            stateId: req.body.stateId,
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
                types: 'Bikes',
                bikeUuid: data[1].uuid,
                userUuid: data[1].userUuid
            })
        })
        .catch(err => console.log(err));
};

// Delete a Bike with the specified uuid in the request
exports.delete = (req, res) => {
    Bikes.findOne({ where: { uuid: req.params.uuid }, force: true })
        .then(
            data => {
                data.destroy();
                Records.create({
                    description: 'Delete',
                    part: data.uuid,
                    types: 'Bikes',
                    bikeUuid: data.uuid,
                    userUuid: data.userUuid
                })
                res.redirect('/api/bikes');
            }
        )
        .catch(err => {
            console.log(err)
        })
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
    Bikes.destroy(
        {
            where: {},
            force: true
        })
        .then(res.send({ message: "All bikes have been deleted" }))
        .catch(err => {
            console.log(err)
        });
};

