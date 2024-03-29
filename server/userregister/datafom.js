// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  //   messages: [
  //     {
  //       firstname: {
  //         type: String,
  //         required: true,
  //       },

  //       email: {
  //         type: String,
  //         required: true,
  //       },
  //       message: {
  //         type: String,
  //         required: true,
  //       },
  //     },
  //   ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

// // password encription
// userSchema.pre("save", async function (next) {
//   console.log("hi i am bcrypt");
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 12);
//     this.cpassword = await bcrypt.hash(this.cpassword, 12);
//   }
//   next();
// });

// GENERTE TOCKEN
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.HIDDEN_KEY);
    this.tokens = this.tokens.concat({ token: token });
    // await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model("USER", userSchema);

module.exports = User;
