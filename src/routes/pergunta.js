var express = require("express");
var router = express.Router();

var perguntaController = require("../controllers/perguntaController");

router.post("/cadastrar", function(req,res){
    perguntaController.cadastrar(req, res);
})

module.exports = router; 