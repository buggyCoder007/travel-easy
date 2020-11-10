const mongoose = require("mongoose");

/**
 * Driver model schema.
 */
let locationSchema = new mongoose.Schema({
  driverId: { type: String, required: true },
  coordinates: {
    type: Array
  }
});

locationSchema.index({ coordinates: "2d" }, { background: false });
module.exports = mongoose.model("location", locationSchema);
