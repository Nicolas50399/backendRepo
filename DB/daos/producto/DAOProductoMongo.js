import ContenedorMongo from "../../containers/contenedorMongo.js";

class DAOProductoMongo extends ContenedorMongo {
  constructor() {
    // * super = padre/ContenedorMongo
    super("producto", {
      timestamp: Date,
      nombre: String,
      descripcion: String,
      foto_url: String,
      precio: Number,
      stock: Number
    });
  }
  // async findByName(name) {
  //   console.log(this.db);
  //   return await this.db.findOne({ name });
  // }
}
export default DAOProductoMongo;