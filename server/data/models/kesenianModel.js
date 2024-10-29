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
  cloudinary_id: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('Kesenian', KesenianSchema);
