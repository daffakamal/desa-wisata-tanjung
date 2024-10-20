const express = require("express");
const router = express.Router();
const cafeController = require("../controllers/cafeController");

router.get("/", cafeController.getAllCafeItems);

router.get("/:id", cafeController.getCafeItemById);

router.post('/add', cafeController.createCafeItem);

router.put('/:id', cafeController.updateCafeItem);

router.delete('/:id', cafeController.deleteCafeItem);

module.exports = router;
