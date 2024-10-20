const cafeData = require("../models/cafeModel");

exports.getAllCafeItems = (req, res) => {
  res.json(cafeData);
};

exports.getCafeItemById = (req, res) => {
  const cafeItem = cafeData.find(c => c.id === parseInt(req.params.id));
  if (cafeItem) {
    res.json(cafeItem);
  } else {
    res.status(404).send("Cafe item not found");
  }
};

exports.createCafeItem = async (req, res) => {
  const newCafeItem = new cafeData(req.body);
  try {
    const savedCafeItem = await newCafeItem.save();
    res.status(201).json(savedCafeItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCafeItem = async (req, res) => {
  try {
    const updatedCafeItem = await cafeData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCafeItem) return res.status(404).json({ message: "Cafe item not found" });
    res.status(200).json(updatedCafeItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCafeItem = async (req, res) => {
  try {
    const deletedCafeItem = await cafeData.findByIdAndDelete(req.params.id);
    if (!deletedCafeItem) return res.status(404).json({ message: "Cafe item not found" });
    res.status(200).json({ message: "Cafe item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};