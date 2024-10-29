const express = require("express");
const router = express.Router();
const tanamanObatController = require("../controllers/tanamanObatController");
const upload = require("../middleware/upload");

router.get("/", tanamanObatController.getAllTanamanObat);
router.get("/:id", tanamanObatController.getTanamanObatById);
router.post('/add', upload.single('gambar'), tanamanObatController.createTanamanObat);
router.put('/:id', upload.single('gambar'), tanamanObatController.updateTanamanObat);
router.delete('/:id', tanamanObatController.deleteTanamanObat);

module.exports = router;
