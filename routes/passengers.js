const express = require('express');
const router = express.Router();
const helper = require('../src/driver/driver-helper')

/* GET/POST passengers listing. */
router.post("/available_cabs/", function(req,res,next){
  helper.getAvailableCabs(req,res);
})
module.exports = router;
