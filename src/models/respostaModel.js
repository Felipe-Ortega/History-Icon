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
  var instrucaoSql = `SELECT COUNT(isCorreta) as corretas FROM Resposta;`
  return database.executar(instrucaoSql);
}

function listarRankingRespostas(){
  var instrucaoSql = `SELECT
    nome,
    (
        SUM(
            CASE
                WHEN isCorreta = 'S' THEN 1
                ELSE 0
            END
        ) / COUNT(isCorreta)
    ) * 100 AS aproveitamento
FROM Resposta
    JOIN Usuario ON Resposta.fkUsuario = Usuario.idUsuario
GROUP BY
    nome
ORDER BY aproveitamento DESC;`
 return database.executar(instrucaoSql);
}

module.exports = {
  cadastrar,
  listarRespostasCorretasErradasPorUsuario,
  listarRespostasPorUsuario,
  listarRespostasCorretasErrada,
  listarRespostas,
  listarRankingRespostas
};
