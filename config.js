require("dotenv").config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  GOOGLE_API_KEY: process.env.API_KEY,
  // MONGO_URI: "mongodb://localhost:27017/chatbot-backend",
};

// module.exports = {
//   GOOGLE_API_KEY: process.env.API_KEY,
// };
