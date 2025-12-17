document.addEventListener("DOMContentLoaded", () => {
  const pantalla = document.getElementById("pantalla");
  const overlay = document.getElementById("overlay");
  const boton_cerrar_dialog = document.getElementById("boton_cerrar_dialog");
  const pantalla_dialog = document.getElementById("pantalla_dialog");

  let entrada = "";
  let entradaDialog = "";
  let creditoInsertado = 0;

  // Pulsado de teclas
  const teclas = document.querySelectorAll(".teclas_teclado"); // Conjunto teclas teclado
  const botonesAdmin = document.querySelectorAll(".boton_admin"); // Conjunto teclas laterales
  const botonesIngreso = document.querySelectorAll(".boton_ingreso"); // Conjunto ingreso efectivo

  // Botón cerrado dialog ingreso
  boton_cerrar_dialog.addEventListener("click", () => {
    overlay.classList = "";
    overlay.classList = "hidden";
  });

  // Botones teclado
  teclas.forEach((tecla) => {
    // Detector de tecla
    tecla.addEventListener("click", () => {
      const valor = tecla.textContent;

      gestorTecla(valor);
    });
  });

  // Botones laterales
  botonesAdmin.forEach((boton) => {
    // Detector de botón
    boton.addEventListener("click", () => {
      const idBoton = boton.id;

      if (idBoton === "boton1") {
        overlay.classList = "";
        overlay.classList = "unhidden";
      } else if (idBoton === "boton2") {
      } else if (idBoton === "boton3") {
      }
    });
  });

  // Botones ingreso
  botonesIngreso.forEach((boton) => {
    // Detector de botón
    boton.addEventListener("click", () => {
      const idBoton = boton.id;

      if (idBoton === "cents_5") {
        creditoInsertado += 0.05;
        actualizarPantallaDialog();
      } else if (idBoton === "cents_10") {
        creditoInsertado += 0.10;
        actualizarPantallaDialog();
      } else if (idBoton === "cents_20") {
        creditoInsertado += 0.20;
        actualizarPantallaDialog();
      }
      else if (idBoton === "cents_50") {
        creditoInsertado += 0.50;
        actualizarPantallaDialog();
      }
      else if (idBoton === "eur_1") {
        creditoInsertado += 1;
        actualizarPantallaDialog();
      }
      else if (idBoton === "eur_2") {
        creditoInsertado += 2;
        actualizarPantallaDialog();
      }
      else if (idBoton === "eur_5") {
        creditoInsertado += 5;
        actualizarPantallaDialog();
      }
      else if (idBoton === "eur_10") {
        creditoInsertado += 10;
        actualizarPantallaDialog();
      }
      else if (idBoton === "eur_20") {
        creditoInsertado += 20;
        actualizarPantallaDialog();
      }
    });
  });

  // Función de registrado de teclas pulsadas en pantalla
  function gestorTecla(valor) {
    if (valor === "C") {
      // Limpia la pantalla
      if (!entrada.includes("Crédito:") && !entrada.includes("Inserte")) {
        entrada = "";
        actualizarPantalla();
      }
    } else if (valor === "E") {
      // Confirmar selección
      if (entrada >= 1 && entrada <= 9) {
        entrada = "";
        entrada = "Procesando..." + entrada;
        actualizarPantalla();
        setTimeout(() => {
          // Timeout de 2s
          entrada = "Inserte crédito";
          actualizarPantalla();
        }, 2000);
      } else {
        entrada = "Producto inválido";
        actualizarPantalla();
        setTimeout(() => {
          // Timeout de 2s
          entrada = "Crédito: " + creditoInsertado.toFixed(2) + "€";
          actualizarPantalla();
        }, 2000);
      }
    } else {
      // Añadir número a pantalla
      if (entrada.includes("Crédito:") || entrada.includes("Inserte")) {
        // Si el crédito se estaba mostrando en pantalla se borra
        entrada = "";
      }
      entrada += valor;
      actualizarPantalla();
    }
  }

  // Actualización de pantalla
  function actualizarPantalla() {
    pantalla.textContent = entrada;
  }

  // Actualización de pantalla del dialog
  function actualizarPantallaDialog() {
    entradaDialog = "Crédito: " + creditoInsertado.toFixed(2) + "€";
    pantalla_dialog.textContent = entradaDialog;
  }
});
