var express = require("express");
var router = express.Router();
let helper = require("../src/driver/driver-helper");

/* GET/POST driver listing. */
router.post("/register", function(req, res, next) {
  helper.getDriverRegistered(req.body, res);
});

router.post("/:id/sendLocation", function(req,res,next){
  helper.storeDriverLocation(req,res);
})

module.exports = router;
