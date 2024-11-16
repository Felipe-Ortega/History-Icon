var respostaModel = require("../models/respostaModel");

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
    respostaModel
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

function listarRespostasCorretasErradasPorUsuario(req, res) {
  fkUsuario = req.params.idUsuario;
  isCorreta = req.params.isCorreta;
  respostaModel.listarRespostasCorretasErradasPorUsuario(fkUsuario, isCorreta).then((resultado) => {
    res.status(200).json(resultado)
  })
}
function listarRespostasPorUsuario(req, res){
  fkUsuario = req.params.idUsuario
  respostaModel.listarRespostasPorUsuario(fkUsuario).then((resultado) => {
    res.status(200).json(resultado)
  })
}
function cadastrarLog(req, res) {
  var fkPergunta = req.body.idPergunta;
  var dtHora = req.body.dtServer;
  usuarioModel
    .cadastrarLog(fkPergunta, dtHora)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o cadastro! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}
function listarRespostasCorretasErrada(req,res) {
  var isCorreta = req.params.isCorreta;
  respostaModel.listarRespostasCorretasErrada(isCorreta).then((resultado) => {
    res.status(200).json(resultado)
  })
}

function listarRespostas(req,res){
  respostaModel.listarRespostas(req,res).then((resultado => {
    res.status(200).json(resultado)
  }))
}
module.exports = {
  cadastrar,
  listarRespostasCorretasErradasPorUsuario,
  listarRespostasPorUsuario,
  listarRespostasCorretasErrada,
  listarRespostas,
  cadastrarLog
};
