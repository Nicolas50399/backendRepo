import * as dotenv from "dotenv";
dotenv.config();
console.log(process.env.TIPO);
const daos = {
  mongo: async () => {
    const { default: DAOProductoMongo } = await import(
      "./producto/DAOProductoMongo.js"
    );
    const { default: DAOCarritoMongo } = await import(
      "./carrito/DAOCarritoMongo.js"
    );
    return {
      trainerDAO: new DAOCarritoMongo(),
      pokemonDAO: new DAOProductoMongo(),
    };
  },
  firebase: async () => {
    const { default: DAOProductoFirebase } = await import(
      "./producto/DAOProductoFirebase.js"
    );
    const { default: DAOCarritoFirebase } = await import(
      "./carrito/DAOCarritoFirebase"
    );
    return {
      trainerDAO: new DAOCarritoFirebase(),
      pokemonDAO: new DAOProductoFirebase(),
    };
  },
};

export default daos[process.env.TIPO];