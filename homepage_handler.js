
var express = require("express")
var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
var app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/searchaccidents', function (req, res){
      console.log('got')   
      console.log(req.body.local_authority);
      local_authority = req.body.local_authority ;  
      getLocalAuthority(local_authority).then(result => {
        console.log(result.rows)
       if(result.rows==undefined || result.rows==null || result.rows.length==0)
          res.status(400).send()
       else
         res.send(JSON.stringify({redirect:'/accident?local_authority='+local_authority}));
    }).catch(function(e) {
        res.status(400).send()
     });    
});

app.get('/viewdangerscreen', function (req, res){
  res.send(JSON.stringify({redirect:'/dangerscreen'}));
});

app.post('/viewtrends', function (req, res){
  console.log('got')   
  res.send(JSON.stringify({redirect:'/trends'}));
});

app.post('/viewdangerfactor', function (req, res){
  console.log('got')   
  res.send(JSON.stringify({redirect:'/dangerscreen'}));
});

app.get('/getLocalAuthorities', function (req, res){
  console.log('got') 
  getLocalAllAuthorities().then(result => {
      res.send({las:result.rows});
  }).catch(function(e){
    res.status(400).send()  
  });
});

function getLocalAuthority(la){
  return connect().then(result => {
       connection = result;
       let cmd = `SELECT LA_NAME FROM LOCAL_AUTHORITY WHERE LA_NAME=:la`;
       return executeCmd(connection, cmd, [la]).then(result=>
               {return result}).catch(function(e) {
                   console.log('Error executing query'); 
                });;
   });
}

function getLocalAllAuthorities(){
  return connect().then(result => {
       connection = result;
       let cmd = `SELECT LA_NAME FROM LOCAL_AUTHORITY`;
       return executeCmd(connection, cmd, []).then(result=>
               {return result}).catch(function(e) {
                   console.log('Error executing query'); 
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
             });
          
     }

  module.exports = app