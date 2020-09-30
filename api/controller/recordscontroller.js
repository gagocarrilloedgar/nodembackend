const db = require("../models");
const Records = db.Records;
const Op = db.Sequelize.Op;

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
        description: req.body.description,
        part: req.body.part,
        types: req.body.types,
        bikeUuid: req.body.bikeUuid,
        userUuid: req.body.userUuid
    }

    // Save User in the database
    Records.create(part)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });

};

exports.getRecords = (req, res) => Records.findAll({ include: [{ all: true, nested: true }] }).then(allRecords => res.send(allRecords)).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users."
    })
});


exports.getRecordsByUserUUID = (req, res) => {
    Records.findOne({
        where: {
            userUuid: req.params.userUuid
        },
        include:
            [{ all: true, nested: true }
            ]
    }).then(record => {
        if (record) {
            res.status(200).send(record);
            //print(user.body);
        } else {
            res.status(404).send({
                message: " Error while trying to login a user"
            });
        }
    });
}
// Delete a Bike with the specified uuid in the request
exports.delete = (req, res) => {
    Records.findOne({ where: { part: req.params.part }, force: true })
        .then(
            data => {
                data.destroy();
                res.redirect('/api/records');
            }
        )
        .catch(err => {
            console.log(err)
        })
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
    Records.destroy(
        { where: {}, force: true }
    )
        .then(res.send({ message: "All records have been deleted" }))
        .catch(err => {
            console.log(err)
        });
};