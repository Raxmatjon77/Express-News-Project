const express = require("express");
const jwt = require("jsonwebtoken");
const { MongoErrorLabel } = require("mongodb");



const generateJsonWebToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "3m",
  });
  return accessToken;
};

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied. Token missing" });
  }
  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //  
    req.userId = decoded.userId;
    next();
  } catch (err) {
    // console.log(err);
    res.status(401).json({ message: "Invalid token" });
  }
};
module.exports = verifyToken;