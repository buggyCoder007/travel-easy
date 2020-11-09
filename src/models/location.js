const mongoose = require("mongoose");

/**
 * Driver model schema.
 */
const locationSchema = new mongoose.Schema({
  driverId: { type: String, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true }
});

module.exports = mongoose.model("location", locationSchema);
