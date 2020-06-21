//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose();

//criar o objeto que ira fazer operações no db
const db = new sqlite3.Database("./src/database/database.db");

// utilizar o objeto de banco de dados, para nossas operações
db.serialize(() => {
  //com comnados SQL eu vou:

  //1Criar um tabela
  db.run(`
    CREATE TABLE IF NOT EXISTS pleces (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      name TEXT,
      anddress TEXT,
      anddress2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `)

  //2Inserir dados na tabela
  const query = `
  INSERT INTO places (
    image,
    name,
    anddress,
    andress2,
    state,
    city,
    items
  ) VALUES (?,?,?,?,?,?,?);
`
const values = [
  "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
  "Colectoria",
  "Guilherme Gemballa, Jardim América",
  "Nº 260",
  "Santa Catarina",
  "Rio do Sul",
  "Resíduos Eletrônicos, Lâmpadas"
]
  db.run(query, values, function() {})

  //3Consultar os dados da tabela

  //4Deletar  um dado da tabela
});
