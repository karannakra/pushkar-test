const mongoose = require("mongoose");
const g2_schema = require("./modelG2");
const g_schema = require("./modelG");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

mongoose.connect("mongodb+srv://pushkartalwar33:admin@cluster0.k94fwxm.mongodb.net/test", { useNewUrlParser: true });

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
  res.render("pages/g", { title: "Apply for G", dataRequested: false });
});

app.put("/g2",async (req,res)=>{
  // update will come in this function
  console.log(req.body)
  // await g2_schema.findOneAndUpdate({license_num:req.body.license_num},{$set :{req.body}})
  res.render("pages/g2",{title:"Apply for G2"})
})

app.get("/g2", async (req, res) => {
  const license_num = req.query.license;
  const isEdit = req.query.edit;
  const title = "Apply for G2";

  if (isEdit) {
    const resp = await mongoose.model("g2_schema").findOne({license_num:license_num})
    if (resp) {
      const respToSend = {
        title:title,
        isEdit:true,
        license: resp.license_num,
        notFound: false,
        firstname: resp.first_name,
        age: resp.age,
        dob: resp.dob,
        lastname: resp.last_name,
      }
      console.log(resp,"resp")
      res.render("pages/g2", respToSend);
    } else {
      res.render("pages/g2", { title: title, isEdit: false });
    }
  } else {
    res.render("pages/g2", { title: title, isEdit: false });
  }
});

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/g2", (req, res) => {
  console.log(req.body)
  g2_schema.create(req.body);
  res.redirect("/g2");
});
app.post("/g", async (req, res) => {
  const resp = await g2_schema.findOne({ license_num: req.body.num_license });

  let respToSend = {
    title: "Apply for G",
    notFound: true,
    dataRequested: true,
  };
  if (resp) {
    respToSend = {
      ...respToSend,
      license: resp.license_num,
      notFound: false,
      firstname: resp.first_name,
      age: resp.age,
      dob: resp.dob,
      lastname: resp.last_name,
    };
    res.render("pages/g", respToSend);
  } else {
    res.render("pages/g", respToSend);
  }
});

app.listen(3000, () => {
  console.log("started at server 3000");
});
