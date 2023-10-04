const { default: axios } = require("axios");
const { Pokemon, Type } = require("../../db");
const clearPokemonDB = require("../../helpers/clearPokemonDB");
const clearPokemonApi = require("../../helpers/clearPokemonApi");
const URL = "https://pokeapi.co/api/v2/pokemon/"; 

const getPokemonByIdController = async (pokemonId, source) => {
  if(source === "db") {
    const pokemonByIdFromDB = await Pokemon.findOne({
      where: {id: pokemonId},
      include: {
          model: Type,
          attributes: ["name"]
      }
    })
    if(!pokemonByIdFromDB) throw new Error(`Pokemon with ID: ${pokemonId} was not found.`)
    const pokemonByIdDB = await clearPokemonDB(pokemonByIdFromDB.dataValues);
    return pokemonByIdDB;
  }
  else {
    const { data } = await axios.get(`${URL}${pokemonId}`);
    if(!data) throw new Error(`Pokemon with ID: ${pokemonId} was not found.`)
    const pokemonByIdAPI = await clearPokemonApi(data);
    return pokemonByIdAPI;
  }
}

module.exports = getPokemonByIdController;