const { uploadToCloudinary, deleteFromCloudinary } = require('../middleware/cloudinary');
const tanamanObatData = require('../models/tanamanObatModel');

// Create Tanaman Obat
exports.createTanamanObat = async (req, res) => {
  try {
    let imageData = { url: null, public_id: null };
    
    if (req.file) {
      imageData = await uploadToCloudinary(req.file);
    }

    const newTanamanObat = new tanamanObatData({
      tanaman: req.body.tanaman,
      namaLatin: req.body.namaLatin,
      deskripsi: req.body.deskripsi,
      manfaat: req.body.manfaat,
      bentukOlahan: req.body.bentukOlahan,
      gambar: imageData.url,
      cloudinary_id: imageData.public_id
    });

    const savedTanamanObat = await newTanamanObat.save();
    res.status(201).json(savedTanamanObat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Tanaman Obat
exports.updateTanamanObat = async (req, res) => {
  try {
    const tanamanObat = await tanamanObatData.findById(req.params.id);
    if (!tanamanObat) {
      return res.status(404).json({ message: 'Tanaman obat not found' });
    }

    let imageData = { 
      url: tanamanObat.gambar, 
      public_id: tanamanObat.cloudinary_id 
    };

    if (req.file) {
      // Hapus gambar lama jika ada
      if (tanamanObat.cloudinary_id) {
        await deleteFromCloudinary(tanamanObat.cloudinary_id);
      }
      // Upload gambar baru
      imageData = await uploadToCloudinary(req.file);
    }

    const updatedTanamanObat = await tanamanObatData.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        gambar: imageData.url,
        cloudinary_id: imageData.public_id
      },
      { new: true }
    );

    res.status(200).json(updatedTanamanObat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Tanaman Obat
exports.deleteTanamanObat = async (req, res) => {
  try {
    const tanamanObat = await tanamanObatData.findById(req.params.id);
    if (!tanamanObat) {
      return res.status(404).json({ message: 'Tanaman obat not found' });
    }

    // Hapus gambar dari Cloudinary jika ada
    if (tanamanObat.cloudinary_id) {
      await deleteFromCloudinary(tanamanObat.cloudinary_id);
    }

    await tanamanObatData.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Tanaman obat deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Tanaman Obat
exports.getAllTanamanObat = async (req, res) => {
  try {
    const data = await tanamanObatData.find().select('-__v');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Tanaman Obat by ID
exports.getTanamanObatById = async (req, res) => {
  try {
    const tanaman = await tanamanObatData.findById(req.params.id).select('-__v');
    if (!tanaman) {
      return res.status(404).json({ message: 'Tanaman obat not found' });
    }
    res.status(200).json(tanaman);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};