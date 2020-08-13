var head = document.getElementsByTagName("head")[0];
var js = document.createElement("script");

js.type = "text/javascript";

if (screen.width > 500) {
  js.src = "eventos.js";
} else {
  js.src = "eventos2.js";
}

head.appendChild(js);
