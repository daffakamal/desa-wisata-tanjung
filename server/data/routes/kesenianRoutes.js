const express = require("express");
const router = express.Router();
const kesenianController = require("../controllers/kesenianController");
const upload = require("../middleware/upload");

router.get("/", kesenianController.getAllKesenian);
router.get("/:id", kesenianController.getKesenianById);
router.post('/add', upload.single('gambar'), kesenianController.createKesenian);
router.put('/:id', upload.single('gambar'), kesenianController.updateKesenian);
router.delete('/:id', kesenianController.deleteKesenian);

module.exports = router;
