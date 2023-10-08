const mongoose = require("mongoose");

const ipSchema = new mongoose.Schema({
  urlId: {
    type: String,
    required: true,
    unique: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  generatedUrl: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: false,
  },
  latitude: {
    type: Number,
    required: false,
  },
  longitude: {
    type: Number,
    required: false,
  },
  captureAt: {
    type: Date,
    required: false,
  },
});

const Ip = mongoose.model("Ip", ipSchema);

module.exports = Ip;
