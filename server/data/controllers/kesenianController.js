const kesenianData = require("../models/kesenianModel");

exports.getAllKesenian = (req, res) => {
  res.json(kesenianData);
};

exports.getKesenianById = (req, res) => {
  const kesenian = kesenianData.find(k => k.id === parseInt(req.params.id));
  if (kesenian) {
    res.json(kesenian);
  } else {
    res.status(404).send("Kesenian not found");
  }
};

// Create new Kesenian
exports.createKesenian = async (req, res) => {
  const newKesenian = new kesenianData(req.body);
  try {
    const savedKesenian = await newKesenian.save();
    res.status(201).json(savedKesenian);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Kesenian by ID
exports.updateKesenian = async (req, res) => {
  try {
    const updatedKesenian = await kesenianData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedKesenian) return res.status(404).json({ message: "Kesenian not found" });
    res.status(200).json(updatedKesenian);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Kesenian by ID
exports.deleteKesenian = async (req, res) => {
  try {
    const deletedKesenian = await kesenianData.findByIdAndDelete(req.params.id);
    if (!deletedKesenian) return res.status(404).json({ message: "Kesenian not found" });
    res.status(200).json({ message: "Kesenian deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};