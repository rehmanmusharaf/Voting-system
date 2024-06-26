const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 8080;
const symbol = require("./Controlers/symbol.js");
const vote = require("./Controlers/vote.js");
const election = require("./Controlers/election.js");
// var multer = require("multer");
const cors = require("cors");
const corsOptions = {
  origin: process.env.REACT_URL,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
const path = require("path");
app.use("/", express.static("uploads"));
const user = require("./Controlers/user.js");
const { connecttodb } = require("./db/Db.js");
const constituency = require("./Controlers/constituency.js");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("dotenv").config();
connecttodb();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/create-user", user);
app.post("/api/activation", user);
app.post("/api/login", user);
app.get("/getuser", user);
app.get("/user/logout", user);
app.get("/getallusers", user);
app.get("/getvotedusers", user);
app.post("/symbol/registersymbol", symbol);
app.delete("/symbol/deletesymbol/:id", symbol);
app.put("/symbol/updatesymbol/:id", symbol);
app.get("/getsymbols", symbol);
app.post("/api/registerconstituency", constituency);
app.get("/api/getconstituency", constituency);
app.post("/registervote", vote);
app.post("/api/castvote", vote);
app.get("/getvotecount", vote);
app.post("/startelection", election);
app.get("/getelection", election);
app.get("/updatestatus", election);
app.delete("/deleteelection", election);
app.put("/updateelection", election);
app.get("/getpublicvotecount", vote);
app.get("/getpublicvotedusers", user);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(express.static(path.join(__dirname, "/Voting-System-main/build")));
let pathjoin = path.join(__dirname, "/Voting-System-main/build");
let pathjoin2 = path.join(
  __dirname,
  "Voting-System-main",
  "build",
  "index.html"
);
console.log(pathjoin);
console.log(pathjoin2);
//ok
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "Voting-System-main", "build", "index.html")
  );
  // console.log("Resolved file path:", filePath);
  // res.sendFile(filePath);
  // res.sendFile(
  //   path.join(__dirname, "Voting-System-main", "build", "index.html")
  // );
});
