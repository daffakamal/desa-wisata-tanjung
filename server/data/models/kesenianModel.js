const mongoose = require('mongoose');

const KesenianSchema = new mongoose.Schema({
  gambar: {
    type: String,
    required: true,
  },
  kesenian: {
    type: String,
    required: true,
  },
  deskripsi: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Kesenian', KesenianSchema);
