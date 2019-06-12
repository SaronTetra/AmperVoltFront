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
    var login = document.getElementById("user").value;
    var account = "66619871643175169398274878";

    var request1 = new XMLHttpRequest();
    var request = new XMLHttpRequest();
    var request2 = new XMLHttpRequest();
    request1.open('GET', 'https://ampervoltapi.putelita.pl:8080/users/' + login + '/accounts', true);
    request1.onload = function () {
        if (request1.status >= 200 && request1.status < 400) {
            // Success!
            var data = JSON.parse(request1.responseText);
            account = data[0].number;
            console.log("account:" + account);


            request.open('GET', 'https://ampervoltapi.putelita.pl:8080/users/'+ login + '/' + account + '/', true);
            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                  // Success!
                  var data = JSON.parse(request.responseText);
                  var acc = document.getElementById("av-account");
                  var bal = document.getElementById("av-balance");
                //   for (property in data){
                    // console.log(JSON.stringify(data,null,4));
                    console.log("HELO");
                    
                        acc.innerHTML = `${data.number.replace(/\B(?=(\d{4})+(?!\d))/g, " ")}`;
                        bal.innerHTML = `${data.balance}₱`;
                          
                } else {
                  // We reached our target server, but it returned an error
              
                }
            }
        
            request.send();
        
            
            request2.open('GET', 'https://ampervoltapi.putelita.pl:8080/users/'+ login + '/' + account + '/transactions', true);
            request2.onload = function() {
                if (request2.status >= 200 && request2.status < 400) {
                  // Success!
                  var data = JSON.parse(request2.responseText);
                  var list = document.getElementById("av-history");
                  list.innerHTML = ""
                //   for (property in data){
                    console.log(JSON.stringify(data,null,4));
                    for( i=0; i<data.length; i++){
                        if( data[i].money < 0){
                            moneyColor = "red";
                        }
                        else{
                            moneyColor = "green"
                        }
                        list.innerHTML += `<div class="card">
                        <div class="card_transaction-dateblock">
                            <p class="card_transaction-date">${data[i].orderDate.substr(0,10)}</p>
                            <p class="card_transaction-type">${data[i].type.name}</p>
                        </div>
                        <p class="card_transaction-origin">${data[i].target.replace(/\B(?=(\d{4})+(?!\d))/g, " ")}</p>
                        <p class="card_transaction-title">${data[i].title}</p>
                        <div class="card_transaction-amount ${moneyColor}">${data[i].money}₱</div>
                    </div>`
                        "<li>" +  + "  " + data[i].fromId
                        + "<br>" + data[i].money + "   " + data[i].title + "</li>" ;
                    }       
                } else {
                  // We reached our target server, but it returned an error
              
                }
              };
              
              request2.onerror = function() {
                // There was a connection error of some sort
              };
              
              request2.send();


        } else {
            // We reached our target server, but it returned an error

        }
    }
    request1.send();

    

   
    
}