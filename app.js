var express = require("express")
var path = require("path")

var app = express();
var login = require('./routes/login');
var accident = require('./routes/accident'); 
var homepage = require('./routes/homepage');
var trends = require('./routes/trends')
var dangerscreen = require('./routes/dangerscreen')

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.static(__dirname + "/views"))
app.use(accident)
app.use(express.static(__dirname + "/views/login"))
app.use(login)
app.use(express.static(__dirname + "/views/homepage"))
app.use(homepage)
app.use(express.static(__dirname + "/views/trends"))
app.use(trends)
app.use(express.static(__dirname + "/views/dangerscreen"))
app.use(dangerscreen)

login_handler = require('./login_handler');
app.use(login_handler)
homepage_handler = require('./homepage_handler');
app.use(homepage_handler)
trends_handler = require('./trends_handler');
app.use(trends_handler)
dangerpage_handler = require('./dangerpage_handler');
app.use(dangerpage_handler)

app.listen(app.get("port"), function(){
    console.log("server started on port " + app.get("port"));
});
  
