var database = require("../database/config");

function cadastrar(fkUsuario, fkPergunta, resposta, isCorreta) {
  var instrucaoSql = `INSERT INTO Resposta (fkUsuario, fkPergunta, resposta, isCorreta) VALUES (${fkUsuario}, ${fkPergunta}, '${resposta}','${isCorreta}')`;
  return database.executar(instrucaoSql);
}
// Listar quantidade de corretas ou erradas por usuario
function listarRespostasCorretasErradasPorUsuario(fkUsuario, isCorreta){
  var instrucaoSql = `SELECT COUNT(isCorreta) as corretas FROM Resposta WHERE isCorreta = '${isCorreta}' AND fkUsuario = ${fkUsuario};`
  return database.executar(instrucaoSql);
}
// Listar quantidade de respostas por usuario
function listarRespostasPorUsuario(fkUsuario){
  var instrucaoSql = `SELECT COUNT(isCorreta) as corretas FROM Resposta WHERE fkUsuario = ${fkUsuario};`
  return database.executar(instrucaoSql);
}
// Listar quantidade de respostas certas e erradas de todos os usuarios
function listarRespostasCorretasErrada(isCorreta){
  var instrucaoSql = `SELECT COUNT(isCorreta) as corretas FROM Resposta WHERE isCorreta = '${isCorreta}';`
  return database.executar(instrucaoSql);
}

// Listar quantidade de respostas de todos os usuarios
function listarRespostas(){
  var instrucaoSql = `SELECT COUNT(isCorreta) as corretas FROM resposta;`
  return database.executar(instrucaoSql);
}
module.exports = {
  cadastrar,
  listarRespostasCorretasErradasPorUsuario,
  listarRespostasPorUsuario,
  listarRespostasCorretasErrada,
  listarRespostas
};
