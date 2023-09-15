const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config({ path: "./.env" }); // useing dotenv

const cors = require("cors"); //requireing and using corse
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json()); //for json data reeding

app.use(require("./router/routs")); //link the router files with app

const port = process.env.PORT || 5000; // app listening

app.listen(port, () => {
  console.log(`app renning on port no ${port}`);
});
