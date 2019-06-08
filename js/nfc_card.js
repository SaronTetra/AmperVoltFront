const buttons = document.querySelectorAll(".pinpad-key-gradient");
const button_val = document.querySelectorAll(".pinpad-key-gradient-corner");
const screen = document.querySelectorAll(".pinpad-screen")[0];

var state = 0;
var amount = "";
var pin = "";


function consoleLog(data) {
  var logElement = document.getElementById('log');
  logElement.innerHTML += '\n' + data;
}

function clearLog() {
  var logElement = document.getElementById('log');
  logElement.innerHTML = '';
}


function processPayment(uuid, pin) {
  var login = document.getElementById("user").value;
  var title = "Card payment to: " + login;

  var request = new XMLHttpRequest();
  request.open('POST', 'https://ampervolt.putelita.pl:8080/users/'+ login + '/pay', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({
    "uuid": uuid,
    "money": amount,
    "title": title
  }));
}

function readWriteNfc(pin) {
  if ('nfc' in navigator) {
    navigator.nfc.watch(function (message) {
      var audio = new Audio('../confirm.mp3');
      audio.play();
      processPayment(message.records[0].data, pin);
      navigator.nfc.cancelWatch();
    }, { mode: 'any' })
      .then(() => consoleLog("Added a watch."))
      .catch(err => consoleLog("Adding watch failed: " + err.name));
  } else {
    consoleLog('NFC API not supported.');
  }
}

function pinpad_menu(){
  number = this.querySelectorAll(".pinpad-key-gradient-corner")[0].value;
  console.log("state:" + state);
  if(number == "o"){
    state++;
  } 

  if(number == "X") { 
    state = 0;
    amount = "";
    pin = "";
    screen.innerHTML = "";
  }
  else {
    switch (state) {
      case 0:
      amount += number;
      console.log(amount.length);
        screen.innerHTML = "Amount: <br>"
        if(amount.length < 3){          
          screen.innerHTML += "0." + (amount.length = 2 ? amount : "0" + amount) + "₱";
        }
        else{
          screen.innerHTML += amount.substr(0,amount.length-2) + "." + amount.substr(-2,2)  + "₱";
        }
        break;
      case 1:
        if(amount > 5000){ // TODO: make double
          state = 2;
          screen.innerHTML = "Enter PIN: <br>";
        }
        else{
          readWriteNfc(pin);
          state = 4;
        }
        break;
      case 2:
      screen.innerHTML = "Enter PIN: <br>";
        if(pin.length < 4){
          pin += number;
        }
        for (let i = 0; i < pin.length; i++) {
          screen.innerHTML += "*";        
        }
        break;
      case 3:
        if(pin.length < 4){
          state = 2;
          break;
        }
        readWriteNfc();
        state++;
        break;
      case 5:
        state = 0;
        amount = "";
        pin = ""
        break;
      default:
        break;
    }
  }
  
}

for(i=0; i<buttons.length; i++){
  buttons[i].addEventListener('click', pinpad_menu);
}

