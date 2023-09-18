const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const auth = require("../middleware/auth");
const data = require("../userregister/datafom");

router.use(cookieParser());

// database connection
require("../db/connection");

// Home router
router.get("/", (req, res) => {
  res.send(
    "Hello, world! This is the open project home page created by Nirbhay."
  );
});

// TO NEW USER REGISTRATION
router.post("/register", async (req, res) => {
  const { email, password, cpassword } = req.body;

  if (!email || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill value in all fields" });
  }

  try {
    const passmatch = password === cpassword;
    const userexist = await data.findOne({ email: email });

    if (userexist) {
      return res.status(422).json({ error: "User already exists" });
    } else {
      const user = new data({ email, password, cpassword });

      if (passmatch) {
        await user.save();
        return res.status(201).json({ message: "Registration successful" });
      } else {
        return res.status(422).json({ error: "Passwords do not match" });
      }
    }
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// TO SIGN IN
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill value in all fields" });
  }

  try {
    const userlogin = await data.findOne({ email: email, password: password });

    if (userlogin) {
      const token = await userlogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 604800000),
        httpOnly: true,
      });

      return res.status(200).json({ message: "Logged in" });
    } else {
      return res.status(400).json({ message: "Invalid information" });
    }
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// TO google resister signin
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

        return res.status(200).json({ message: "Logged in" });
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
            // expires: new Date(Date.now() + 604800000),
            httpOnly: true,
          });
        }

        return res.status(200).json({ message: "Registration successful" });
      }
    } catch (error) {
      console.error("Google login failed:", error);
      res.status(500).json({ error: "Google login failed" });
    }
  }
});

router.get("/dashboard", auth, async (req, res) => {
  try {
    res.send(req.topid_data);
  } catch (error) {
    console.error("Error in dashboard route", error);
    res.status(500).send("Internal server error");
  }
});

// TO  USER LOG OUT
router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  console.log("Server logout: Cookie cleared");
  res.status(200).send("User logged out from server");
});

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

module.exports = router;
