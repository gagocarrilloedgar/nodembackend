const db = require("../models");
const Providers = db.Providers;
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
        name: req.body.name,
        // bikepartUuid: req.body.bikepartUuid
    };

    // Save User in the database
    Providers.create(part)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });

};

// Get  all providers
exports.findAll = (req, res) => Providers.findAll().then(allProviders => res.send(allProviders)).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users."
    })
});


// Find a single model with an uuid
exports.findOne = (req, res) => {
    Providers.findOne({
        where: { id: req.params.id },
        include: [{ all: true, nested: true }
        ]
    })
        .then(data => res.send(data))
        .catch(err => console.log(err));
};

// Update a User by the uuid in the request
exports.update = (req, res) => {
    Providers.update(
        {
            name: req.body.name
        },
        { where: { id: req.params.id } }
    )
        .then(data => res.send(data))
        .catch(err => console.log(err));
};

// Delete a User with the specified uuid in the request
exports.delete = (req, res) => {
    Providers.findOne({ where: { id: req.params.id } })
        .then(
            data => {
                data.destroy();
                res.redirect('/api/providers');
            }
        )
        .catch(err => {
            console.log(err)
        })
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
    Providers.destroy(
        { where: {}, force: true }
    )
        .then(res.send({ message: "All providers have been deleted" }))
        .catch(err => {
            console.log(err)
        });
};
