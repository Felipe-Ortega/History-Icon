var database = require("../database/config");

function cadastrar(fkUsuario, fkPergunta, resposta, isCorreta) {
  var instrucaoSql = `INSERT INTO resposta (fkUsuario, fkPergunta, resposta, isCorreta) VALUES (${fkUsuario}, ${fkPergunta}, '${resposta}','${isCorreta}')`;
  return database.executar(instrucaoSql);
}

function listarRespostas() {
  var instrucaoSql = `SELECT respostaCorreta FROM pergunta`;
  return database.executar(instrucaoSql);
}
module.exports = {
  cadastrar,
  listarRespostas
};
