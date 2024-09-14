const express = require("express");
const router = express.Router();
const umkmController = require("../controllers/umkmController");

router.get("/", umkmController.getAllUmkm);
router.get("/:id", umkmController.getUmkmById);
router.post("/add/", umkmController.createUmkm);

module.exports = router;
