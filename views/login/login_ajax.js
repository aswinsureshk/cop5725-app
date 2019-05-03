
$(document).ready(function(){
    $("#loginbutton").click(function(){
        var uname  = $("#username").val();
        var upass = $("#password").val();
        var loginData ={'name': uname,'pass':upass};
        Promise.resolve(
            $.ajax({
                type : 'POST',
                url : '/validate',
                data : loginData,
                dataType: "json",
                async: false,
                timeout: 3000,
                success: function(data) {
                    // alert('success');
                    console.log(data.redirect);
                    window.location = data.redirect;
                },
                error: function() {
                    alert('Invalid username or password'); 
                }
            })).then(function(data){
                    console.log(data.redirect);
                    window.location = data.redirect;
            }).catch(function(e) {
                    alert('Invalid username or password'); 
          });
      });
    //   $("#loginbutton").click(function(){
    //     $.ajax({
    //       type : 'GET',
    //       url : '/xyz',
    //     //   success: function(data){
    //     //     $("#loginDiv").html(data);
    //     //   }
    //     });
    // });
});