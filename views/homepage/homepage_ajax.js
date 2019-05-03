
$(document).ready(function(){
    $("#search-accidents").click(function(){
        var accident_search_data  = {local_authority: $("#la_dropdown").val()};
        console.log("at ajax");
        Promise.resolve(
            $.ajax({
                type : 'POST',
                url : '/searchaccidents',
                data : accident_search_data,
                dataType: "json",
                async: false,
                timeout: 10000,
                success: function(data) {
                    console.log(data.redirect);
                    window.location = data.redirect;
                },
                error: function() {
                    alert('No such Local Authority Exists'); 
                }
            })).then(function(data){
                    console.log(data.redirect);
                    window.location = data.redirect;
            }).catch(function(e) {
                console.log("err")
                    alert('No such Local Authority Exists'); 
          });
      });

      $("#viewtrendsbutton").click(function(){
        var accident_search_data  = {local_authority: $("#typebox").val()};
        console.log("at viewtrendsbutton");

        Promise.resolve(
            $.ajax({
                type : 'POST',
                url : '/viewtrends',
                data : accident_search_data,
                dataType: "json",
                async: false,
                timeout: 10000,
                success: function(data) {
                    console.log(data.redirect);
                    window.location = data.redirect;
                },
                error: function() {
                    alert('Error'); 
                }
            })).then(function(data){
                    console.log(data.redirect);
                    window.location = data.redirect;
            }).catch(function(e) {
                    alert('Error'); 
        });
    });

    $("#dangerbtn").click(function(){
        var accident_search_data  = {local_authority: $("#typebox").val()};
        console.log("at dangerbutton");

        Promise.resolve(
            $.ajax({
                type : 'GET',
                url : '/viewdangerscreen',
                data : accident_search_data,
                dataType: "json",
                async: false,
                timeout: 10000,
                success: function(data) {
                    console.log(data.redirect);
                    window.location = data.redirect;
                },
                error: function() {
                    alert('Error'); 
                }
            })).then(function(data){
                    console.log(data.redirect);
                    window.location = data.redirect;
            }).catch(function(e) {
                    alert('Error'); 
        });
    });

    $( document ).ready(function(){
        $.ajax({
            url: '/getLocalAuthorities',
            type: 'get',
            success: function(data){
                var las = data.las;
                var la_dropdown = document.getElementById('la_dropdown');
                for(var i=0;i<las.length;i++){
                    var opt = document.createElement('option');
                    opt.className='option_'+i;
                    opt.innerHTML = '<option value = ' + las[i].LA_NAME + ' selected>' + las[i].LA_NAME + '</option>';
                    la_dropdown.appendChild(opt);
                }
             },
            error: function (xhr, ajaxOptions, thrownError) {
                var errorMsg = 'Ajax request failed: ' + xhr.responseText;
              }
        });
    });
});