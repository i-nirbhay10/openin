const jwt = require("jsonwebtoken");
const data = require("../userregister/datafom");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verification = jwt.verify(token, process.env.HIDDEN_KEY);
    const topid_data = await data.findOne({
      _id: verification._id,
      "tokens.token": token,
    });
    if (!topid_data) {
      throw new Error("user not found");
    }

    req.token = token;
    req.topid_data = topid_data;
    req.userID = topid_data._id;
    console.log("tocken generate");
    next();
  } catch (error) {
    res.status(401).send("error: no tocken provided");
    console.log(error);
    console.log("error in auth");
  }
};

module.exports = auth;
