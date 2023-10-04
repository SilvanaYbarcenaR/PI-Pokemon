require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const PokemonFunction = require("./models/Pokemon");
const TypeFunction = require("./models/Type");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

// Ejecutando las funciones que definen los modelos
PokemonFunction(sequelize);
TypeFunction(sequelize);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Pokemon, Type } = sequelize.models;

// Acá vendrían las relaciones
// Product.hasMany(Reviews);
Pokemon.belongsToMany(Type, { through: "PokemonType" });
Type.belongsToMany(Pokemon, { through: "PokemonType" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  Op // Export Sequelize operations
};