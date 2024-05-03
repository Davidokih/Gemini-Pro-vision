const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
  uploadBankStatement,
  getAllBankStatement
} = require("../controllers/bankStatementController");

router.route("/").get(getAllBankStatement);
router.route("/uploading").post(upload.single("image"), uploadBankStatement);

module.exports = router;
