const BankStatement = require("../models/bankStatement");
const { generateResponse } = require("../services/geminiService");
// const cloudinary = require("../utils/cloudinaryForGemini");
const cloudinary = require("cloudinary").v2;
const mime = require('mime-types');
const axios = require('axios');


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});


exports.get_bank_statement = async (req, res) => {
  try {
    const id = req.params.statementId;
    const getBankStatement = await BankStatement.findById(id);

    if (!getBankStatement) return res.status(404).json({ message: "Bank statement not found" });
    // const publicId = getBankStatement.image.split('/').pop().split('.')[ 0 ];

    const downloadResponse = await cloudinary.uploader.download(getBankStatement.image);
    const myImage = [ fileToGenerativePart(downloadResponse) ];

    const result = generateResponse(myImage);

    res.jason({ status: 'Success', data: result });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};
