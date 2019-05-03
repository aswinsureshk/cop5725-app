var la_names=[], danger_factor=[], colors=[];
var reg_map = new Map();
var la_map = new Map(); 
var chart;

function storeData(data){
      function getRandomColor(){
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    }
      for(var i=0;i<data.length;i++){
        var reg = data[i].REGION_NAME;
        var la = data[i].LOCAL_AUTHORITY_NAME;
        var df = data[i].DANGER_FACTOR;
        if(!reg_map.has(reg)){
          reg_map.set(reg,[la]);
        }
        else{
          var mla = []
          mla = reg_map.get(reg)
          mla.push(la)
          reg_map.set(reg,mla);
        }
        if (la_map.has(la)){
          la_map.set(la, la_map.get(la)+df);
        }
        else{
          la_map.set(la, df);
        }
        colors.push(getRandomColor());
      }
      for(var [key,value] of la_map.entries()){
        la_names.push(key);
        danger_factor.push(value);
    }
}

function drawDoughnutChart(las, dfs){
  // console.log(reg_map)
  chart = new Chart(document.getElementById("doughnut-chart"), {

        type: 'doughnut',
        data: {
          labels: las,
          datasets: [{
            label: "Danger Factor",
            backgroundColor: colors,
            data: dfs
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Danger Factor',
            fontSize: 30
          }
        }
  });
}