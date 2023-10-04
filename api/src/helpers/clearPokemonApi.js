const axios = require("axios");

// Changing pokemon object attributes
const clearPokemonApi = (pokemon) => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    height: pokemon.height,
    weight: pokemon.weight,
    life: pokemon.stats[0].base_stat,
    attack: pokemon.stats[1].base_stat,
    defense: pokemon.stats[2].base_stat,
    speed: pokemon.stats[5].base_stat,
    types: pokemon.types.map((pokemonType) => pokemonType.type.name),
    image: pokemon.sprites.other["official-artwork"].front_default,
    created: false
  }
}

module.exports = clearPokemonApi;