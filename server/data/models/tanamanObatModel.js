const mongoose = require('mongoose');

const tanamanObatSchema = new mongoose.Schema({
  tanaman: {
    type: String,
    required: true
  },
  namaLatin: {
    type: String,
    required: true
  },
  deskripsi: {
    type: String,
    required: true
  },
  manfaat: {
    type: String,
    required: true
  },
  bentukOlahan: {
    type: String,
    required: true
  },
  gambar: {
    type: String,
    default: null
  },
  cloudinary_id: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('TanamanObat', tanamanObatSchema);