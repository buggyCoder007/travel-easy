var express = require("express");
var router = express.Router();
let helper = require("../src/driver/driver-helper");

/* GET/POST driver listing. */
router.post("/register", function(req, res, next) {
  helper.getDriverRegistered(req.body, res);
});

module.exports = router;
