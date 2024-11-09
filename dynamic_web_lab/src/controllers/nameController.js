const names = require("../models/name.js");
const submitName = (req, res) => {
  const name = req.body.name;
  names.addName(name);
  res.json({ message: `Xin chào, ${name}!`, names: names.getNames() });
};

module.exports = { submitName };
