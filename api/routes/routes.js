
const users = require("../controller/usercontroller");
const bikes = require("../controller/bikecontroller");
const bikeparts = require("../controller/bikepartscontroller");
const frame = require("../controller/framecontroller");
const fork = require("../controller/forkcontroller");
const battery = require("../controller/batterycontroller");
const fwheel = require("../controller/fwheelcontroller");
const rwheel = require("../controller/rwheelcontroller");
const motor = require("../controller/motorcontroller");
const warranty = require("../controller/warrantycontroller");
const brand = require("../controller/brandcontroller");
const model = require("../controller/modelcontroller");
const state = require("../controller/statecontroller");
const provider = require("../controller/providercontroller");
const records = require("../controller/recordscontroller");

var router = require("express").Router();

// Create methods
router.post("/newuser", users.create);
router.post("/newbike", bikes.create);
router.post("/newbikeparts", bikeparts.create);
router.post("/newframe", frame.create);
router.post("/newfork", fork.create);
router.post("/newbattery", battery.create);
router.post("/newfwheel", fwheel.create);
router.post("/newrwheel", rwheel.create);
router.post("/newmotor", motor.create);
router.post("/newwarranty", warranty.create);
router.post("/newbrand", brand.create);
router.post("/newmodel", model.create);
router.post("/newstate", state.create);
router.post("/newprovider", provider.create);


// Retrieve Methdods
router.get("/getonlyusers", users.findAll); // this one only retrieve the users without the nestes models 
router.get("/getusers", users.getUsers); // all users with include all
router.get("/users/findone/:uuid", users.findOne);
router.get("/bikes/findone/:uuid", bikes.findOne);


router.get("/bikes", bikes.findAll);
router.get("/getbikes", bikes.getBikes);
router.get("/getbikeparts", bikeparts.getBikeparts);
router.get("/frame", frame.getFrame);

// getByUUUID
router.get('/frame/findone/:uuid', frame.findOne);
router.get('/fork/findone/:uuid', fork.findOne);
router.get('/battery/findone/:uuid', battery.findOne);
router.get('/fwheel/findone/:uuid', fwheel.findOne);
router.get('/rwheel/findone/:uuid', rwheel.findOne);
router.get('/motor/findone/:uuid', motor.findOne);

//router.get("/getbikeparts", bikeparts.getBikeparts);
router.get("/frame", frame.getFrame);
router.get("/forks", fork.getFork);
router.get("/brands", brand.getBrands);
router.get("/providers", provider.findAll);
router.get("/states", state.findAll);
router.get("/warranties", warranty.findAll);
//
router.get('/test', (req, res) => res.send("tet"));
router.get("/brands", brand.getBrands);
router.get("/providers", provider.findAll);
router.get("/states", state.findAll);
router.get("/warranties", warranty.findAll);

router.get('/bikesbystate/:stateId', bikes.getByState);


// Delete
router.delete('/users/delete/:uuid', users.delete);
router.delete('/bikes/delete/:uuid', bikes.delete);
router.delete('/brand/delete/:id', brand.delete);
router.delete('/model/delete/:id', model.delete);
router.delete('/provider/delete/:id', provider.delete);
router.delete('/warranty/delete/:uuid', warranty.delete);
router.delete('/frame/delete/:uuid', frame.delete);
router.delete('/fork/delete/:uuid', fork.delete);
router.delete('/battery/delete/:uuid', battery.delete);
router.delete('/fwheel/delete/:uuid', fwheel.delete);
router.delete('/rwheel/delete/:uuid', rwheel.delete);
router.delete('/motor/delete/:uuid', motor.delete);
router.delete('/state/delete/:id', state.delete);

// DeleteAll
router.delete('/users/deleteall', users.deleteAll);
router.delete('/bikes/deleteall', bikes.deleteAll);
router.delete('/brands/deleteall', brand.deleteAll);
router.delete('/provider/deleteall', provider.deleteAll);
router.delete('/states/deleteall', state.deleteAll);

// Update
router.put('/users/update/:uuid', users.update);
router.put('/bikes/update/:uuid', bikes.update);
router.put('/frame/update/:uuid', frame.update);
router.put('/fork/update/:uuid', fork.update);
router.put('/battery/update/:uuid', battery.update);
router.put('/fwheel/update/:uuid', fwheel.update);
router.put('/rwheel/update/:uuid', rwheel.update);
router.put('/motor/update/:uuid', motor.update);
router.put('/brand/update/:id', brand.update);
router.put('/model/update/:id', model.update);
router.put('/state/update/:id', state.update);
router.put('/provider/update/:id', provider.update);


router.get('/test', (req, res) => res.send("tet"));
// Login
router.post('/login', users.login);

//Records
router.post("/newrecord",records.create);
router.get("/getrecords", records.getRecords);
router.get("/getrecordsbyuserid/:userUuid", records.getRecordsByUserUUID);


module.exports = router;