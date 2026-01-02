const BASE_URL = "http://localhost:3000";

// Función para obtener todos los artículos de la base de datos
async function obtenerArticulos() {
  try {
    const respuesta = await fetch(`${BASE_URL}/articulos`);
    if (!respuesta.ok) throw new Error("Error al obtener artículos");
    const articulos = await respuesta.json();
    return articulos;
  } catch (err) {
    console.error(err);
  }
}

// Función para obtener la caja completa
async function obtenerCaja() {
  try {
    const respuesta = await fetch(`${BASE_URL}/caja`);
    if (!respuesta.ok) throw new Error("Error al obtener caja");
    const caja = await respuesta.json();
    return caja;
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const articulos = await obtenerArticulos();
  const caja = await obtenerCaja();

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

  // Elementos panel retiradas
  const info_5cents = document.getElementById("info_5cents"); // Cantidad monedas 5 céntimos
  const info_total_5cents = document.getElementById("info_total_5cents"); // Total dinero en monedas de 5 céntimos
  const info_10cents = document.getElementById("info_10cents"); // Cantidad monedas 10 céntimos
  const info_total_10cents = document.getElementById("info_total_10cents"); // Total dinero en monedas de 10 céntimos
  const info_20cents = document.getElementById("info_20cents"); // Cantidad monedas 20 céntimos
  const info_total_20cents = document.getElementById("info_total_20cents"); // Total dinero en monedas de 20 céntimos
  const info_50cents = document.getElementById("info_50cents"); // Cantidad monedas 50 céntimos
  const info_total_50cents = document.getElementById("info_total_50cents"); // Total dinero en monedas de 50 céntimos
  const info_1euro = document.getElementById("info_1euro"); // Cantidad monedas 1 euro
  const info_total_1euro = document.getElementById("info_total_1euro"); // Total dinero en monedas de 1 euro
  const info_2euros = document.getElementById("info_2euros"); // Cantidad monedas 2 euros
  const info_total_2euros = document.getElementById("info_total_2euros"); // Total dinero en monedas de 2 euros
  const info_5euros = document.getElementById("info_5euros"); // Cantidad billetes 5 euros
  const info_total_5euros = document.getElementById("info_total_5euros"); // Total dinero en billetes de 5 euros
  const info_10euros = document.getElementById("info_10euros"); // Cantidad billetes 10 euros
  const info_total_10euros = document.getElementById("info_total_10euros"); // Total dinero en billetes de 10 euros
  const info_20euros = document.getElementById("info_20euros"); // Cantidad billetes 20 euros
  const info_total_20euros = document.getElementById("info_total_20euros"); // Total dinero en billetes de 20 euros
  const arqueo_total = document.getElementById("arqueo_total"); // Total arqueo
  const boton_retirada_caja = document.getElementById("boton_retirada_caja") // Botón de retirada de caja

  // Conteo de caja si se está en la ventana de retiradas
  if (window.location.href.includes("admin_panel_retiradas.html")) {
    conteoCaja();
    boton_retirada_caja.addEventListener("click", () => {
      retiradaCaja();
    })
  } 

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

  // Rellenado de datos del conteo de la caja
  function conteoCaja() {
    let total_caja = 0;

    caja.forEach((moneda) => {
      let cantidad = 0;

      switch (moneda.tipoMoneda) {
        case "5 Céntimos":
          info_5cents.textContent = "x" + moneda.cantidadMoneda + " monedas ->";
          cantidad = moneda.cantidadMoneda * 0.05;
          info_total_5cents.textContent = cantidad.toFixed(2) + " €";
          break;
        case "10 Céntimos":
          info_10cents.textContent =
            "x" + moneda.cantidadMoneda + " monedas ->";
          cantidad = moneda.cantidadMoneda * 0.1;
          info_total_10cents.textContent = cantidad.toFixed(2) + " €";
          break;
        case "20 Céntimos":
          info_20cents.textContent =
            "x" + moneda.cantidadMoneda + " monedas ->";
          cantidad = moneda.cantidadMoneda * 0.2;
          info_total_20cents.textContent = cantidad.toFixed(2) + " €";
          break;
        case "50 Céntimos":
          info_50cents.textContent =
            "x" + moneda.cantidadMoneda + " monedas ->";
          cantidad = moneda.cantidadMoneda * 0.5;
          info_total_50cents.textContent = cantidad.toFixed(2) + " €";
          break;
        case "1 Euro":
          info_1euro.textContent = "x" + moneda.cantidadMoneda + " monedas ->";
          cantidad = moneda.cantidadMoneda * 1;
          info_total_1euro.textContent = cantidad.toFixed(2) + " €";
          break;
        case "2 Euros":
          info_2euros.textContent = "x" + moneda.cantidadMoneda + " monedas ->";
          cantidad = moneda.cantidadMoneda * 2;
          info_total_2euros.textContent = cantidad.toFixed(2) + " €";
          break;
        case "5 Euros":
          info_5euros.textContent =
            "x" + moneda.cantidadMoneda + " billetes ->";
          cantidad = moneda.cantidadMoneda * 5;
          info_total_5euros.textContent = cantidad.toFixed(2) + " €";
          break;
        case "10 Euros":
          info_10euros.textContent =
            "x" + moneda.cantidadMoneda + " billetes ->";
          cantidad = moneda.cantidadMoneda * 10;
          info_total_10euros.textContent = cantidad.toFixed(2) + " €";
          break;
        case "20 Euros":
          info_20euros.textContent =
            "x" + moneda.cantidadMoneda + " billetes ->";
          cantidad = moneda.cantidadMoneda * 20;
          info_total_20euros.textContent = cantidad.toFixed(2) + " €";
          break;
      }

      total_caja += cantidad;
    });
    arqueo_total.textContent = total_caja.toFixed(2) + " €";
  }

  // Retirada de la caja
  function retiradaCaja() {
    caja.forEach(moneda => {
      if (moneda.cantidadMoneda > 10) {
        moneda.cantidadMoneda = 10;
      }
    });
    conteoCaja();
  }
});
