import jwt from "jsonwebtoken";
import userModel from "../models/User.js";

export const userValidation = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access",
      success: false,
    });
  }

  const tokenRegex = /^Bearer (.+)$/;

  const tokenMatch = tokenRegex.test(token);

  if (!tokenMatch) {
    return res.status(401).json({
      message: "Invalid token",
      success: false,
    });
  }

  const decoded = jwt.decode(token);

  if (decoded) {
    userModel.findOne({ email: decoded.email }, (err, user) => {
      if (err) {
        return res.status(401).json({
          message: "Unauthorized access",
        });
      }
      if (user) {
        req.user = user;
        return next();
      }
    });
  } else {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }
};
