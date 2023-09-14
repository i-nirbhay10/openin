const express = require("express");
const router = express.Router();
// const bcrypt = require("bcrypt");

//using cookie parser
const cookieParser = require("cookie-parser");
router.use(cookieParser());

// use middeleware file
const auth = require("../middleware/auth");

// database connection
require("../db/connection");
const data = require("../userregister/datafom");

// mongoose
const { connection } = require("mongoose");

// create routing
router.get("/", (req, res) => {
  res.send(
    "hello world this is open project home page from router created by nirbhay"
  );
});

// signup users
router.post("/register", async (req, res) => {
  const { email, password, cpassword } = req.body;

  console.log(req.body);

  if (!email || !password || !cpassword) {
    res.status(422).json({ error: "plese fill all fieled" });
    console.log("all fesld not fill ");
  }

  try {
    const passmatch = password === cpassword;

    const userexist = await data.findOne({ email: email });
    if (userexist) {
      res.status(422).json({ error: "user is allready exist" });
    } else {
      const user = new data({
        email,
        password,
        cpassword,
      });

      if (passmatch) {
        await user.save();
        res.status(201).json({ message: "registration successful" });
      } else {
        res.json({ error: "password not matched" });
      }
    }
  } catch (error) {
    console.log("registration feald error");
  }
});

// login users
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    if (!email || !password) {
      res.status(400).send({ message: "fill data in all feals" });
      res.status(400).json({ message: "fill data in all feals" });
    }

    const userlogin = await data.findOne({ email: email, password: password });

    if (userlogin) {
      const token = await userlogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 604800000),
        httpOnly: true,
      });
      // console.log(token);

      res.status(200).send({ message: "logged in " });
    } else {
      res.status(400).send({ message: "invalid information" });
    }
  } catch (err) {
    console.log("login fail error");
  }
});

// google signup or login
router.post("/googlelogin", async (req, res) => {
  const { email, clientid } = req.body;

  if (email) {
    try {
      const userlogin = await data.findOne({ email: email });

      if (userlogin) {
        const token = await userlogin.generateAuthToken();
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 604800000),
          httpOnly: true,
        });

        res.status(200).send({ message: "logged in " });
      } else {
        const password = email + clientid;
        const user = new data({
          email,
          password: password,
          cpassword: password,
        });

        await user.save();

        const usercheck = await data.findOne({ email: email });
        if (usercheck) {
          const token = await usercheck.generateAuthToken();
          res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 604800000),
            httpOnly: true,
          });
        }

        res.status(200).send({ message: "registration successful" });
      }
    } catch (error) {
      console.log(error);
    }
  }
});

//dashboard request with middeleware
router.get("/dashboard", auth, (req, res) => {
  try {
    console.log("rout dash run");
    res.send(req.topid_data);
    console.log("response from dashboard");
  } catch (error) {
    console.log(error);
  }
});

// loging out
router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  console.log("server logout cookie clear");
  res.status(200).send("user loged out from server");
});

// create API
router.get("/productapi", (req, res) => {
  res.send([
    {
      data: {
        top_product: "Basic Tees",
        top_productper: 55,
        mediam_product: "Custom Short Pants",
        mediam_productper: 31,
        low_product: "Super Hoodies",
        low_productper: 14,
      },
    },
  ]);
});

// // contect massage
// router.post("/contect", auth, async (req, res) => {
//   try {
//     const { firstname, email, message } = req.body;
//     console.log(req.body);

//     if (!firstname || !email || !message) {
//       res.json({ error: "plz fill all filed" });
//     }

//     const match = await data.findOne({ _id: req.userID });

//     if (match) {
//       const matchget = await match.messagepush(firstname, email, message);
//       console.log(matchget);
//       await match.save();
//       console.log("msg saved");

//       // res.status(201).json({ message: "message saved successfully" });
//     }
//   } catch (error) {
//     console.log(error);
//     console.log("server contect not run");
//   }
// });

module.exports = router;
