var database = require("../database/config");

function cadastrar(fkUsuario, fkPergunta, resposta, isCorreta) {
  var instrucaoSql = `INSERT INTO resposta (fkUsuario, fkPergunta, resposta, isCorreta) VALUES (${fkUsuario}, ${fkPergunta}, '${resposta}','${isCorreta}')`;
  return database.executar(instrucaoSql);
}

function listarRespostas(fkUsuario) {
  var instrucaoSql = `SELECT resposta, isCorreta FROM resposta WHERE fkUsuario = ${fkUsuario}`;
  return database.executar(instrucaoSql);
}
module.exports = {
  cadastrar,
  listarRespostas
};
