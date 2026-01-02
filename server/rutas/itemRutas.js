import express from "express";
import Articulos from "../modelos/articulos.js";

const router = express.Router();

// Ruta para recibir articulos
router.get("/articulos", async (req, res) => {
  const articulos = await Articulos.find();
  res.json(articulos);
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
export default router;
