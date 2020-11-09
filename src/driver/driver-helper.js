const driverModel = require("../models/driver");
const dbHandler = require("../db/db-handler");

async function getDriverRegistered(req, res) {
  console.log("req>>>>>>", req);
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
  return res.status(201).send(registeredDriver);
}

module.exports = {
  getDriverRegistered
};
