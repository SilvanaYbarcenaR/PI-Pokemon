const axios = require("axios");

// Changing pokemon object attributes
const clearPokemonDB = (pokemon) => {
console.log(pokemon.Types);
  return {
    id: pokemon.id,
    name: pokemon.name,
    height: pokemon.height,
    weight: pokemon.weight,
    life: pokemon.life,
    attack: pokemon.attack,
    defense: pokemon.defense,
    speed: pokemon.speed,
    types: pokemon.Types.map((pokemonType) => pokemonType.dataValues.name),
    image: pokemon.image,
    created: pokemon.created
  }
}

module.exports = clearPokemonDB;