
function consoleLog(data) {
  var logElement = document.getElementById('log');
  logElement.innerHTML += '\n' + data;
}

function clearLog() {
  var logElement = document.getElementById('log');
  logElement.innerHTML = '';
}

function processPayment(uuid) {
  const getTest = async () => {
    const response = await fetch('https://ampervolt.putelita.pl:8080/users/'+ login + '/'  + uuid + '/');
    const myJson = await response.json(); //extract JSON from the http response
    consoleLog(JSON.stringify(myJson));
  }
  // getTest();

  var amount = document.getElementById("amount").value;
  var title = document.getElementById("title").value;
  var login = document.getElementById("login").value;

  var request = new XMLHttpRequest();
  request.open('POST', 'https://ampervolt.putelita.pl:8080/users/'+ login + '/pay', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({
    "uuid": uuid,
    "money": amount,
    "title": title
  }));

}

function processMessage(message) {
  consoleLog("data: " + message.records[0].data);
  processPayment(message.records[0].data);

}

function writeTag() {
  if ('nfc' in navigator) {
    navigator.nfc.watch(function (message) {
      navigator.nfc.push({
        url: "/custom/path",
        records: [{ recordType: "text", data: '99c7af9e-10ee-4a87-8b8e-7a70c913a5b8' }]
      });
      consoleLog("WRITE DONE!");
      navigator.nfc.cancelWatch();
    }, { mode: 'any' })
      .then(() => consoleLog("Added a watch."))
      .catch(err => consoleLog("Adding watch failed: " + err.name));
  } else {
    consoleLog('NFC API not supported.');
  }
}

function readWriteNfc() {
  if ('nfc' in navigator) {
    navigator.nfc.watch(function (message) {
      processMessage(message);
      consoleLog("READ DONE!");
      var audio = new Audio('confirm.mp3');
      audio.play();
      navigator.nfc.cancelWatch();
    }, { mode: 'any' })
      .then(() => consoleLog("Added a watch."))
      .catch(err => consoleLog("Adding watch failed: " + err.name));
  } else {
    consoleLog('NFC API not supported.');
  }
}
