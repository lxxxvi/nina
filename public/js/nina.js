let websocketProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
var ws = new WebSocket(websocketProtocol + "//" + location.host + "/socket");

var hostnameInput = function() {
  return document.getElementById("hostname");
}

var sslValidityDiv = function() {
  return document.getElementById("ssl-validity");
}

var sslValidityHostnameSpan = function() {
  return document.getElementById("ssl-validity-hostname");
}

var sslValidityValidUntilSpan = function() {
  return document.getElementById("ssl-validity-valid_until");
}

var displayLoader = function(boolean) {
  let loader = document.getElementById("loader");

  if(boolean) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
}

var sendInputToServer = function() {
  displayLoader(true);
  ws.send(hostnameInput().value);
}

var updateSslValidityDiv = function(data) {
  let parsed = JSON.parse(data);
  sslValidityHostnameSpan().innerHTML = parsed.hostname;
  sslValidityValidUntilSpan().innerHTML = parsed.valid_until;
  sslValidityDiv().classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", function() {
  hostnameInput().onkeyup = function(event) {
    if(event.keyCode == 13) {
      sendInputToServer();
    }
  };
});

ws.onmessage = function(response) {
  displayLoader(false);
  updateSslValidityDiv(response.data);
};
