const galleryData = require("../models/galleryModel.js");

exports.getAllGalleryItems = async (req, res) => {
  try {
    const data = await galleryData.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getGalleryItemById = (req, res) => {
  const galleryItem = galleryData.find(g => g.id === parseInt(req.params.id));
  if (galleryItem) {
    res.json(galleryItem);
  } else {
    res.status(404).send("Gallery item not found");
  }
};

exports.createGalleryItem = async (req, res) => {
  const newGalleryItem = new galleryData(req.body);
  try {
    const savedGalleryItem = await newGalleryItem.save();
    res.status(201).json(savedGalleryItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateGalleryItem = async (req, res) => {
  try {
    const updatedGalleryItem = await galleryData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedGalleryItem) return res.status(404).json({ message: "Gallery item not found" });
    res.status(200).json(updatedGalleryItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteGalleryItem = async (req, res) => {
  try {
    const deletedGalleryItem = await galleryData.findByIdAndDelete(req.params.id);
    if (!deletedGalleryItem) return res.status(404).json({ message: "Gallery item not found" });
    res.status(200).json({ message: "Gallery item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
