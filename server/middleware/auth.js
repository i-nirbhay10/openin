const jwt = require("jsonwebtoken");
const data = require("../userregister/datafom");

const auth = async (req, res, next) => {
  try {
    // console.log("parse jwt token", req.cookies);
    const token = req.cookies.jwtoken;
    const verification = jwt.verify(token, process.env.HIDDEN_KEY);
    const topid_data = await data.findOne({
      _id: verification._id,
      // "tokens.token": token,
    });
    if (!topid_data) {
      throw new Error("User not found");
    }
    req.token = token;
    req.topid_data = topid_data;
    req.userID = topid_data._id;
    console.log("Auth middleware worked out");
    next();
  } catch (error) {
    res.status(401).json({ error: "No token provided" });
    // console.error(error);
    console.log("Error in auth middleware");
  }
};

module.exports = auth;
