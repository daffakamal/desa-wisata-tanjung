const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");

router.get("/", galleryController.getAllGalleryItems);

router.get("/:id", galleryController.getGalleryItemById);

router.post('/add', galleryController.createGalleryItem);

router.put('/:id', galleryController.updateGalleryItem);

router.delete('/:id', galleryController.deleteGalleryItem);

module.exports = router;