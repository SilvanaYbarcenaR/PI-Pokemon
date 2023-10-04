const axios = require("axios");
const fillPokemonAttributes = require("../../helpers/fillPokemonAttributes");
const URL = 'https://pokeapi.co/api/v2/pokemon';

const getPokemonsApiController = async () => {
  const { data } = await axios.get(`${URL}`);
  const allPokemonsApi  = await fillPokemonAttributes(data.results);
  return allPokemonsApi;
}
module.exports = getPokemonsApiController;