
var express = require("express")
var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
var app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/validate', function (req, res){
      console.log('got')   
      console.log(req.body);
      username = req.body.name   
      password = req.body.pass
      console.log(req.body.pass)
      
      getPassword(username).then(result => {
            var entered_pass = password
            var db_pass = result.rows[0].PASSWORD
            if(entered_pass===db_pass)
                res.send(JSON.stringify({redirect:'/homepage?username='+username}))
            else
                res.status(400).send()

        }).catch(function(e) {
            res.status(400).send()
         });
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function getPassword(username){
   return connect().then(result => {
        connection = result;
        let cmd = `SELECT PASSWORD FROM APP_USER WHERE USER_NAME=:un`;
        return executeCmd(connection, cmd, [username]).then(result=>
                {return result}).catch(function(e) {
                    alert('Error executing query'); 
                 });;
    });
}

//to connect
function connect() {
//   alert(oracledb)
    return oracledb.getConnection(
      {
        user          : dbConfig.user,
        password      : dbConfig.password,
        connectString : dbConfig.connectString
      }
      );
  };
  
  //to release
 function release(conn) {
    conn.close(function (err) {
      if (err)
        console.error(err.message);
    });
  };

   //execute any command function 
  function executeCmd(connection, cmd, params) {
    return connection.execute(cmd, params, { outFormat: oracledb.OBJECT })
            .then(result=>   { 
                release(connection);
                return result;
            }
            ).catch(function(e) {
                release(connection);
                alert('Error executing query'); 
             });
          
     }

  module.exports = app