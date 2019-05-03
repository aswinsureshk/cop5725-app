
var express = require("express")
var oracledb = require('oracledb');
var dbConfig = require('../dbconfig.js');
var router = express.Router()

router.get("/accident", function(req, res){
  console.log(req.query.local_authority)
   getAccidentsUsingLocalAuthority(
        function(err,result){
            if(!err){
                console.log(result.rows)
                res.render('accident/accident',{page_title:"Accident Table",header:result.metaData,data:result.rows});
            }
            else
              console.log(err)
        }, req.query.local_authority)
  });

  function getAccidentsUsingLocalAuthority(cb, local_authority){
    return connect().then(result => {
         connection = result;
         let cmd = `SELECT * FROM ACCIDENT,ROAD,LOCAL_AUTHORITY WHERE 
         ACCIDENT.ROAD_ID=ROAD.ROAD_ID AND ROAD.LA_CODE=LOCAL_AUTHORITY.LA_CODE AND
         LOCAL_AUTHORITY.LA_NAME=:la`;
         return executeCmd(connection, cmd, [local_authority], 
          function(err,result){
              if(!err){
                  console.log(result)
                  return cb(null, result)
              }
          });
     });
  }
 

function getAccident(cb) {
    let connection;
    return connect().then(result => {
        connection = result;
        let cmd = `SELECT * FROM ACCIDENT WHERE ROWNUM<10`;
        return executeCmd(connection, cmd, {}, 
            function(err,result){
                if(!err){
                    //console.log(result)
                    return cb(null, result)
                }
            });
    });
}

//to connect
function connect() {
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
  function executeCmd(connection, cmd, params, cb) {
    return connection.execute(cmd, params, { outFormat: oracledb.OBJECT },
         function(err, result) {
            if (err) {
                console.log(err.message)
                release(connection)
                return;
            } else {
                release(connection)
            // console.log(result.rows)
              return cb(null,result);
            }
          });
  }

module.exports = router
