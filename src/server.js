const express = require("express");
const e = require("express");
const server = express();

//Pegar o BANDO DE DADOS

const db = require("./database/db");

// configurar pasta public
server.use(express.static("public"));

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
  return res.render("create-point.html");
});

server.get("/search", (req, res) => {
  return res.render("search-results.html");
});

//ligar o servidor
server.listen(3000);
