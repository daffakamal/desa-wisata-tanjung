const mongoose = require('mongoose');

const cafeSchema = new mongoose.Schema({
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
  kategori: {
    type: String,
    enum: ['Kopi', 'Non Kopi', 'Teh', 'Jamu'],
    required: true,
  },
  cloudinary_id: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('cafe', cafeSchema);
