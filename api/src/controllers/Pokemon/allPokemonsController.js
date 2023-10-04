const getPokemonsApiController = require("./getPokemonsApiController");
const getPokemonsDBController = require("./getPokemonsDBController");

const allPokemonsController = async () => {
  const pokemonsFromApi = await getPokemonsApiController();
  const pokemonsFromDB = await getPokemonsDBController();

  const allPokemons = pokemonsFromDB ? [...pokemonsFromDB, ...pokemonsFromApi] : pokemonsFromApi;
  return allPokemons;
}

module.exports = allPokemonsController;