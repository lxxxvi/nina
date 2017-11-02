var ws = new WebSocket("ws://" + location.host + "/socket");

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

var sendInputToServer = function() {
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
  updateSslValidityDiv(response.data);
};