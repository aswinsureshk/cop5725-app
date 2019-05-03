var express = require("express")
var router = express.Router()
var app = express()

router.get("/trends", function(req,res){
    res.render('trends/trends',{page_title:"Trends Table"});
})

module.exports = router