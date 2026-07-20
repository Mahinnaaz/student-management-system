const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // 🔥 only keep TLS fix
      tls: true,
      tlsAllowInvalidCertificates: true,
    });

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.log("❌ DB Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;