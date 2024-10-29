const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
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
  cloudinary_id: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('Gallery', GallerySchema);
