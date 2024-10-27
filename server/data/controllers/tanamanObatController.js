const multer = require('multer');
const path = require('path');
const tanamanObatData = require('../models/tanamanObatModel');

// Konfigurasi multer untuk menyimpan gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/uploads/'); // Tentukan direktori penyimpanan
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Format nama file
  }
});

// Membatasi file yang bisa diupload (misalnya hanya gambar)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'));
  }
};

exports.upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Maksimal 5MB
  fileFilter: fileFilter,
});

// Fungsi untuk menambahkan data tanaman obat dengan gambar
exports.createTanamanObat = async (req, res) => {
  const { title, content } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Path gambar

  const newTanamanObat = new tanamanObatData({
    title,
    content,
    image: imagePath, // Simpan path gambar
  });

  try {
    const savedTanamanObat = await newTanamanObat.save();
    res.status(201).json(savedTanamanObat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllTanamanObat = async (req, res) => {
  try {
    const data = await tanamanObatData.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTanamanObatById = (req, res) => {
  const tanaman = tanamanObatData.find(t => t.id === parseInt(req.params.id));
  if (tanaman) {
    res.json(tanaman);
  } else {
    res.status(404).send("Tanaman obat not found");
  }
};


exports.updateTanamanObat = async (req, res) => {
  try {
    const updatedTanamanObat = await tanamanObatData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTanamanObat) return res.status(404).json({ message: "Tanaman Obat not found" });
    res.status(200).json(updatedTanamanObat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTanamanObat = async (req, res) => {
  try {
    const deletedTanamanObat = await tanamanObatData.findByIdAndDelete(req.params.id);
    if (!deletedTanamanObat) return res.status(404).json({ message: "Tanaman Obat not found" });
    res.status(200).json({ message: "Tanaman Obat deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};