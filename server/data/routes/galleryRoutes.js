const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");
const upload = require("../middleware/upload");

router.get("/", galleryController.getAllGallery);
router.get("/:id", galleryController.getGalleryById);
router.post('/add', upload.single('gambar'), galleryController.createGallery);
router.put('/:id', upload.single('gambar'), galleryController.updateGallery);
router.delete('/:id', galleryController.deleteGallery);

module.exports = router;