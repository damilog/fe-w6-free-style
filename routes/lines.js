const express = require("express");
const router = express.Router();
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("./public/data/data.json", "utf8"));

router.get("/", function (req, res, next) {
  res.json(data["DATA"]);
});

module.exports = router;
