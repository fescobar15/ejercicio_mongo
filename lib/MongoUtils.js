const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

//Conectar a mongo (conn es una promesa)
const conn = MongoClient.connect(url, { useUnifiedTopology: true });

//Exportar la conexión
module.exports = conn;
