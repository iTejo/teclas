(function () {
    var teclas = {
      UP: 38,
      DOWN: 40,
      LEFT: 37,
      RIGHT: 39,
    }; //grupo de variables. comas, punto y coma al final. blablabla.....
  
    document.getElementById("myBtn").addEventListener("click", resizeCanvas);
    document.addEventListener("keydown", dibujarTeclado);
    var cuadrito = document.getElementById("area_de_dibujo");
    var papel = cuadrito.getContext("2d");
    var ancho = window.innerWidth - 100;
    var alto = window.innerHeight - 100;
    var x = (window.innerWidth - 100) / 2;
    var y = (window.innerHeight - 200) / 2;
    var estado = 0;
  
    function () {
      var color = document.getElementById("favcolor").value; //aqui algo para que escojan el color
    }
  
    initialize();
  
    function initialize() {
      // Register an event listener to call the resizeCanvas() function
      // each time the window is resized.
      window.addEventListener("resize", resizeCanvas, false);
      // Draw canvas border for the first time.
      resizeCanvas();
    }
  
    // Display custom canvas. In this case it's a blue, 5 pixel
    // border that resizes along with the browser window.
    function redraw() {
      papel.strokeStyle = color();
      papel.lineWidth = "1";
      //papel.strokeRect(0, 0, ancho, alto);
      //papel.clearRect(0, 0, ancho, alto);
      x = (window.innerWidth - 100) / 2;
      y = (window.innerHeight - 200) / 2;
    }
  
    // Runs each time the DOM window resize event fires.
    // Resets the canvas dimensions to match window,
    // then draws the new borders accordingly.
    function resizeCanvas() {
      cuadrito.width = window.innerWidth - 100;
      cuadrito.height = window.innerHeight - 200;
      redraw();
    }
  
    /*function borrar() {
      papel.clearRect(0, 0, ancho, alto);
    }*/
  
    document.addEventListener("mousedown", presionarMouse); //cuando presionas click
    document.addEventListener("mouseup", soltarMouse); //cuando sueltas click
    document.addEventListener("mousemove", dibujarMouse); //cuando mueves el mouse
  
    // Funcion para mousemove
    function dibujarMouse(evento) {
      if (estado == 1) {
        // solo se dibujara si esta el click del mouse presionado
        dibujarLinea(color, x, y, evento.layerX, evento.layerY, papel);
      }
      x = evento.layerX;
      y = evento.layerY;
    }
  
    // Funcion para mousedown
    function presionarMouse(evento) {
      estado = 1; //click presionado
      x = evento.layerX;
      y = evento.layerY;
    }
  
    // Funcion para mouseup
    function soltarMouse(evento) {
      estado = 0; // click suelto
      x = evento.layerX;
      y = evento.layerY;
    }
  
    var button = document.getElementById("btn-download");
    button.addEventListener("click", function (e) {
      var dataURL = cuadrito
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream"); //Convert image to 'octet-stream' (Just a download, really)
      button.href = dataURL;
    });
  
    dibujarLinea(color, x - 1, y - 1, x + 1, y + 1, papel);
  
    function dibujarLinea(color, xinicial, yinicial, xfinal, yfinal, lienzo) {
      lienzo.beginPath();
      lienzo.strokeStyle = color;
      lienzo.lineWidth = 3;
      lienzo.moveTo(xinicial, yinicial);
      lienzo.lineTo(xfinal, yfinal);
      lienzo.stroke();
      lienzo.closePath();
    }
  
    function dibujarTeclado(evento) {
      console.log(evento);
      console.log(color());
      //var color = document.getElementById("favcolor").value; //aqui algo para que escojan el color
      var movimiento = 1;
      switch (evento.keyCode) {
        case teclas.UP:
          dibujarLinea(color, x, y, x, y - movimiento, papel);
          y = y - movimiento;
          break;
        case teclas.DOWN:
          dibujarLinea(color, x, y, x, y + movimiento, papel);
          y = y + movimiento;
          break;
        case teclas.LEFT:
          dibujarLinea(color, x, y, x - movimiento, y, papel);
          x = x - movimiento;
          break;
        case teclas.RIGHT:
          dibujarLinea(color, x, y, x + movimiento, y, papel);
          x = x + movimiento;
          break;
      }
    }
  
    /*ESTO ES PARA VER DONDE ESTA EL MOUSE. PERO NO LO USO EN ESTA PAGINA.*/
    //window.onload = init;
    function init() {
      if (window.Event) {
        document.captureEvents(Event.MOUSEMOVE);
      }
      document.onmousemove = getCursorXY;
    }
  
    function getCursorXY(e) {
      document.getElementById("cursorX").value = window.Event
        ? e.pageX
        : event.clientX +
          (document.documentElement.scrollLeft
            ? document.documentElement.scrollLeft
            : document.body.scrollLeft);
      document.getElementById("cursorY").value = window.Event
        ? e.pageY
        : event.clientY +
          (document.documentElement.scrollTop
            ? document.documentElement.scrollTop
            : document.body.scrollTop);
    }
  })();
  