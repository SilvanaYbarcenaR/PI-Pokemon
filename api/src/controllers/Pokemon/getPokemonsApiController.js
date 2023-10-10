const axios = require("axios");
const fillPokemonAttributes = require("../../helpers/fillPokemonAttributes");
const URL = 'https://pokeapi.co/api/v2/pokemon';

const getPokemonsApiController = async () => {
  const { data } = await axios.get(`${URL}`);
  const pokemonsOffset20 = await axios.get(data.next);
  const pokemonsOffset40 = await axios.get(pokemonsOffset20.data.next);

  const allPokemons = [...data.results, ...pokemonsOffset20.data.results, ...pokemonsOffset40.data.results];

  const allPokemonsApi = await fillPokemonAttributes(allPokemons);
  return allPokemonsApi;
}
module.exports = getPokemonsApiController;