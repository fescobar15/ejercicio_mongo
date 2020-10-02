const msg = require("../controllers/message");
var express = require("express");
const Joi = require("joi");
const { date } = require("joi");
var router = express.Router();

/* GET all */
router.get("/", function (req, res, next) {
  msg.getMsgs((msgs) => {
    res.send(msgs);
  });
});

/* GET one */
router.get("/:ts", function (req, res, next) {
  msg.getMsg(parseInt(req.params.ts), (message) => {
    if (!message)
      return res
        .status(404)
        .send("El mensaje con el ts ingresado no fue encontrado");
    res.send(message);
  });
});

/* POST */
router.post("/", function (req, res, next) {
  const schema = Joi.object({
    message: Joi.string().min(5).required(),

    author: Joi.string()
      .pattern(/^[a-z A-Z]+[ ][a-z A-Z]+$/)
      .required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    console.log(error);
    return res
      .status(400)
      .send(
        "The message has to be at least 5 characters. The author must contain a first name and a last name separated by a blank space."
      );
  }

  let date = new Date();
  const new_msg = {
    message: req.body.message,
    author: req.body.author,
    ts: date.getTime(),
  };

  msg.addMsg(new_msg);
  res.send(new_msg);
});

/* PUT */
router.put("/:ts", function (req, res, next) {
  msg.getMsg(parseInt(req.params.ts), (message) => {
    if (!message) {
      return res
        .status(404)
        .send("El mensaje con el ts ingresado no fue encontrado");
    }
    const schema = Joi.object({
      message: Joi.string().min(5).required(),

      author: Joi.string()
        .pattern(/^[a-z A-Z]+[ ][a-z A-Z]+$/)
        .required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      console.log(error);
      return res
        .status(400)
        .send(
          "The message has to be at least 5 characters. The author must contain a first name and a last name separated by a blank space."
        );
    }

    let date = new Date();
    const new_msg = {
      message: req.body.message,
      author: req.body.author,
      ts: date.getTime(),
    };

    msg.updateMsg(
      parseInt(req.params.ts),
      new_msg.message,
      new_msg.author,
      new_msg.ts
    );
    res.send("Message updated correctly");
  });
});

/* DELETE */
router.delete("/:ts", function (req, res, next) {
  msg.getMsg(parseInt(req.params.ts), (message) => {
    if (!message)
      return res
        .status(404)
        .send("El mensaje con el ts ingresado no fue encontrado");

    msg.deleteMsg(parseInt(req.params.ts));
    res.send("Message was deleted");
  });
});

module.exports = router;
