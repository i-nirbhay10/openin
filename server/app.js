const dotenv = require("dotenv");
const express = require("express");
const app = express();

// useing dotenv
dotenv.config({ path: "./.env" });

//requireing and using corse
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

//for json data reeding
app.use(express.json());

//link the router files with app
app.use(require("./router/routs"));

// app listening

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app renning on port no ${port}`);
});
