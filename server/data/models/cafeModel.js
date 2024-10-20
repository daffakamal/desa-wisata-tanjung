const mongoose = require('mongoose');

const cafeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  gambar: {
    type: String,
    required: true,
  },
  menu: {
    type: String,
    required: true,
  },
  harga: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('cafe', cafeSchema);
