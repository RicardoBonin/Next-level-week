const express = require("express");
const e = require("express");
const server = express();

//Pegar o BANDO DE DADOS

const db = require("./database/db");

// configurar pasta public
server.use(express.static("public"));

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }));

//utilizando templete engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});
//configurar caminhos da minha aplicação
// página inicial
// req: Requisição
// res: Resposta
server.get("/", (req, res) => {
  return res.render("index.html", { title: "um titulo" });
});

server.get("/create-point", (req, res) => {
  //req.query: Query Strings da nossa url
  //console.log(req.query);

  return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {
  //req.body: O corpo do nosso formulário
  console.log(req.body);

  //Inserir dados ao banco de dados
  const query = `
  INSERT INTO places (
    image,
    name,
    anddress,
    anddress2,
    state,
    city,
    items
  ) VALUES (?,?,?,?,?,?,?)
`;
  const values = [
    req.body.image,
    req.body.name,
    req.body.anddress,
    req.body.anddress2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];
  function afterInsertData(err) {
    if (err) {
      console.log(err);
      return res.send("Erro no cadastro!");
    }
    console.log("Cadastrado com sucesso!");
    console.log(this);

    return res.render("create-point.html", { saved: true });
  }
  db.run(query, values, afterInsertData);
});

server.get("/search", (req, res) => {
  const search = req.query.search;

  if (search == "") {
    // Pesquisa vazia
    return res.render("search-results.html", { total: 0 });
  }

  //Pegar os dados no banco de dados
  // 
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      return console.log(err);
    }
    const total = rows.length;
    //Mostrar a página html com os dados do banco de dados
    return res.render("search-results.html", { places: rows, total });
  });
});

//ligar o servidor
server.listen(3000);
