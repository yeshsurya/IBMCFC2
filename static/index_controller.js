$(document).ready(function() {
  $("#userinput").submit(function (e) {
          console.log("Submit Clicked");
          alert("TEST");
          
          console.log(window.location.href);

      }
  );
  $("#test").on('click',function(e){
    alert("test");
    window.location.href = window.location.origin+"/api/visitors";
  });
});