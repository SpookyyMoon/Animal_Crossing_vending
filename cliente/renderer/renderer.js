document.addEventListener("DOMContentLoaded", () => {
  // Variables
  let entrada = "";
  let entradaDialog = "";
  let creditoInsertado = 0;

  // Elementos por ID
  const pantalla = document.getElementById("pantalla");
  const overlay = document.getElementById("overlay");
  const boton_cerrar_dialog = document.getElementById("boton_cerrar_dialog");
  const pantalla_dialog = document.getElementById("pantalla_dialog");
  const imagen_logo = document.getElementById("imagen_logo");

  // Elementos por clase
  const teclas = document.querySelectorAll(".teclas_teclado"); // Conjunto teclas teclado
  const botonesAdmin = document.querySelectorAll(".boton_admin"); // Conjunto teclas laterales
  const botonesIngreso = document.querySelectorAll(".boton_ingreso"); // Conjunto ingreso efectivo
  const opcionesAdmin = document.querySelectorAll(".opciones_admin"); // Botones panel administrador

  // Artículos
  let canhaObjeto = {
    nombre: "Caña",
    numero: "01",
    precio: 10,
  };

// Lista articulos
  const listaArticulos = [canhaObjeto];

  // Pulsado de logo
  if (imagen_logo) {
    imagen_logo.addEventListener("click", () => {
      window.location.href = "./index.html";
    });
  }

  // Botón cerrado dialog ingreso
  if (boton_cerrar_dialog && overlay) {
    boton_cerrar_dialog.addEventListener("click", () => {
      overlay.classList.add("hidden");
      overlay.classList.remove("unhidden");
    });
  }
  // Botones admin
  if (opcionesAdmin.length > 0) {
    opcionesAdmin.forEach((opcion) => {
      opcion.addEventListener("click", () => {
        const idOpcion = opcion.id;

        if (idOpcion === "admin_opcion_1") {
          window.location.href = "./admin_panel_stock.html";
        } else if (idOpcion === "admin_opcion_2") {
          window.location.href = "./admin_panel_precio.html";
        } else if (idOpcion === "admin_opcion_3") {
          window.location.href = "./admin_panel_retiradas.html";
        }
      });
    });
  }

  // Botones teclado
  if (teclas.length > 0) {
    teclas.forEach((tecla) => {
      tecla.addEventListener("click", () => {
        const valor = tecla.textContent;
        gestorTecla(valor);
      });
    });
  }

  // Botones laterales
  if (botonesAdmin.length > 0) {
    botonesAdmin.forEach((boton) => {
      boton.addEventListener("click", () => {
        const idBoton = boton.id;

        if (idBoton === "boton1" && overlay) {
          overlay.classList.remove("hidden");
          overlay.classList.add("unhidden");
        } else if (idBoton === "boton3") {
          window.location.href = "./admin_panel_stock.html";
        }
      });
    });
  }

  // Botones ingreso
  if (botonesIngreso.length > 0) {
    botonesIngreso.forEach((boton) => {
      boton.addEventListener("click", () => {
        const idBoton = boton.id;

        if (idBoton === "cents_5") {
          creditoInsertado += 0.05;
        } else if (idBoton === "cents_10") {
          creditoInsertado += 0.1;
        } else if (idBoton === "cents_20") {
          creditoInsertado += 0.2;
        } else if (idBoton === "cents_50") {
          creditoInsertado += 0.5;
        } else if (idBoton === "eur_1") {
          creditoInsertado += 1;
        } else if (idBoton === "eur_2") {
          creditoInsertado += 2;
        } else if (idBoton === "eur_5") {
          creditoInsertado += 5;
        } else if (idBoton === "eur_10") {
          creditoInsertado += 10;
        } else if (idBoton === "eur_20") {
          creditoInsertado += 20;
        }

        actualizarPantallaDialog();
      });
    });
  }
  /*
  // Función de registrado de teclas pulsadas en pantalla
  function gestorTecla(valor) {
    if (valor === "C") {
      // Limpia la pantalla
      if (
        !entrada.includes("Crédito:") &&
        !entrada.includes("Inserte") &&
        !entrada.includes("Seleccione")
      ) {
        entrada = "Seleccione producto";
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
      if (
        entrada.includes("Crédito:") ||
        entrada.includes("Inserte") ||
        entrada.includes("Seleccione")
      ) {
        // Si el crédito se estaba mostrando en pantalla se borra
        entrada = "";
      }
      entrada += valor;
      actualizarPantalla();
    }
  }
  */

  function gestorTecla(valor) {
    // Añadir número a pantalla
    if (
      entrada.includes("Crédito:") ||
      entrada.includes("Inserte") ||
      entrada.includes("Seleccione")
    ) {
      // Si el crédito se estaba mostrando en pantalla se borra
      entrada = "";
    }
    entrada += valor;
    actualizarPantalla();
  }

function comprobacionObjeto(entrada) {
  for (const articulo of listaArticulos) {
if (parseInt(articulo.numero) === parseInt(entrada)) {
      return articulo.precio;
    }
  }
  return "Producto inválido";
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
