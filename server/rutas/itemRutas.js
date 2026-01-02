import express from "express";
import Articulos from "../modelos/articulos.js";
import Caja from "../modelos/caja.js";

const router = express.Router();

// Ruta para recibir articulos
router.get("/articulos", async (req, res) => {
  const articulos = await Articulos.find();
  res.json(articulos);
});

// Ruta para recibir la caja
router.get("/caja", async (req, res) => {
  const caja = await Caja.find();
  res.json(caja);
});

// Ruta actualizacion de articulos
router.put("/comandas/:numeroArticulo", async (req, res) => {
  try {
    const articuloActualizado = await Articulos.findByIdAndUpdate(
      req.params.numeroArticulo,
      req.body,
      { new: true }
    );
    res.json(articuloActualizado);
    console.log(`Artículo ${articuloActualizado.nonbreArticulo} actualizado!: `);
    console.log(articuloActualizado);
  } catch (error) {
    console.log("Error al actualizar artículo!", error);
    res.status(500).json({ message: "Error al actualizar artículo!" });
  }
});

// Ruta para actualizar toda la caja de forma sencilla
router.put("/caja", async (req, res) => {
  try {
    const monedas = req.body;

    for (const [tipo, cantidad] of Object.entries(monedas)) {
      await Caja.updateOne(
        { tipoMoneda: tipo },
        { cantidadMoneda: cantidad }
      );
    }

    res.json({ message: "Caja actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar caja:", error);
    res.status(500).json({ message: "Error al actualizar caja" });
  }
});
export default router;
