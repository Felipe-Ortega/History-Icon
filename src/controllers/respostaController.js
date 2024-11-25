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
   dias = req.params.dias;

  respostaModel
    .listarRespostasCorretasErradasPorUsuario(fkUsuario, isCorreta, dias)
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.error(
        "\nHouve um erro ao buscar as respostas corretas ou erradas por usuário! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function listarRespostasPorUsuario(req, res) {
   fkUsuario = req.params.idUsuario;
   dias = req.params.dias;

  respostaModel
    .listarRespostasPorUsuario(fkUsuario, dias)
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.error(
        "\nHouve um erro ao buscar as respostas por usuário! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function listarRespostasCorretasErrada(req, res) {
   isCorreta = req.params.isCorreta;
   dias = req.params.dias;

  respostaModel
    .listarRespostasCorretasErrada(isCorreta, dias)
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.error(
        "\nHouve um erro ao buscar respostas corretas ou erradas! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function listarRespostas(req, res) {
  dias = req.params.dias;
  respostaModel
    .listarRespostas(dias)
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.error(
        "\nHouve um erro ao buscar as respostas! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function listarRankingRespostas(req, res) {
  dias = req.params.dias;
  console.log(`Testando dias no controller: ${dias}`);
  respostaModel
    .listarRankingRespostas(dias)
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.error(
        "\nHouve um erro ao buscar o ranking de respostas! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function cadastrarLog(req, res) {
  var fkPergunta = req.body.fkPergunta;
  var dtHora = req.body.dtHrAcesso;
  var fkResposta = req.body.fkResposta
  var fkUsuario = req.body.fkUsuario

  respostaModel
    .cadastrarLog(fkUsuario, fkPergunta, fkResposta, dtHora)
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

function listarDesempenhoUsuarioDias(req,res){
  var idUsuario = Number(req.params.idUsuario)
  var dias = Number(req.params.dias)
  console.log(dias + "testando diassssssssss")
  console.log(idUsuario + "testando usuariossssss")
  respostaModel.listarDesempenhoUsuarioDias(dias, idUsuario).then(function (resultado) {
    res.json(resultado);
  }).catch(function (erro) {
    console.log(erro)
    console.log(
      "\nHouve um erro ao listar o desempenho em dias! Erro: ",
      erro.sqlMessage
    );
    res.status(500).json(erro.sqlMessage);
  })
}
module.exports = {
  cadastrar,
  listarDesempenhoUsuarioDias,
  listarRespostasCorretasErradasPorUsuario,
  listarRespostasPorUsuario,
  listarRespostasCorretasErrada,
  listarRespostas,
  cadastrarLog,
  listarRankingRespostas
};
