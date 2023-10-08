const express = require("express");
const router = express.Router();
const ipController = require("../controllers/ipController");

router.post("/generate", ipController.generateUrl);
router.get("/:urlId", ipController.captureIp);

module.exports = router;
