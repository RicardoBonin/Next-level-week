//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose();

//criar o objeto que ira fazer operações no db
const db = new sqlite3.Database("./src/database/database.db");

// utilizar o objeto de banco de dados, para nossas operações
db.serialize(() => {
  //Criar um tabela
});
