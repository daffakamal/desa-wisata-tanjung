const tanamanObatData = require("../models/tanamanObatModel");

exports.getAllTanamanObat = (req, res) => {
  res.json(tanamanObatData);
};

exports.getTanamanObatById = (req, res) => {
  const tanaman = tanamanObatData.find(t => t.id === parseInt(req.params.id));
  if (tanaman) {
    res.json(tanaman);
  } else {
    res.status(404).send("Tanaman obat not found");
  }
};

exports.createTanamanObat = async (req, res) => {
  const newTanamanObat = new tanamanObatData(req.body);
  try {
    const savedTanamanObat = await newTanamanObat.save();
    res.status(201).json(savedTanamanObat);
  } catch (error) {
    res.status(400).json({ message: error.message });
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