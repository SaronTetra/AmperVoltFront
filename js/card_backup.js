
  function consoleLog(data) {
    var logElement = document.getElementById('log');
    logElement.innerHTML += '\n' + data;
  }
  
  function processMessage(message) {
        consoleLog(JSON.stringify(message, null, 4));
        consoleLog("recordtype: " + message.records[0].recordType);
        consoleLog("data: " + JSON.stringify(message.records[0].data));
    // message.records[0].data.forEach(function (record) {
      record = message.records[0];
      if (record.recordType == "string") {
        consoleLog('Data is string: ' + record.data);
      } else if (record.recordType == "json") {
        processJSON(record.data);
      } else if (record.recordType == "url") {
        consoleLog("Data is URL: " + record.data);
      } else if (record.recordType == "opaque" && record.mediaType == 'image/png') {
        processPng(record.data);
      };
    // });
  }
  
  function processPng(data) {
    consoleLog("Known image/png data");
  
    var img = document.createElement("img");
    img.src = URL.createObjectURL(new Blob(data, 'image/png'));
    img.onload = function () {
      window.URL.revokeObjectURL(this.src);
    };
  };
  
  function processJSON(data) {
    var obj = JSON.parse(data);
    consoleLog("JSON data: " + obj.myProperty.toString());
  };

function writeTag() {
  if ('nfc' in navigator) {
    navigator.nfc.watch(function (message) {
        consoleLog("NFC message received from URL " + message.url);
          navigator.nfc.push({
            url: "/custom/path",
            records: [{ recordType: "text", data: '4ab0e21f-70b9-45d4-854d-92d607ffbb0a' }]
          });
        consoleLog("WRITE DONE!");
      }, {mode: 'any'})
      .then(() => consoleLog("Added a watch."))
      .catch(err => consoleLog("Adding watch failed: " + err.name));
  } else {
    consoleLog('NFC API not supported.');
  }
  }
function readWriteNfc() {
    if ('nfc' in navigator) {
      navigator.nfc.watch(function (message) {
          consoleLog("NFC message received from URL " + message.url);
          processMessage(message);
          //   navigator.nfc.push({
          //     url: "/custom/path",
          //     records: [{ recordType: "text", data: 'Hello World' }]
          //   });
          consoleLog("READ DONE!");
        }, {mode: 'any'})
        .then(() => consoleLog("Added a watch."))
        .catch(err => consoleLog("Adding watch failed: " + err.name));
    } else {
      consoleLog('NFC API not supported.');
    }
  }
  