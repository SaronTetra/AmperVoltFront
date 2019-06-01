function transactionHistory(){
    var login = "sarian";
    var request = new XMLHttpRequest();
    request.open('GET', 'https://192.168.1.40:8080/users/'+ login + '/transactions', true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          var data = JSON.parse(request.responseText);
          var list = document.getElementById("av-history");
        //   for (property in data){
            for( i=0; i<data.length; i++){
                list.innerHTML += "<li>" + data[i].orderDate.substr(0,10) + "  " + data[i].fromId
                + "<br>" + data[i].money + "   " + data[i].title + "</li>" ;
            }       
        } else {
          // We reached our target server, but it returned an error
      
        }
      };
      
      request.onerror = function() {
        // There was a connection error of some sort
      };
      
      request.send();
}