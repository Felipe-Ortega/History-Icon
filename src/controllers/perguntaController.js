var perguntaModel = require("../models/perguntaModel");
function listarAleatorio(req,res){
  perguntaModel.listarAleatorio().then((resultado) => {
    res.status(200).json(resultado)
  })
}2
function cadastrar(req, res) {
  (op1 = req.body.op1Server),
    (op2 = req.body.op2Server),
    (op3 = req.body.op3Server),
    (op4 = req.body.op4Server),
    (titulo = req.body.tituloServer),
    (respCorreta = req.body.respostaCorreta);

  perguntaModel
    .cadastrar(titulo,op1, op2, op3, op4, respCorreta)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("\n Erro ao cadastrar pergunta! Erro: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function listarAleatorio(req,res){
  perguntaModel.listarAleatorio(req,res).then((resultado => {
    res.status(200).json(resultado)
  }))
}
module.exports = {
  cadastrar,
  listarAleatorio
};
