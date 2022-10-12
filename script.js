const mongoose = require("mongoose");
const g2_schema = require("./modelG2");
const g_schema = require("./modelG");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

mongoose.connect(
  "mongodb+srv://pushkartalwar33:admin@cluster0.k94fwxm.mongodb.net/test",
  { useNewUrlParser: true }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/home", { title: "Home" });
});
app.get("/dashboard", (req, res) => {
  res.render("pages/dashboard", { title: "Dashboard" });
});
app.get("/login", (req, res) => {
  res.render("pages/login", { title: "Login" });
});
app.get("/g", (req, res) => {
  res.render("pages/g", { title: "Apply for G" });
});

app.get("/g2", (req, res) => {
  res.render("pages/g2", { title: "Apply for G2" });
});

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/g2", (req, res) => {
  g2_schema.create(req.body);
  console.log(req.body);
  res.redirect("/g2");
});
app.post("/g", (req, res) => {
  g_schema.create(req.body);
  console.log(req.body);
  res.redirect("/g");
});

app.listen(3000, () => {
  console.log("started at server 3000");
});
