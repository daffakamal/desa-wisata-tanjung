const { uploadToCloudinary, deleteFromCloudinary } = require('../middleware/cloudinary');
const umkmData = require('../models/umkmModel');

// Create UMKM
exports.createUmkm = async (req, res) => {
  try {
    let imageData = { url: null, public_id: null };
   
    if (req.file) {
      imageData = await uploadToCloudinary(req.file);
    }
    const newUmkm = new umkmData({
      umkm: req.body.umkm,
      usaha: req.body.usaha,
      alamat: req.body.alamat,
      nomor: req.body.nomor,
      kategori: req.body.kategori,
      gambar: imageData.url,
      cloudinary_id: imageData.public_id
    });
    const savedUmkm = await newUmkm.save();
    res.status(201).json(savedUmkm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update UMKM
exports.updateUmkm = async (req, res) => {
  try {
    const umkm = await umkmData.findById(req.params.id);
    if (!umkm) {
      return res.status(404).json({ message: 'UMKM not found' });
    }
    let imageData = {
      url: umkm.gambar,
      public_id: umkm.cloudinary_id
    };
    if (req.file) {
      if (umkm.cloudinary_id) {
        await deleteFromCloudinary(umkm.cloudinary_id);
      }
      imageData = await uploadToCloudinary(req.file);
    }
    const updatedUmkm = await umkmData.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        gambar: imageData.url,
        cloudinary_id: imageData.public_id
      },
      { new: true }
    );
    res.status(200).json(updatedUmkm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete UMKM
exports.deleteUmkm = async (req, res) => {
  try {
    const umkm = await umkmData.findById(req.params.id);
    if (!umkm) {
      return res.status(404).json({ message: 'UMKM not found' });
    }
    if (umkm.cloudinary_id) {
      await deleteFromCloudinary(umkm.cloudinary_id);
    }
    await umkmData.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'UMKM deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All UMKM
exports.getAllUmkm = async (req, res) => {
  try {
    const data = await umkmData.find().select('-__v');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get UMKM by ID
exports.getUmkmById = async (req, res) => {
  try {
    const umkm = await umkmData.findById(req.params.id).select('-__v');
    if (!umkm) {
      return res.status(404).json({ message: 'UMKM not found' });
    }
    res.status(200).json(umkm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};