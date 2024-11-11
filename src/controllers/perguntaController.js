var perguntaModel = require("../models/perguntaModel");

function cadastrar(req, res) {
  fkUsuario = req.body.idServer;
  fkPergunta = req.body.fkPergunta;
  resposta = req.body.resposta;
  isCorreta = req.body.isCorreta;
  if (fkUsuario == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (fkPergunta == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (resposta == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else {
    perguntaModel
      .cadastrar(fkUsuario, fkPergunta, resposta, isCorreta)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("\n Erro ao cadastrar resposta! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function listarRespostas(req, res) {
  perguntaModel
    .listarRespostas().then(function (resultadoListar) {
      console.log(`\n resultados encontrados: ${resultadoListar.length}`);
      if (resultadoListar.length > 0) {
        res.status(200).json(resultadoListar);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("\n erro ao listar! Erro: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  cadastrar,
  listarRespostas,
};
