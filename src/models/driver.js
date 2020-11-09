const mongoose = require("mongoose");

/**
 * Driver model schema.
 */
const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_number: {
    type: Number,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10
  },
  license_number: { type: String, required: true, unique: true },
  car_number: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("driver", driverSchema);
