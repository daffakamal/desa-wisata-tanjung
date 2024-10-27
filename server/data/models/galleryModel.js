const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  gambar: {
    type: String,
    required: true,
  },
  tanaman: {
    type: String,
    required: true,
  },
  deskripsi: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Gallery', GallerySchema);
