
function drawBarChartGrouped(data){

   var data_2005=[]; var data_2006=[]; var data_2007=[];
  
   for(var i=0;i<data.length;i++){
     if(data[i].YEAR_OF_ACCIDENT==2005)
        data_2005.push(data[i].TOTAL_SUM_OF_CASUALITIES)
     else if(data[i].YEAR_OF_ACCIDENT==2006)
        data_2006.push(data[i].TOTAL_SUM_OF_CASUALITIES)
     else if(data[i].YEAR_OF_ACCIDENT==2007)
        data_2007.push(data[i].TOTAL_SUM_OF_CASUALITIES)
   }

    new Chart(document.getElementById("bar-chart-grouped"), {
      type: 'bar',
      data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
          {
            label: "2005",
            backgroundColor: "#3e95cd",
            data: data_2005
          }, {
            label: "2006",
            backgroundColor: "#8e5ea2",
            data: data_2006
          },
          {
            label: "2007",
            backgroundColor: "#745e1a",
            data: data_2007
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Number of casualities distribution over the days',
          fontSize: 25,
        },scales:{
          yAxes: [{ 
            scaleLabel: {
              display: true,
              labelString: "Number of Casualties"
            }
          }],
          xAxes: [{ 
            scaleLabel: {
              display: true,
              labelString: "Days"
            }
          }]
        }
      }
    });
  
}


