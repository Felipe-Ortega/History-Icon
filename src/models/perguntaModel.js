var database = require("../database/config");

function cadastrar(titulo, op1, op2, op3, op4, respostaCorreta){
    var instrucaoSql = `INSERT INTO Pergunta (opt1, opt2, opt3, opt4, titulo, respostaCorreta) VALUES ('${op1}', '${op2}', '${op3}', '${op4}', '${titulo}', '${respostaCorreta}')
    `
    return database.executar(instrucaoSql);
}

function listarAleatorio(){
    var instrucaoSql = `SELECT * FROM PerguntaORDER BY RAND() LIMIT 10;`
    return database.executar(instrucaoSql);

}

module.exports = {
    cadastrar,
    listarAleatorio
};