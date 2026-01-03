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

// Función de guardado de stock
async function guardarArticulo(numeroArticulo, datos) {
  try {
    await fetch(`${BASE_URL}/articulos/${numeroArticulo}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });
  } catch (error) {
    console.error("Error guardando artículo", error);
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

// Función para guardar la caja
async function guardarCaja(caja) {
  try {
    await fetch(`${BASE_URL}/caja`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(caja),
    });
  } catch (error) {
    console.error("Error guardando caja", error);
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
  const info_5cents = document.getElementById("info_5cents"); // Total moneda X
  const info_total_5cents = document.getElementById("info_total_5cents"); // Total dinero en monedas X
  const info_10cents = document.getElementById("info_10cents");
  const info_total_10cents = document.getElementById("info_total_10cents");
  const info_20cents = document.getElementById("info_20cents");
  const info_total_20cents = document.getElementById("info_total_20cents");
  const info_50cents = document.getElementById("info_50cents");
  const info_total_50cents = document.getElementById("info_total_50cents");
  const info_1euro = document.getElementById("info_1euro");
  const info_total_1euro = document.getElementById("info_total_1euro");
  const info_2euros = document.getElementById("info_2euros");
  const info_total_2euros = document.getElementById("info_total_2euros");
  const info_5euros = document.getElementById("info_5euros");
  const info_total_5euros = document.getElementById("info_total_5euros");
  const info_10euros = document.getElementById("info_10euros");
  const info_total_10euros = document.getElementById("info_total_10euros");
  const info_20euros = document.getElementById("info_20euros");
  const info_total_20euros = document.getElementById("info_total_20euros");
  const arqueo_total = document.getElementById("arqueo_total");
  const boton_retirada_caja = document.getElementById("boton_retirada_caja");

  // Elementos panel stock
  const stockCanha = document.getElementById("stockCanha");
  const stockRed = document.getElementById("stockRed");
  const stockRegadera = document.getElementById("stockRegadera");
  const stockMadera = document.getElementById("stockMadera");
  const stockMaderaDura = document.getElementById("stockMaderaDura");
  const stockMaderaFlexible = document.getElementById("stockMaderaFlexible");
  const stockFloresRojas = document.getElementById("stockFloresRojas");
  const stockFloresBlancas = document.getElementById("stockFloresBlancas");
  const stockFloresAmarillas = document.getElementById("stockFloresAmarillas");

  // Elementos panel precio
  const precioCanha = document.getElementById("precioCanha");
  const precioRed = document.getElementById("precioRed");
  const precioRegadera = document.getElementById("precioRegadera");
  const precioMadera = document.getElementById("precioMadera");
  const precioMaderaDura = document.getElementById("precioMaderaDura");
  const precioMaderaFlexible = document.getElementById("precioMaderaFlexible");
  const precioFloresRojas = document.getElementById("precioFloresRojas");
  const precioFloresBlancas = document.getElementById("precioFloresBlancas");
  const precioFloresAmarillas = document.getElementById(
    "precioFloresAmarillas"
  );

  // Conteo de caja si se está en la ventana de retiradas
  if (window.location.href.includes("admin_panel_retiradas.html")) {
    conteoCaja();
    boton_retirada_caja.addEventListener("click", () => {
      retiradaCaja();
    });
  }

  // Conteo de stock si está en la ventana de stock
  if (window.location.href.includes("admin_panel_stock.html")) {
    conteoStock();
  }

  // Set de precios si está en la ventana de precios
  if (window.location.href.includes("admin_panel_precio.html")) {
    setPrecios();
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
    caja.forEach((moneda) => {
      if (
        moneda.tipoMoneda != "5 Euros" &&
        moneda.tipoMoneda != "10 Euros" &&
        moneda.tipoMoneda != "20 Euros"
      ) {
        if (moneda.cantidadMoneda > 20) {
          moneda.cantidadMoneda = 20;
        }
      } else {
        moneda.cantidadMoneda = 0;
      }
    });
    guardarCaja(caja);
    conteoCaja();
  }

  // Conteo del stock
  function conteoStock() {
    articulos.forEach((articulo) => {
      switch (articulo.nombreArticulo) {
        case "Caña":
          stockCanha.value = articulo.stockArticulo;
          stockCanha.addEventListener("change", () => {
            guardarArticulo(articulo.numeroArticulo, {
              stockArticulo: Number(stockCanha.value),
            });
          });
          break;
        case "Red":
          stockRed.value = articulo.stockArticulo;
          stockRed.addEventListener("change", () => {
            guardarArticulo(articulo.numeroArticulo, {
              stockArticulo: Number(stockRed.value),
            });
          });
          break;
        case "Regadera":
          stockRegadera.value = articulo.stockArticulo;
          stockRegadera.addEventListener("change", () => {
            guardarArticulo(articulo.numeroArticulo, {
              stockArticulo: Number(stockRegadera.value),
            });
          });
          break;
        case "Madera":
          stockMadera.value = articulo.stockArticulo;
          stockMadera.addEventListener("change", () => {
            guardarArticulo(articulo.numeroArticulo, {
              stockArticulo: Number(stockMadera.value),
            });
          });
          break;
        case "Madera dura":
          stockMaderaDura.value = articulo.stockArticulo;
          stockMaderaDura.addEventListener("change", () => {
            guardarArticulo(articulo.numeroArticulo, {
              stockArticulo: Number(stockMaderaDura.value),
            });
          });
          break;
        case "Madera flexible":
          stockMaderaFlexible.value = articulo.stockArticulo;
          stockMaderaFlexible.addEventListener("change", () => {
            guardarArticulo(articulo.numeroArticulo, {
              stockArticulo: Number(stockMaderaFlexible.value),
            });
          });
          break;
        case "Flores rojas":
          stockFloresRojas.value = articulo.stockArticulo;
          stockFloresRojas.addEventListener("change", () => {
            guardarArticulo(articulo.numeroArticulo, {
              stockArticulo: Number(stockFloresRojas.value),
            });
          });
          break;
        case "Flores blancas":
          stockFloresBlancas.value = articulo.stockArticulo;
          stockFloresBlancas.addEventListener("change", () => {
            guardarArticulo(articulo.numeroArticulo, {
              stockArticulo: Number(stockFloresBlancas.value),
            });
          });
          break;
        case "Flores amarillas":
          stockFloresAmarillas.value = articulo.stockArticulo;
          stockFloresAmarillas.addEventListener("change", () => {
            guardarArticulo(articulo.numeroArticulo, {
              stockArticulo: Number(stockFloresAmarillas.value),
            });
          });
          break;
      }
    });
  }

  // Seteo precios
  function setPrecios() {
    articulos.forEach((articulo) => {
      switch (articulo.nombreArticulo) {
        case "Caña":
          precioCanha.value = articulo.precioArticulo;
          precioCanha.addEventListener("change", () => {
            guardarArticulo(articulo.numeroArticulo, {
              precioArticulo: Number(precioCanha.value),
            });
          });
          break;
        case "Red":
          precioRed.value = articulo.precioArticulo;
          precioRed.addEventListener("change", () => {
            guardarArticulo(articulo.numeroArticulo, {
              precioArticulo: Number(precioRed.value),
            });
          });
          break;
        case "Regadera":
          precioRegadera.value = articulo.precioArticulo;
          precioRegadera.addEventListener("change", () => {
            guardarArticulo(articulo.numeroArticulo, {
              precioArticulo: Number(precioRegadera.value),
            });
          });
          break;
        case "Madera":
          precioMadera.value = articulo.precioArticulo;
          precioMadera.addEventListener("change", () => {
            guardarArticulo(articulo.numeroArticulo, {
              precioArticulo: Number(precioMadera.value),
            });
          });
          break;
        case "Madera dura":
          precioMaderaDura.value = articulo.precioArticulo;
          precioMaderaDura.addEventListener("change", () => {
            guardarArticulo(articulo.numeroArticulo, {
              precioArticulo: Number(precioMaderaDura.value),
            });
          });
          break;
        case "Madera flexible":
          precioMaderaFlexible.value = articulo.precioArticulo;
          precioMaderaFlexible.addEventListener("change", () => {
            guardarArticulo(articulo.numeroArticulo, {
              precioArticulo: Number(precioMaderaFlexible.value),
            });
          });
          break;
        case "Flores rojas":
          precioFloresRojas.value = articulo.precioArticulo;
          precioFloresRojas.addEventListener("change", () => {
            guardarArticulo(articulo.numeroArticulo, {
              precioArticulo: Number(precioFloresRojas.value),
            });
          });
          break;
        case "Flores blancas":
          precioFloresBlancas.value = articulo.precioArticulo;
          precioFloresBlancas.addEventListener("change", () => {
            guardarArticulo(articulo.numeroArticulo, {
              precioArticulo: Number(precioFloresBlancas.value),
            });
          });
          break;
        case "Flores amarillas":
          precioFloresAmarillas.value = articulo.precioArticulo;
          precioFloresAmarillas.addEventListener("change", () => {
            guardarArticulo(articulo.numeroArticulo, {
              precioArticulo: Number(precioFloresAmarillas.value),
            });
          });
          break;
      }
    });
  }
});