function drawPieChart(data){

  var region_names=[], region_percentages=[], colors=[];

  function getRandomColor(){
      return '#'+Math.floor(Math.random()*16777215).toString(16);
  }

  for(var i=0;i<data.length;i++){
    region_names.push(data[i].REGION_NAME)
    region_percentages.push(data[i].PERCENTAGE_OF_TOTAL_NUMBER_OF_ACCIDENTS_IN_UNITED_KINGDOM)
    colors.push(getRandomColor());
  }
    new Chart(document.getElementById("pie-chart"), {
      type: 'pie',
      data: {
        labels: region_names,
        datasets: [{
          label: "Percentage",
          backgroundColor: colors,
          data: region_percentages
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Percentage of accidents in different regions',
          fontSize: 25
        }
      }
    });
  }

function drawLineChartForVehicleAccident(data){

  var data_2005=[]; var data_2006=[]; var data_2007=[];
  
   for(var i=0;i<data.length;i++){
     if(data[i].YEAR_OF_ACCIDENT==2005)
        data_2005.push(data[i].TOTAL_NUMBER_OF_VEHICLES_INVOLVED_IN_ACCIDENTS)
     else if(data[i].YEAR_OF_ACCIDENT==2006)
        data_2006.push(data[i].TOTAL_NUMBER_OF_VEHICLES_INVOLVED_IN_ACCIDENTS)
     else if(data[i].YEAR_OF_ACCIDENT==2007)
        data_2007.push(data[i].TOTAL_NUMBER_OF_VEHICLES_INVOLVED_IN_ACCIDENTS)
   }
      new Chart(document.getElementById("line-chart"), {
            type: 'line',
            data: {
              labels: ["January","February","March","April","May","June","July","August","September","October","November","December"],
              datasets: [{ 
                data: data_2005,
                label: "2005",
                borderColor: "#3e95cd",
                fill: false
              }, { 
                data: data_2006,
                label: "2006",
                borderColor: "#8e5ea2",
                fill: false
              }, { 
                data: data_2007,
                label: "2007",
                borderColor: "#3cba9f",
                fill: false
              }
              ]
            },
            options: {
              title: {
              display: true,
              text: 'Number of vehicles involved in the accidents over the months',
              fontSize: 25 
            },
            scales:{
              yAxes: [{ 
                scaleLabel: {
                  display: true,
                  labelString: "Number of Vehicles"
                }
              }],
              xAxes: [{ 
                scaleLabel: {
                  display: true,
                  labelString: "Months"
                }
              }]
            }
            }
            });
          }

          function drawBubbleChart(data){

            function getRandomColor(){
              return '#'+Math.floor(Math.random()*16777215).toString(16);
            }

            var xmap = new Map();
            var ymap = new Map();
            
             for(var i=0;i<data.length;i++){
                  xmap.set(data[i].ROAD_CATEGORY,data[i].AADT);
                  ymap.set(data[i].ROAD_CATEGORY,data[i].TNA);
            }
                new Chart(document.getElementById("bubble-chart"), {
                      type: 'bubble',
                      data: {
                        // labels: ["TR","February","March","April","May","June","July","August","September","October","November","December"],
                        datasets: [{ 
                          label: "Class A Trunk Road in Rural Area",
                          backgroundColor: getRandomColor(),
                          borderColor: getRandomColor(),
                          data: [{
                            x: xmap.get("TR"),
                            y: ymap.get("TR"),
                            r: 5
                          }]
                        }, { 
                          label: "Class A Principal Road in Rural Area",
                          backgroundColor: getRandomColor(),
                          borderColor: getRandomColor(),
                          data: [{
                            x: xmap.get("PR"),
                            y: ymap.get("PR"),
                            r: 5
                          }]
                        }, { 
                          label: "Class B Principal Road in Urban Area",
                          backgroundColor: getRandomColor(),
                          borderColor: getRandomColor(),
                          data: [{
                            x: xmap.get("Pu"),
                            y: ymap.get("Pu"),
                            r: 5                       
                          }]
                        },{
                          label: "Class A Principal Road in Urban Area",
                          backgroundColor: getRandomColor(),
                          borderColor: getRandomColor(),
                          data: [{
                            x: xmap.get("PU"),
                            y: ymap.get("PU"),
                            r: 5
                          }]
                        }, { 
                          label: "Class B Trunk Road in Urban Area",
                          backgroundColor: getRandomColor(),
                          borderColor: getRandomColor(),
                          data: [{
                            x: xmap.get("Tu"),
                            y: ymap.get("Tu"),
                            r: 5
                          }]
                        }, { 
                          label: "Class A Trunk Road in Urban Area",
                          backgroundColor: getRandomColor(),
                          borderColor: getRandomColor(),
                          data: [{
                            x: xmap.get("TU"),
                            y: ymap.get("TU"),
                            r: 5
                          }]
                        },{
                          label: "M or Class A Principal Motorway",
                          backgroundColor: getRandomColor(),
                          borderColor: getRandomColor(),
                          data: [{
                            x: xmap.get("PM"),
                            y: ymap.get("PM"),
                            r: 5
                          }]
                        }, { 
                          label: "M or Class A Trunk MotorWay",
                          backgroundColor: getRandomColor(),
                          borderColor: getRandomColor(),
                          data: [{
                            x: xmap.get("TM"),
                            y: ymap.get("TM"),
                            r:5
                          }]
                        }
                        ]
                      },
                      options: {
                        title: {
                          display: true,
                          text: 'AADT - Annual Average Daily Traffic',
                          fontSize: 25,
                        }, scales: {
                          yAxes: [{ 
                            scaleLabel: {
                              display: true,
                              labelString: "Number of Accidents"
                            }
                          }],
                          xAxes: [{ 
                            scaleLabel: {
                              display: true,
                              labelString: "Annual Average Daily Traffic"
                            }
                          }]
                        }
                      }
                      });
                    }

  function drawLineChartForHourlyAccidents(data){

    function getRandomColor(){
      return '#'+Math.floor(Math.random()*16777215).toString(16);
    }
    var data_sunday=[], data_monday=[], data_tuesday=[], data_wednesday=[], data_thursday=[], data_friday=[], data_saturday=[];
    
      for(var i=0;i<data.length;i++){
        if(data[i].DAY_OF_WEEK==1){
          data_sunday.push(data[i].HOURLY_NUMBER_OF_ACCIDENTS);
        }
        else if(data[i].DAY_OF_WEEK==2){
          data_monday.push(data[i].HOURLY_NUMBER_OF_ACCIDENTS);
        }
        else if(data[i].DAY_OF_WEEK==3){
          data_tuesday.push(data[i].HOURLY_NUMBER_OF_ACCIDENTS);
        }
        else if(data[i].DAY_OF_WEEK==4){
          data_wednesday.push(data[i].HOURLY_NUMBER_OF_ACCIDENTS);
        }
        else if(data[i].DAY_OF_WEEK==5){
          data_thursday.push(data[i].HOURLY_NUMBER_OF_ACCIDENTS);
        }
        else if(data[i].DAY_OF_WEEK==6){
          data_friday.push(data[i].HOURLY_NUMBER_OF_ACCIDENTS);
        }
        else if(data[i].DAY_OF_WEEK==7){
          data_saturday.push(data[i].HOURLY_NUMBER_OF_ACCIDENTS);
        }
      }
        new Chart(document.getElementById("line-chart-2"), {
              type: 'line',
              data: {
                labels: ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],
                datasets: [{ 
                  data: data_sunday,
                  label: "Sunday",
                  borderColor: getRandomColor(),
                  fill: false
                }, { 
                  data: data_monday,
                  label: "Monday",
                  borderColor: getRandomColor(),
                  fill: false
                }, { 
                  data: data_tuesday,
                  label: "Tuesday",
                  borderColor: getRandomColor(),
                  fill: false
                }, { 
                  data: data_wednesday,
                  label: "Wednesday",
                  borderColor: getRandomColor(),
                  fill: false
                }, { 
                  data: data_thursday,
                  label: "Thursday",
                  borderColor: getRandomColor(),
                  fill: false
                }, { 
                  data: data_friday,
                  label: "Friday",
                  borderColor: getRandomColor(),
                  fill: false
                }, { 
                  data: data_saturday,
                  label: "Saturday",
                  borderColor: getRandomColor(),
                  fill: false
                }
                ]
              },
              options: {
                title: {
                display: true,
                text: 'Number of accidents during daily hours',
                fontSize: 25 
              },
              scales:{
                yAxes: [{ 
                  scaleLabel: {
                    display: true,
                    labelString: "Number of Accidents"
                  }
                }],
                xAxes: [{ 
                  scaleLabel: {
                    display: true,
                    labelString: "Hour of Day"
                  }
                }]
              }
              }
              });
            }



  /*




new Chart(document.getElementById("bar-chart"), {
  type: 'bar',
  data: {
    labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: [2478,5267,734,784,433]
      }
    ]
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: 'Predicted world population (millions) in 2050'
    }
  }
});

new Chart(document.getElementById("radar-chart"), {
  type: 'radar',
  data: {
    labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    datasets: [
      {
        label: "1950",
        fill: true,
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(179,181,198,1)",
        data: [8.77,55.61,21.69,6.62,6.82]
      }, {
        label: "2050",
        fill: true,
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(255,99,132,1)",
        pointBorderColor: "#fff",
        data: [25.48,54.16,7.61,8.06,4.45]
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Distribution in % of world population'
    }
  }
});

new Chart(document.getElementById("polar-chart"), {
  type: 'polarArea',
  data: {
    labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: [2478,5267,734,784,433]
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Predicted world population (millions) in 2050'
    }
  }
});

new Chart(document.getElementById("doughnut-chart"), {
  type: 'doughnut',
  data: {
    labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: [2478,5267,734,784,433]
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Predicted world population (millions) in 2050'
    }
  }
});

new Chart(document.getElementById("bar-chart-horizontal"), {
  type: 'horizontalBar',
  data: {
    labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: [2478,5267,734,784,433]
      }
    ]
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: 'Predicted world population (millions) in 2050'
    }
  }
});

new Chart(document.getElementById("mixed-chart"), {
  type: 'bar',
  data: {
    labels: ["1900", "1950", "1999", "2050"],
    datasets: [{
        label: "Europe",
        type: "line",
        borderColor: "#8e5ea2",
        data: [408,547,675,734],
        fill: false
      }, {
        label: "Africa",
        type: "line",
        borderColor: "#3e95cd",
        data: [133,221,783,2478],
        fill: false
      }, {
        label: "Europe",
        type: "bar",
        backgroundColor: "rgba(0,0,0,0.2)",
        data: [408,547,675,734],
      }, {
        label: "Africa",
        type: "bar",
        backgroundColor: "rgba(0,0,0,0.2)",
        backgroundColorHover: "#3e95cd",
        data: [133,221,783,2478]
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Population growth (millions): Europe & Africa'
    },
    legend: { display: false }
  }
});

new Chart(document.getElementById("bubble-chart"), {
  type: 'bubble',
  data: {
    labels: "Africa",
    datasets: [
      {
        label: ["China"],
        backgroundColor: "rgba(255,221,50,0.2)",
        borderColor: "rgba(255,221,50,1)",
        data: [{
          x: 21269017,
          y: 5.245,
          r: 15
        }]
      }, {
        label: ["Denmark"],
        backgroundColor: "rgba(60,186,159,0.2)",
        borderColor: "rgba(60,186,159,1)",
        data: [{
          x: 258702,
          y: 7.526,
          r: 10
        }]
      }, {
        label: ["Germany"],
        backgroundColor: "rgba(0,0,0,0.2)",
        borderColor: "#000",
        data: [{
          x: 3979083,
          y: 6.994,
          r: 15
        }]
      }, {
        label: ["Japan"],
        backgroundColor: "rgba(193,46,12,0.2)",
        borderColor: "rgba(193,46,12,1)",
        data: [{
          x: 4931877,
          y: 5.921,
          r: 15
        }]
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Predicted world population (millions) in 2050'
    }, scales: {
      yAxes: [{ 
        scaleLabel: {
          display: true,
          labelString: "Happiness"
        }
      }],
      xAxes: [{ 
        scaleLabel: {
          display: true,
          labelString: "GDP (PPP)"
        }
      }]
    }
  }
});

*/