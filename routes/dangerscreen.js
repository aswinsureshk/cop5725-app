var express = require("express")
var router = express.Router()

router.get("/dangerscreen", function(req, res){
        res.render('dangerscreen/dangerscreen',{page_title:"Danger Factor Table"});
  });

module.exports = router
