const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", { title: "Standway - Smart Parking" });
});

module.exports = router;
