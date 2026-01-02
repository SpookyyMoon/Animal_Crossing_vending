import mongoose from "mongoose";

const ArticulosEsquema = new mongoose.Schema({
  nombreArticulo: { type: String, required: true },
  numeroArticulo: { type: Number, required: true },
  stockArticulo: { type: Number, required: true },
  precioArticulo: { type: Number, required: true }
});

const Articulos =  mongoose.model("Articulos", ArticulosEsquema);

export async function SeeddingArticulos() {
  const conteoArticulos = await Articulos.countDocuments();

if (conteoArticulos == 0) {
  const articulosIniciales = [
    { nombreArticulo: "Caña", numeroArticulo: 1, stockArticulo: 2, precioArticulo: 15 },
    { nombreArticulo: "Red", numeroArticulo: 2, stockArticulo: 2, precioArticulo: 15 },
    { nombreArticulo: "Regadera", numeroArticulo: 3, stockArticulo: 2, precioArticulo: 12 },

    { nombreArticulo: "Madera", numeroArticulo: 4, stockArticulo: 8, precioArticulo: 4 },
    { nombreArticulo: "Madera dura", numeroArticulo: 5, stockArticulo: 6, precioArticulo: 6 },
    { nombreArticulo: "Madera flexible", numeroArticulo: 6, stockArticulo: 6, precioArticulo: 5 },

    { nombreArticulo: "Flores rojas", numeroArticulo: 7, stockArticulo: 5, precioArticulo: 3 },
    { nombreArticulo: "Flores blancas", numeroArticulo: 8, stockArticulo: 5, precioArticulo: 3 },
    { nombreArticulo: "Flores amarillas", numeroArticulo: 9, stockArticulo: 5, precioArticulo: 3 }
  ];


    await Articulos.insertMany(articulosIniciales);
    console.log(`Artículos iniciales insertados!`);
  }
  else {
    console.log(`Se han cargado ${conteoArticulos} artículos desde la colección.`);
  }
}

export default Articulos;