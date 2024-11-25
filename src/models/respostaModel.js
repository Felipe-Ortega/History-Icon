const { parse } = require("path");
var database = require("../database/config");

function cadastrar(fkUsuario, fkPergunta, resposta, isCorreta) {
  var instrucaoSql = `INSERT INTO Resposta (fkUsuario, fkPergunta, resposta, isCorreta) VALUES (${fkUsuario}, ${fkPergunta}, '${resposta}','${isCorreta}')`;
  return database.executar(instrucaoSql);
}
// Listar quantidade de corretas ou erradas por usuario
function listarRespostasCorretasErradasPorUsuario(fkUsuario, isCorreta, dias) {
  var instrucaoSql = `
    SELECT COUNT(isCorreta) as corretas 
    FROM Resposta
    JOIN Log_resposta
        ON Resposta.idResposta = Log_resposta.fkResposta
    WHERE isCorreta = '${isCorreta}' 
      AND Resposta.fkUsuario = ${parseInt(fkUsuario, 10)} 
      AND dtHrResposta >= NOW() - INTERVAL ${parseInt(dias, 10)} DAY;
  `;
  return database.executar(instrucaoSql);
}

// Listar quantidade de respostas por usuario
function listarRespostasPorUsuario(fkUsuario, dias) {
  var instrucaoSql = `
    SELECT COUNT(isCorreta) as corretas 
    FROM Resposta
    JOIN Log_resposta
        ON Resposta.idResposta = Log_resposta.fkResposta
    WHERE Resposta.fkUsuario = ${parseInt(fkUsuario, 10)} 
      AND dtHrResposta >= NOW() - INTERVAL ${parseInt(dias, 10)} DAY;
  `;
  return database.executar(instrucaoSql);
}

// Listar quantidade de respostas certas e erradas de todos os usuarios
function listarRespostasCorretasErrada(isCorreta, dias) {
  var instrucaoSql = `
    SELECT COUNT(isCorreta) as corretas 
    FROM Resposta
    JOIN Log_resposta
        ON Resposta.idResposta = Log_resposta.fkResposta
    WHERE isCorreta = '${isCorreta}' 
      AND dtHrResposta >= NOW() - INTERVAL ${parseInt(dias, 10)} DAY;
  `;
  return database.executar(instrucaoSql);
}

// Listar quantidade de respostas de todos os usuarios
function listarRespostas(dias) {
  var instrucaoSql = `
    SELECT COUNT(isCorreta) as corretas 
    FROM Resposta
    JOIN Log_resposta
        ON Resposta.idResposta = Log_resposta.fkResposta
    WHERE dtHrResposta >= NOW() - INTERVAL ${parseInt(dias, 10)} DAY;
  `;
  return database.executar(instrucaoSql);
}

function listarRankingRespostas(dias) {
  var instrucaoSql = `
    SELECT
        nome,
        (
            CASE
                WHEN COUNT(isCorreta) = 0 THEN 0
                ELSE SUM(
                    CASE
                        WHEN isCorreta = 'S' THEN 1
                        ELSE 0
                    END
                ) / COUNT(isCorreta)
            END
        ) * 100 AS aproveitamento
    FROM Resposta
    JOIN Usuario 
        ON Resposta.fkUsuario = Usuario.idUsuario
    JOIN Log_resposta
        ON Resposta.idResposta = Log_resposta.fkResposta
    WHERE dtHrResposta >= NOW() - INTERVAL ${parseInt(dias, 10)} DAY
    GROUP BY nome
    ORDER BY aproveitamento DESC;
  `;

  return database.executar(instrucaoSql);
}


function cadastrarLog(fkUsuario, fkPergunta, fkResposta, dtHr) {
  var instrucaoSql = `INSERT INTO Log_resposta (fkUsuario, fkPergunta, fkResposta, dtHrResposta) VALUES (${fkUsuario}, ${fkPergunta}, ${fkResposta}, '${dtHr}')`
  return database.executar(instrucaoSql);

}

 function listarDesempenhoUsuarioDias(dias, idUsuario){
  var instrucaoSql = `SELECT
    nome,
    dtHrResposta,
    (
        CASE
            WHEN COUNT(isCorreta) = 0 THEN 0
            ELSE SUM(
                CASE
                    WHEN isCorreta = 'S' THEN 1
                    ELSE 0
                END
            ) / COUNT(isCorreta)
        END
    ) * 100 AS aproveitamento
FROM Resposta
JOIN Usuario 
    ON Resposta.fkUsuario = Usuario.idUsuario
JOIN Log_resposta
    ON Resposta.idResposta = Log_resposta.fkResposta
WHERE dtHrResposta >= NOW() - INTERVAL ${parseInt(dias, 10)} DAY AND idUsuario = ${parseInt(idUsuario, 10)}
GROUP BY nome, dtHrResposta
ORDER BY aproveitamento DESC;`;
return database.executar(instrucaoSql);

 }
module.exports = {
  cadastrarLog,
  cadastrar,
  listarRespostasCorretasErradasPorUsuario,
  listarRespostasPorUsuario,
  listarRespostasCorretasErrada,
  listarRespostas,
  listarRankingRespostas,
  listarDesempenhoUsuarioDias
};

