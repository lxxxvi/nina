let websocketProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
var ws = new WebSocket(websocketProtocol + "//" + location.host + "/socket");

var hostnameInput = function() {
  return document.getElementById("hostname");
}

var sslValidityDiv = function() {
  return document.getElementById("ssl-validity");
}

var errorDiv = function() {
  return document.getElementById("error");
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

var displaySslValidity = function(boolean) {
  let sslValidity = sslValidityDiv();

  if(boolean) {
    sslValidity.classList.remove("hidden");
  } else {
    sslValidity.classList.add("hidden");
  }
}

var displayError = function(boolean) {
  let error = errorDiv();

  if(boolean) {
    error.classList.remove("hidden");
  } else {
    error.classList.add("hidden");
  }

}

var sendInputToServer = function() {
  initializeDivs();
  ws.send(hostnameInput().value);
}

var initializeDivs = function() {
  displaySslValidity(false);
  displayLoader(true);
  displayError(false);
}

var updateSslValidityDiv = function(data) {
  let parsed = JSON.parse(data);

  if(parsed.status == "success") {
    sslValidityHostnameSpan().innerHTML = parsed.hostname;
    sslValidityValidUntilSpan().innerHTML = parsed.valid_until;
    sslValidityDiv().classList.remove("hidden");
  } else {
    displayError(true);
  }
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
