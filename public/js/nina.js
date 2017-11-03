let websocketProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
var ws = new WebSocket(websocketProtocol + "//" + location.host + "/socket");

var hostnameInput = function() {
  return document.getElementById("hostname");
}

var refreshTargetsButton = function() {
  return document.getElementById("refresh-targets");
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
  ws.send("CHECK " + hostnameInput().value);
}

var initializeDivs = function() {
  displaySslValidity(false);
  displayLoader(true);
  displayError(false);
}

var updateSslValidityDiv = function(data) {
  if(data.status == "success") {
    sslValidityHostnameSpan().innerHTML = data.hostname;
    sslValidityValidUntilSpan().innerHTML = data.valid_until;
    displaySslValidity(true);
  } else {
    displayError(true);
  }
}

ws.onopen = function() {
  refreshTargetsList();
}

var refreshTargetsList = function() {
  ws.send("GET");
}

var renderTargetsList = function(targets) {
  let targetsList = document.getElementById("targets-list");

  let listItems = targets.map(function(item) {
    listItem  = "<li>";
    listItem += "Certificate for"
    listItem += '<span class="hostname">' + item.hostname + '</span>';
    listItem += " is valid until ";
    listItem += '<span class="valid_until">' + item.valid_until + '</span>';
    listItem += "(";
    listItem += "checked at "
    listItem += item.checked_at
    listItem += ")";
    listItem += "</li>";
    return listItem
  });

  targetsList.innerHTML = listItems.join("\n");
}

document.addEventListener("DOMContentLoaded", function() {
  hostnameInput().onkeyup = function(event) {
    if(event.keyCode == 13) {
      sendInputToServer();
    }
  };

  refreshTargetsButton().onclick = function() {
    ws.send("REFRESH");
  }

});

ws.onmessage = function(response) {
  let data = JSON.parse(response.data);

  if(data.action == "CHECK") {
    displayLoader(false);
    updateSslValidityDiv(data.content);
  } else if (data.action == "GET") {
    renderTargetsList(data.content);
  } else if (data.action == "REFRESH") {
    refreshTargetsList();
  }
};
