import mongoose from "mongoose";

const CajaEsquema = new mongoose.Schema({
  tipoMoneda: { type: String, required: true },
  cantidadMoneda: { type: Number, required: true }
});

const Caja =  mongoose.model("Caja", CajaEsquema);

export async function SeeddingCaja() {
  const conteoCaja = await Caja.countDocuments();

if (conteoCaja == 0) {
  const cajaInicial = [
    { tipoMoneda: "5 Céntimos", cantidadMoneda: 50 },    // 2.50 €
    { tipoMoneda: "10 Céntimos", cantidadMoneda: 40 },   // 4.00 €
    { tipoMoneda: "20 Céntimos", cantidadMoneda: 30 },   // 6.00 €

    { tipoMoneda: "50 Céntimos", cantidadMoneda: 20 },   // 10.00 €
    { tipoMoneda: "1 Euro", cantidadMoneda: 15 },        // 15.00 €
    { tipoMoneda: "2 Euros", cantidadMoneda: 10 },       // 20.00 €

    { tipoMoneda: "5 Euros", cantidadMoneda: 5 },        // 25.00 €
    { tipoMoneda: "10 Euros", cantidadMoneda: 2 },       // 20.00 €
    { tipoMoneda: "20 Euros", cantidadMoneda: 1 }        // 20.00 €
    // Total de 122,50 €
  ];


    await Caja.insertMany(cajaInicial);
    console.log(`Arqueo inicial insertado!`);
  }
}

export default Caja;