const { uploadToCloudinary, deleteFromCloudinary } = require('../middleware/cloudinary');
const cafeData = require('../models/cafeModel');

// Create Cafe
exports.createCafe = async (req, res) => {
  try {
    let imageData = { url: null, public_id: null };
   
    if (req.file) {
      imageData = await uploadToCloudinary(req.file);
    }
    const newCafe = new cafeData({
      menu: req.body.menu,
      kategori: req.body.kategori,
      harga: req.body.harga,
      gambar: imageData.url,
      cloudinary_id: imageData.public_id
    });
    const savedCafe = await newCafe.save();
    res.status(201).json(savedCafe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Cafe
exports.updateCafe = async (req, res) => {
  try {
    const cafe = await cafeData.findById(req.params.id);
    if (!cafe) {
      return res.status(404).json({ message: 'Cafe menu not found' });
    }
    let imageData = {
      url: cafe.gambar,
      public_id: cafe.cloudinary_id
    };
    if (req.file) {
      if (cafe.cloudinary_id) {
        await deleteFromCloudinary(cafe.cloudinary_id);
      }
      imageData = await uploadToCloudinary(req.file);
    }
    const updatedCafe = await cafeData.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        gambar: imageData.url,
        cloudinary_id: imageData.public_id
      },
      { new: true }
    );
    res.status(200).json(updatedCafe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Cafe
exports.deleteCafe = async (req, res) => {
  try {
    const cafe = await cafeData.findById(req.params.id);
    if (!cafe) {
      return res.status(404).json({ message: 'Cafe menu not found' });
    }
    if (cafe.cloudinary_id) {
      await deleteFromCloudinary(cafe.cloudinary_id);
    }
    await cafeData.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Cafe menu deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Cafe
exports.getAllCafe = async (req, res) => {
  try {
    const data = await cafeData.find().select('-__v');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Cafe by ID
exports.getCafeById = async (req, res) => {
  try {
    const cafe = await cafeData.findById(req.params.id).select('-__v');
    if (!cafe) {
      return res.status(404).json({ message: 'Cafe menu not found' });
    }
    res.status(200).json(cafe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};