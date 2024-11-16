var express = require("express");
var router = express.Router();

var respostaController = require("../controllers/respostaController");

router.post("/cadastrar", function(req,res){
    respostaController.cadastrar(req, res);
})

//Listar total de respostas corretas ou erradas por usuario
router.get("/listarRespostas/:idUsuario/:isCorreta", function (req,res){
    respostaController.listarRespostasCorretasErradasPorUsuario(req,res)
})

//Listar total de respostas por usuario
router.get("/listarRespostas/:idUsuario", function (req,res){
    respostaController.listarRespostasPorUsuario(req,res)
})

//Listar total de respostas corretas ou erradas
router.get("/listarRespostasTotal/:isCorreta", function (req,res){
    respostaController.listarRespostasCorretasErrada(req,res)
})

//Listar total de respostas de todos os usuários
router.get("/listarRespostas", function (req,res){
    respostaController.listarRespostas(req,res)
})

router.get("/listarRankingCorretas", function(req,res){
    respostaController.listarRankingCorretas(req,res)
})

router.get("/listarRankingRespostas", function(req,res){
    respostaController.listarRankingRespostas(req,res)
})
module.exports = router;
