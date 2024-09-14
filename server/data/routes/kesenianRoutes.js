const express = require("express");
const router = express.Router();
const kesenianController = require("../controllers/kesenianController");

router.get("/", kesenianController.getAllKesenian);
router.get("/:id", kesenianController.getKesenianById);
router.post('/add', kesenianController.createKesenian);
router.put('/:id', kesenianController.updateKesenian);
router.delete('/:id', kesenianController.deleteKesenian);

module.exports = router;
