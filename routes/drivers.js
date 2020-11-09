var express = require("express");
var router = express.Router();
let helper = require("../src/driver/driver-helper");

/* GET/POST driver listing. */
router.post("/register", async function(req, res, next) {
  let driverInfo = await helper.getDriverRegistered(req.body, res);
  res.status(200).send(driverInfo);
});

module.exports = router;
