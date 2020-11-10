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
  if (!req.body.longitude || req.body.longitude === null) {
    return res
      .status(400)
      .send({ status: "failure", reason: "longitude is required" });
  }
  if (!req.body.latitude || req.body.latitude === null) {
    return res
      .status(400)
      .send({ status: "failure", reason: "longitude is required" });
  }
  try {
    let obj = {
      driverId: driverId,
      coordinates: [
        parseFloat(req.body.longitude),
        parseFloat(req.body.latitude)
      ] // [22.2475, 14.2547]  [longitude, latitude]
    };
    await locationModel.create(obj);
  } catch (err) {
    return res.status(400).send({ status: "failure", reason: err.message });
  }
  return res.status(202).send({ status: "success" });
}

async function getAvailableCabs(req, res) {
  if (!req.body.longitude || req.body.longitude === null) {
    return res
      .status(400)
      .send({ status: "failure", reason: "longitude is required" });
  }
  if (!req.body.latitude || req.body.latitude === null) {
    return res
      .status(400)
      .send({ status: "failure", reason: "longitude is required" });
  }
  try {
    const listOfCabs = await locationModel.find({
      coordinates: {
        $near: {
          $geometry: {
            coordinates: [
              parseFloat(req.body.longitude),
              parseFloat(req.body.latitude)
            ],
            $maxDistance: 4000
          }
        }
      }
    });
    if (listOfCabs.length) {
      let cabsAvaialable = [{}];
      return res.status(200).send({ available_cabs: cabsAvaialable });
    } else {
      return res.status(200).send({ message: "No cabs available!" });
    }
  } catch (err) {
    console.log("something worng happened!", err.message);
    return res
      .status(400)
      .send({ status: "failure", reason: "something went wrong" });
  }
}

module.exports = {
  getDriverRegistered,
  storeDriverLocation,
  getAvailableCabs
};
