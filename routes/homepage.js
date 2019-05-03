var express = require("express")
var router = express.Router()

router.get("/homepage", function(req, res){
  
    res.render('homepage/homepage');
  });

  module.exports = router
