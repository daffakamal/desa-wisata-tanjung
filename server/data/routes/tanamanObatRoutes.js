const express = require("express");
const router = express.Router();
const tanamanObatController = require("../controllers/tanamanObatController");

router.get("/", tanamanObatController.getAllTanamanObat);
router.get("/:id", tanamanObatController.getTanamanObatById);
router.post('/add', tanamanObatController.createTanamanObat);
router.put('/:id', tanamanObatController.updateTanamanObat);
router.delete('/:id', tanamanObatController.deleteTanamanObat);

module.exports = router;
