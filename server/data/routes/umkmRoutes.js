const express = require("express");
const router = express.Router();
const umkmController = require("../controllers/umkmController");
const upload = require("../middleware/upload");

router.get("/", umkmController.getAllUmkm);
router.get("/:id", umkmController.getUmkmById);
router.post("/add/", upload.single('gambar'), umkmController.createUmkm);
router.put('/:id', upload.single('gambar'), umkmController.updateUmkm);
router.delete('/:id', umkmController.deleteUmkm);

module.exports = router;
