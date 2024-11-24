var express = require("express");
var router = express.Router();

var respostaController = require("../controllers/respostaController");

router.post("/cadastrar", function(req,res){
    respostaController.cadastrar(req, res);
})

//Listar total de respostas corretas ou erradas por usuario
router.get("/listarRespostas/:idUsuario/:isCorreta/:dias", function (req,res){
    respostaController.listarRespostasCorretasErradasPorUsuario(req,res)
})

//Listar total de respostas por usuario
router.get("/listarRespostas/:idUsuario/:dias", function (req,res){
    respostaController.listarRespostasPorUsuario(req,res)
})

//Listar total de respostas corretas ou erradas
router.get("/listarRespostasTotal/:isCorreta/:dias", function (req,res){
    respostaController.listarRespostasCorretasErrada(req,res)
})

//Listar total de respostas de todos os usuários
router.get("/listarRespostas/:dias", function (req,res){
    respostaController.listarRespostas(req,res)
})

router.get("/listarRankingCorretas/:dias", function(req,res){
    respostaController.listarRankingCorretas(req,res)
})

router.get("/listarRankingRespostas/:dias", function(req,res){
    respostaController.listarRankingRespostas(req,res)
})

router.post("/cadastrarLog", function(req,res){
    respostaController.cadastrarLog(req,res)
})
module.exports = router;
