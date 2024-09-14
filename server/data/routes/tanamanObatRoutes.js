const express = require("express");
const router = express.Router();
const tanamanObatController = require("../controllers/tanamanObatController");

router.get("/", tanamanObatController.getAllTanamanObat);
router.get("/:id", tanamanObatController.getTanamanObatById);

module.exports = router;
