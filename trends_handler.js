
var express = require("express")
var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
var app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/getWeeklyAccidentStatistics", function(req,res){
    getWeeklyAccidentStatistics(
         function(err,result){
             if(!err){
                res.send({rows:result.rows})
             }
             else
               console.log(err)
         })
})

app.get("/getAccidentsPerRegion", function(req,res){
  getAccidentsPerRegion(
       function(err,result){
           if(!err){
              res.send({rows:result.rows})
           }
           else
             console.log(err)
       })
})

app.get("/getVehicleAccident", function(req,res){
  getVehicleAccident(
       function(err,result){
           if(!err){
              res.send({rows:result.rows})
           }
           else
             console.log(err)
       })
})

app.get("/getAADT", function(req,res){
  getAADT(
       function(err,result){
           if(!err){
              res.send({rows:result.rows})
           }
           else
             console.log(err)
       })
})

app.get("/getHourlyAccidents", function(req,res){
  getHourlyAccidents(
       function(err,result){
           if(!err){
              res.send({rows:result.rows})
           }
           else
             console.log(err)
       })
})

function getWeeklyAccidentStatistics(cb){
    return connect().then(result => {
         connection = result;
         let cmd = `SELECT accident_table.ACCIDENT_YEAR AS YEAR_OF_ACCIDENT,accident_table.DAY_OF_WEEK AS 
         DAY_OF_WEEK_OF_ACCIDENT, SUM (features_of_accidents.NUMBER_OF_CASUALITITES) AS TOTAL_SUM_OF_CASUALITIES
         FROM ACCIDENT accident_table,ACCIDENT_FEATURES features_of_accidents 
         WHERE accident_table.ACCIDENT_ID=features_of_accidents.ACCIDENT_ID 
         GROUP BY accident_table.accident_year,accident_table.day_of_week 
         ORDER BY accident_table.ACCIDENT_YEAR ASC,accident_table.DAY_OF_WEEK ASC`;
         return executeCmd(connection, cmd, [], 
          function(err,result){
              if(!err){
                //   console.log(result)
                  return cb(null, result)
              }
          });
     });
  }

  function getAccidentsPerRegion(cb){
    return connect().then(result => {
         connection = result;
         let cmd = `select second_composite_table.region_name,
         round(second_composite_table.total_number_of_accidents*100/(select sum(TOTAL_NUMBER_OF_ACCIDENTS) from
         (select first_composite_table.region_name, count(*) as TOTAL_NUMBER_OF_ACCIDENTS from (select * from 
         accident accident_table,road road_table,local_authority local_authority_table,region region_table where
         accident_table.road_id=road_table.road_id and road_table.la_code=local_authority_table.la_code and 
         local_authority_table.region_id=region_table.region_id) first_composite_table group by first_composite_table.region_name)),2)
         as PERCENTAGE_OF_TOTAL_NUMBER_OF_ACCIDENTS_IN_UNITED_KINGDOM from(select first_composite_table.region_name, 
         count(*) as TOTAL_NUMBER_OF_ACCIDENTS from (select * from accident accident_table,road road_table,local_authority 
         local_authority_table,region region_table where accident_table.road_id=road_table.road_id and 
         road_table.la_code=local_authority_table.la_code and local_authority_table.region_id=region_table.region_id) 
         first_composite_table group by first_composite_table.region_name) second_composite_table`;
          return executeCmd(connection, cmd, [], 
          function(err,result){
              if(!err){
                //   console.log(result)
                  return cb(null, result)
              }
          });
     });
  }

  function getVehicleAccident(cb){
    return connect().then(result => {
         connection = result;
         let cmd = `select YEAR_ACCIDENT_OCCURED as YEAR_OF_ACCIDENT,month as MONTH_OF_ACCIDENT,sum(TOTAL_VEHICLES)
          as TOTAL_NUMBER_OF_VEHICLES_INVOLVED_IN_ACCIDENTS from (select number_of_vehicles as TOTAL_VEHICLES,accident_year
          as YEAR_ACCIDENT_OCCURED,substr(accident_date,4,2) as month from accident TABLE_OF_ACCIDENTS,accident_features 
          TABLE_OF_ACCIDENT_FEATURES where TABLE_OF_ACCIDENTS.accident_id=TABLE_OF_ACCIDENT_FEATURES.accident_id) group by
          YEAR_ACCIDENT_OCCURED,MONTH order by YEAR_ACCIDENT_OCCURED ASC,MONTH asc`;
                  return executeCmd(connection, cmd, [], 
          function(err,result){
              if(!err){
                //   console.log(result)
                  return cb(null, result)
              }
          });
     });
  }

  function getAADT(cb){
      return connect().then(result => {
              connection = result;
              let cmd = `SELECT * FROM (SELECT R1.ROAD_CATEGORY,ROUND(SUM(AADT)) AS AADT FROM ROAD R1,
              (SELECT ROAD_ID,(PEDAL_CYCLES+MOTOR_CYCLES+CARS_TAXIS+HGV+LGV+BUSES_COACHES+ALL_MOTOR_VEHICLES)/365 AS AADT FROM AADF) R2
              WHERE R1.ROAD_ID=R2.ROAD_ID
              GROUP BY R1.ROAD_CATEGORY) X1
              JOIN
              (SELECT R2.ROAD_CATEGORY,COUNT(*)AS TNA FROM ACCIDENT, ROAD R2 WHERE 
              ACCIDENT.ROAD_ID=R2.ROAD_ID GROUP BY R2.ROAD_CATEGORY) X2 USING(ROAD_CATEGORY)`;
                      return executeCmd(connection, cmd, [], 
              function(err,result){
                  if(!err){
                    //   console.log(result)
                      return cb(null, result)
                  }
              });
            });
        }

        function getHourlyAccidents(cb){
          return connect().then(result => {
                  connection = result;
                  let cmd = `SELECT DAY_OF_WEEK,ACCIDENT_HOUR,SUM(NUMBER_OF_ACCIDENTS) AS HOURLY_NUMBER_OF_ACCIDENTS FROM 
                  (SELECT DAY_OF_WEEK,ACCIDENT_TIME,COUNT(*) AS NUMBER_OF_ACCIDENTS,SUBSTR(ACCIDENT_TIME,1,2) AS ACCIDENT_HOUR 
                  FROM ACCIDENT WHERE ACCIDENT_TIME IS NOT NULL GROUP BY DAY_OF_WEEK,ACCIDENT_TIME ORDER BY DAY_OF_WEEK,ACCIDENT_TIME) 
                  GROUP BY DAY_OF_WEEK,ACCIDENT_HOUR ORDER BY DAY_OF_WEEK,ACCIDENT_HOUR`;
                          return executeCmd(connection, cmd, [], 
                  function(err,result){
                      if(!err){
                        //   console.log(result)
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

module.exports = app
