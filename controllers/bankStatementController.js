const cloudinary = require("../utils/cloudinary");
const BankStatement = require("../models/bankStatement");
const { generateResponse } = require("../services/geminiService");
const mime = require('mime-types');
const fs = require('fs');


async function fileToGenerativePart(path) {
  const mimeType = mime.lookup(path) || 'application/octet-stream';
  const data = await fs.promises.readFile(path); // Read file contents using promises
  return {
    inlineData: {
      data: data.toString("base64"),
      mimeType
    },
  };
}

exports.uploadBankStatement = async (req, res) => {
  try {
    const { statementData, message } = req.body;

    if (!statementData) {
      return res.status(400).json({ error: "statementData is required" });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ error: "Bank statement image is required" });
    }

    const myImage = [ await fileToGenerativePart(req.file.path) ];
    const response = await generateResponse(myImage, message);

    const result = await cloudinary.uploads(req.file.path, "image");

    const bankStatement = new BankStatement({
      image: result.url,
      statementData,
    });

    await bankStatement.save();

    res.status(201).json({ message: "Bank statement uploaded successfully", data: response });
  } catch (error) {
    console.error("Error uploading bank statement:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllBankStatement = async (req, res) => {
  try {
    const bankStatements = await BankStatement.find();

    res.status(200).json({
      status: "Success",
      data: bankStatements
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
