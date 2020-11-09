const driverModel = require("../models/driver");
const locationModel = require("../models/location");
const dbHandler = require("../db/db-handler");
let driverId;

async function getDriverRegistered(req, res) {
  let registeredDriver;
  if (req.phone_number && req.phone_number.toString().length !== 10) {
    return res
      .status(400)
      .send({ status: "failure", reason: "Phone number should be 110 digit" });
  }
  try {
    registeredDriver = await driverModel.create(req);
  } catch (err) {
    return res.status(400).send({ status: "failure", reason: err.message });
  }
  driverId = registeredDriver._id;
  return res.status(201).send(registeredDriver);
}

async function storeDriverLocation(req, res) {
  try {
    await locationModel.create({
      driverId: driverId,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    });
  } catch (err) {
    return res.status(400).send({ status: "failure", reason: err.message });
  }
  return res.status(202).send({ status: "success" });
}

module.exports = {
  getDriverRegistered,
  storeDriverLocation
};
