const express = require("express");
const router = express.Router();

const addressController = require("../controllers/addressController");

router.post("/", addressController.createAddress);
router.get("/", addressController.getAddresses);

module.exports = router;

