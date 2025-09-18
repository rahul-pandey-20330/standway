const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", { title: "Standway - Smart Parking" });
});


// About route
router.get("/about", (req, res) => {
  res.render("about", { title: "About Us - Standway" });
});


module.exports = router;
