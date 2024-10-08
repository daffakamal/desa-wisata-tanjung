const Umkm = require('../models/umkmModel');

// Get all UMKM data
exports.getAllUmkm = async (req, res) => {
  try {
    const umkmData = await Umkm.find();
    res.json(umkmData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get UMKM by ID
exports.getUmkmById = async (req, res) => {
  try {
    const umkm = await Umkm.findById(req.params.id);
    if (!umkm) return res.status(404).send('UMKM not found');
    res.json(umkm);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new UMKM data (POST)
exports.createUmkm = async (req, res) => {
  const umkm = new Umkm({
    gambar: req.body.gambar,
    umkm: req.body.umkm,
    usaha: req.body.usaha,
    alamat: req.body.alamat,
    nomor: req.body.nomor,
    kategori: req.body.kategori
  });

  try {
    const newUmkm = await umkm.save();
    res.status(201).json(newUmkm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateUmkm = async (req, res) => {
  try {
    const updatedUmkm = await Umkm.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUmkm) return res.status(404).json({ message: "Tanaman Obat not found" });
    res.status(200).json(updatedUmkm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUmkm = async (req, res) => {
  try {
    const deletedUmkm = await Umkm.findByIdAndDelete(req.params.id);
    if (!deletedUmkm) return res.status(404).json({ message: "Tanaman Obat not found" });
    res.status(200).json({ message: "Tanaman Obat deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};