//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ak18092000:dbpass123@cluster0.cc0d2ru.mongodb.net/bewakoof", {useNewUrlParser: true});

const todoSchema = mongoose.Schema({
  name: String
});

const Item = new mongoose.model("Item", todoSchema);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.get("/", function(req, res) {

  const day = date.getDate();

  Item.find()
    .then((items) => {
      res.render("list", {listTitle: day, newListItems: items});
    });

  // res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  const newItem = new Item({
    name: item
  });

  
  Item.insertMany([newItem])
    .then(() => {
        // console.log("success");
        res.redirect("/");
    });
    // .catch((error) => {
    //     console.error("Error inserting data: ", error);
    // });
  // res.redirect("/");

  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
  //   res.redirect("/");
  // }
});

app.post("/delete", function(req, res) {
  // console.log(req.body.checkbox);

  Item.deleteOne({_id: req.body.checkbox})
    .then(() => {
      console.log("succuess");
    });


  res.redirect("/");
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

let port = process.env.PORT;
if(port == null || port == "")
{
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
