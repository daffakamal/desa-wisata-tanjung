const kesenianData = require("../models/kesenianModel");

exports.getAllKesenian = (req, res) => {
  res.json(kesenianData);
};

exports.getKesenianById = (req, res) => {
  const kesenian = kesenianData.find(k => k.id === parseInt(req.params.id));
  if (kesenian) {
    res.json(kesenian);
  } else {
    res.status(404).send("Kesenian not found");
  }
};
