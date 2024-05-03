const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatbotController");

router.get("/:statementId", chatbotController.get_bank_statement);

module.exports = router;
