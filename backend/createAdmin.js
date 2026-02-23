const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const Admin = require("./models/Admin");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10); // your password

  const admin = await Admin.create({
    username: "admin",
    password: hashedPassword
  });

  console.log("Admin created successfully:", admin);
  process.exit();
};

createAdmin();