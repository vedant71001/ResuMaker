let showDataBtn = document.getElementById("showData");

showDataBtn.addEventListener('click',loadDoc);

function loadDoc(){
    $("button").click(function(){
        $.get("http://localhost:8787/showUsers", function(data, status){
          alert("Data: " + data + "\nStatus: " + status);
        });
      });
  }