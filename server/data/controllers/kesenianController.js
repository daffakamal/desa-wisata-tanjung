const { uploadToCloudinary, deleteFromCloudinary } = require('../middleware/cloudinary');
const kesenianData = require('../models/kesenianModel');

// Create Kesenian
exports.createKesenian = async (req, res) => {
  try {
    let imageData = { url: null, public_id: null };
   
    if (req.file) {
      imageData = await uploadToCloudinary(req.file);
    }
    const newKesenian = new kesenianData({
      kesenian: req.body.kesenian,
      deskripsi: req.body.deskripsi,
      gambar: imageData.url,
      cloudinary_id: imageData.public_id
    });
    const savedKesenian = await newKesenian.save();
    res.status(201).json(savedKesenian);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Kesenian
exports.updateKesenian = async (req, res) => {
  try {
    const kesenian = await kesenianData.findById(req.params.id);
    if (!kesenian) {
      return res.status(404).json({ message: 'Kesenian not found' });
    }
    let imageData = {
      url: kesenian.gambar,
      public_id: kesenian.cloudinary_id
    };
    if (req.file) {
      if (kesenian.cloudinary_id) {
        await deleteFromCloudinary(kesenian.cloudinary_id);
      }
      imageData = await uploadToCloudinary(req.file);
    }
    const updatedKesenian = await kesenianData.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        gambar: imageData.url,
        cloudinary_id: imageData.public_id
      },
      { new: true }
    );
    res.status(200).json(updatedKesenian);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Kesenian
exports.deleteKesenian = async (req, res) => {
  try {
    const kesenian = await kesenianData.findById(req.params.id);
    if (!kesenian) {
      return res.status(404).json({ message: 'Kesenian not found' });
    }
    if (kesenian.cloudinary_id) {
      await deleteFromCloudinary(kesenian.cloudinary_id);
    }
    await kesenianData.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Kesenian deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Kesenian
exports.getAllKesenian = async (req, res) => {
  try {
    const data = await kesenianData.find().select('-__v');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Kesenian by ID
exports.getKesenianById = async (req, res) => {
  try {
    const kesenian = await kesenianData.findById(req.params.id).select('-__v');
    if (!kesenian) {
      return res.status(404).json({ message: 'Kesenian not found' });
    }
    res.status(200).json(kesenian);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};