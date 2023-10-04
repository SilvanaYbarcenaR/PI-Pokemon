const { Pokemon, Type } = require("../../db");

const getPokemonsDBController = async () => {
  const pokemonsDb = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"]
    },
  });

  if(pokemonsDb.length) {
    return pokemonsDb.map((pokemon) => {
      return {
        id: pokemon.id,
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        life: pokemon.life,
        attack: pokemon.attack,
        defense: pokemon.defense,
        speed: pokemon.speed,
        image: pokemon.image,
        types: pokemon.Types.map((type) => type.name),
        created: pokemon.created,
      };
    });
  }
};

module.exports = getPokemonsDBController;