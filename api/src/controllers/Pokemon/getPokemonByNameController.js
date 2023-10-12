const { default: axios } = require("axios");
const { Pokemon, Type, Op } = require("../../db");
const clearPokemonDB = require("../../helpers/clearPokemonDB");
const clearPokemonApi = require("../../helpers/clearPokemonApi");
const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonByNameController = async (name) => {
  const pokemonByNameDB = await Pokemon.findOne({
    where: {
      name: {[Op.iLike]: `${name}`}
    },
    include: {
      model: Type,
      attributes: ["name"]
    }
  })

  if (pokemonByNameDB) {
    const pokemonByName = await clearPokemonDB(pokemonByNameDB);
    return pokemonByName;
  } else {
    try {
      const { data } = await axios.get(`${URL}${name}`);
      const pokemonByName = await clearPokemonApi(data);
      return pokemonByName;
    } catch (error) {
      throw new Error(`Pokemon with name "${name}" was not found.`)
    }
  }
}

module.exports = getPokemonByNameController;