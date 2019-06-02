const menuIcon = document.querySelectorAll('.menu-icon');
const sidenav = document.querySelectorAll('.sidenav');
const sidenavClose = document.querySelectorAll('.sidenav_close-icon');

function toggleClassName(x, className) { 
    if(x.classList.contains(className)) {
        x.classList.remove(className);
    }
    else {
        x.classList.add(className);
    }
}

menuIcon[0].addEventListener('click', function() {
    toggleClassName(sidenav[0], 'active');
});


sidenavClose[0].addEventListener('click', function() {
    toggleClassName(sidenav[0], 'active');
});


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
                list.innerHTML += `<div class="card">
                <div class="card_transaction-dateblock">
                    <p class="card_transaction-date">${data[i].orderDate.substr(0,10)}</p>
                    <p class="card_transaction-type">${data[i].type}</p>
                </div>
                <p class="card_transaction-origin">${data[i].fromId}</p>
                <p class="card_transaction-title">${data[i].title}</p>
                <div class="card_transaction-amount green">${data[i].money}₱</div>
            </div>`
                "<li>" +  + "  " + data[i].fromId
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