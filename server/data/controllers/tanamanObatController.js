const tanamanObatData = require("../models/tanamanObatModel");

exports.getAllTanamanObat = (req, res) => {
  res.json(tanamanObatData);
};

exports.getTanamanObatById = (req, res) => {
  const tanaman = tanamanObatData.find(t => t.id === parseInt(req.params.id));
  if (tanaman) {
    res.json(tanaman);
  } else {
    res.status(404).send("Tanaman obat not found");
  }
};
