const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = protect;