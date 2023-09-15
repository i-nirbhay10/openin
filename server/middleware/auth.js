const jwt = require("jsonwebtoken");
const data = require("../userregister/datafom");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    console.log(" in auth tocken");
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
    console.log("auth worked out");
    next();
  } catch (error) {
    res.status(401).send("error: no tocken provided");
    console.log(error);
    console.log("error in auth");
  }
};

module.exports = auth;
