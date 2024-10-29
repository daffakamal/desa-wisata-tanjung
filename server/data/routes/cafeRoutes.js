const express = require("express");
const router = express.Router();
const cafeController = require("../controllers/cafeController");
const upload = require("../middleware/upload");

router.get("/", cafeController.getAllCafe);
router.get("/:id", cafeController.getCafeById);
router.post('/add', upload.single('gambar'), cafeController.createCafe);
router.put('/:id', upload.single('gambar'), cafeController.updateCafe);
router.delete('/:id', cafeController.deleteCafe);

module.exports = router;
