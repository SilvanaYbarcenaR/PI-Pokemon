const axios = require("axios");

// Filling pokemon object attributes
const fillPokemonAttributes = async (allPokemonsApi) => {
  for (const pokemon of allPokemonsApi) {
    const urlPokemon = pokemon.url;
    const pokemonDetail = await axios.get(urlPokemon);
    // Removing url from pokemon object
    delete pokemon.url;
    pokemon.id = pokemonDetail.data.id;
    pokemon.height = pokemonDetail.data.height;
    pokemon.weight = pokemonDetail.data.weight;
    pokemon.life = pokemonDetail.data.stats[0].base_stat;
    pokemon.attack = pokemonDetail.data.stats[1].base_stat;
    pokemon.defense = pokemonDetail.data.stats[2].base_stat;
    pokemon.speed = pokemonDetail.data.stats[5].base_stat;
    pokemon.types = pokemonDetail.data.types.map((pokemonType) => pokemonType.type.name);
    pokemon.image = pokemonDetail.data.sprites.other["official-artwork"].front_default;
    pokemon.created = false;
  };
  return allPokemonsApi;
}

module.exports = fillPokemonAttributes;