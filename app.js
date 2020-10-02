var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const Joi = require("joi");
const fs = require("fs");

var indexRouter = require("./routes/index");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/chat/api/messages", indexRouter);

//Create JSON file to store the messages
/*let json = { messages: [] };
let string = JSON.stringify(json, null, 2);
fs.writeFile("messages.json", string, function (err) {
  if (err) throw err;
  console.log("Saved!");
});*/

//Add get all messages endpoint
/*app.get("/chat/api/messages", (req, res) => {
  fs.readFile("messages.json", function (err, data) {
    res.send(JSON.parse(data));
  });
});*/

//Add get by id endpoint
/*app.get("/chat/api/messages/:ts", (req, res) => {
  fs.readFile("messages.json", function (err, data) {
    const messages = JSON.parse(data);
    const msg = messages.messages.find((m) => m.ts === parseInt(req.params.ts));
    if (!msg)
      return res
        .status(404)
        .send("The message with the given ts was not found");
    res.send(msg);
  });
});*/

//Add post endpoint
/*app.post("/chat/api/messages", (req, res) => {
  const schema = Joi.object({
    message: Joi.string().min(5).required(),

    author: Joi.string()
      .pattern(/^[a-z A-Z]+[ ][a-z A-Z]+$/)
      .required(),

    ts: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    console.log(error);
    return res
      .status(400)
      .send(
        "The message has to be at least 5 characters. The author must contain a first name and a last name separated by a blank space. The timestamp is required"
      );
  }

  const msg = {
    message: req.body.message,
    author: req.body.author,
    ts: req.body.ts,
  };

  fs.readFile("messages.json", function (err, data) {
    let original = JSON.parse(data);
    original.messages.push(msg);
    let string = JSON.stringify(original, null, 2);
    fs.writeFile("messages.json", string, function (err) {
      if (err) throw err;
      res.send(msg);
    });
  });
});*/

//Add put endpoint
/*app.put("/chat/api/messages/:ts", (req, res) => {
  const schema = Joi.object({
    message: Joi.string().min(5).required(),

    author: Joi.string()
      .pattern(/^[a-z A-Z]+[ ][a-z A-Z]+$/)
      .required(),

    ts: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    console.log(error);
    return res.status(400).send(error);
  }

  fs.readFile("messages.json", function (err, data) {
    let json = JSON.parse(data);
    const msg = json.messages.find((m) => m.ts === parseInt(req.params.ts));

    if (!msg)
      return res
        .status(404)
        .send("The message with the given ts was not found");

    json.messages.find((m) => m.ts === parseInt(req.params.ts)).message =
      req.body.message;
    json.messages.find((m) => m.ts === parseInt(req.params.ts)).author =
      req.body.author;
    json.messages.find((m) => m.ts === parseInt(req.params.ts)).ts =
      req.body.ts;
    let string = JSON.stringify(json, null, 2);
    fs.writeFile("messages.json", string, function (err) {
      if (err) throw err;
      res.send(newMsg);
    });
  });
});*/

//Add delete endpoint
/*app.delete("/chat/api/messages/:ts", (req, res) => {
  fs.readFile("messages.json", function (err, data) {
    let json = JSON.parse(data);
    const msg = json.messages.find((m) => m.ts === parseInt(req.params.ts));

    if (!msg)
      return res
        .status(404)
        .send("The message with the given ts was not found");

    const index = json.messages.indexOf(msg);
    if (index > -1) {
      json.messages.splice(index, 1);
    }
    let string = JSON.stringify(json, null, 2);
    fs.writeFile("messages.json", string, function (err) {
      if (err) throw err;
      res.send("deleted");
    });
  });
});*/

module.exports = app;
