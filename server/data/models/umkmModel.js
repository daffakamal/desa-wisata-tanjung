const mongoose = require('mongoose');

const UmkmSchema = new mongoose.Schema({
  gambar: {
    type: String,
    required: true,
  },
  umkm: {
    type: String,
    required: true,
  },
  usaha: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  nomor: {
    type: String,
    required: true,
  },
  kategori: {
    type: String,
    required: true,
  },
  cloudinary_id: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('Umkm', UmkmSchema);
