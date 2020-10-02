const conn = require("../lib/MongoUtils");

//Get all messages
const getMsgs = (callback) =>
  conn.then((client) => {
    client
      .db("db_chat")
      .collection("messages")
      .find({})
      .toArray((error, data) => {
        console.log(data);
        callback(data);
      });
  });

//Get one message
const getMsg = (ts, callback) =>
  conn.then((client) => {
    client
      .db("db_chat")
      .collection("messages")
      .findOne({ ts })
      .then((result) => {
        callback(result);
      });
  });

//Add message
const addMsg = (doc) =>
  conn.then((client) => {
    client.db("db_chat").collection("messages").insertOne(doc);
  });

//Update message
const updateMsg = (old_ts, message, author, new_ts) => {
  conn.then((client) => {
    client
      .db("db_chat")
      .collection("messages")
      .updateOne(
        { ts: old_ts },
        { $set: { message: message, author: author, ts: new_ts } }
      );
  });
};

//Delete message
const deleteMsg = (ts) =>
  conn.then((client) => {
    client.db("db_chat").collection("messages").deleteOne({ ts });
  });

const msg = { getMsgs, getMsg, addMsg, updateMsg, deleteMsg };

module.exports = msg;
