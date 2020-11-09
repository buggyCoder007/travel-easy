const helper = require("../helper/common-helper");
const driverMdodel = require("../models/driver");
const dbHandler = require("../db/db-handler");

async function getDriverRegistered(req, res) {
  let mandatoryFields = [
    "name",
    "email",
    "phone_number",
    "license_number",
    "car_number"
  ];

  const isAllFieldsNotAvailable = helper.checkMandatoryFields(
    req,
    mandatoryFields
  );
  if (isAllFieldsNotAvailable.length) {
    res
      .status(400)
      .send(
        `Please check following fields are passed correctly in the request, ${isAllFieldsNotAvailable} .`
      );
  }

  let registeredDriver;
  try {
    registeredDriver = await driverMdodel.create(req);
  } catch (err) {
    res.status(400).send(err.message);
  }
  return registeredDriver;
}

module.exports = {
  getDriverRegistered
};
