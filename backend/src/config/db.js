const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "universidad"
});

connection.connect((error) => {
  if (error) {
    console.error("Error conectando a MySQL:", error);
  } else {
    console.log("Conectado a MySQL");
  }
});

module.exports = connection;