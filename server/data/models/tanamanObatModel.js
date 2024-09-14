const mongoose = require('mongoose');

const TanamanObatSchema = new mongoose.Schema({
  gambar: {
    type: String,
    required: true,
  },
  tanaman: {
    type: String,
    required: true,
  },
  namaLatin: {
    type: String,
    required: true,
  },
  deskripsi: {
    type: String,
    required: true,
  },
  manfaat: {
    type: String,
    required: true,
  },
  bentukOlahan: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('TanamanObat', TanamanObatSchema);
