const express = require("express");
const router = express.Router();
const kesenianController = require("../controllers/kesenianController");

router.get("/", kesenianController.getAllKesenian);
router.get("/:id", kesenianController.getKesenianById);

module.exports = router;
