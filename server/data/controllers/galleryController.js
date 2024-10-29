const { uploadToCloudinary, deleteFromCloudinary } = require('../middleware/cloudinary');
const galleryData = require('../models/galleryModel');

// Create Gallery
exports.createGallery = async (req, res) => {
  try {
    let imageData = { url: null, public_id: null };
   
    if (req.file) {
      imageData = await uploadToCloudinary(req.file);
    }
    const newGallery = new galleryData({
      tanaman: req.body.tanaman,
      deskripsi: req.body.deskripsi,
      gambar: imageData.url,
      cloudinary_id: imageData.public_id
    });
    const savedGallery = await newGallery.save();
    res.status(201).json(savedGallery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Gallery
exports.updateGallery = async (req, res) => {
  try {
    const gallery = await galleryData.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    let imageData = {
      url: gallery.gambar,
      public_id: gallery.cloudinary_id
    };
    if (req.file) {
      if (gallery.cloudinary_id) {
        await deleteFromCloudinary(gallery.cloudinary_id);
      }
      imageData = await uploadToCloudinary(req.file);
    }
    const updatedGallery = await galleryData.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        gambar: imageData.url,
        cloudinary_id: imageData.public_id
      },
      { new: true }
    );
    res.status(200).json(updatedGallery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Gallery
exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await galleryData.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    if (gallery.cloudinary_id) {
      await deleteFromCloudinary(gallery.cloudinary_id);
    }
    await galleryData.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Gallery deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Gallery
exports.getAllGallery = async (req, res) => {
  try {
    const data = await galleryData.find().select('-__v');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Gallery by ID
exports.getGalleryById = async (req, res) => {
  try {
    const gallery = await galleryData.findById(req.params.id).select('-__v');
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};