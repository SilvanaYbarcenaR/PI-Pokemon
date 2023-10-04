const { Pokemon, Type } = require("../../db");
const imgDefault = "https://miro.medium.com/v2/resize:fit:1074/format:webp/1*8Ck817bxnkBpSFq7aTy6qw.png";

const createPokemonController = async (
  id,
  name,
  image,
  life,
  attack,
  defense,
  speed,
  height,
  weight,
  types
) => {
  const pokemonFound = await Pokemon.findOne({ where: { name: name }});
  if(pokemonFound) {throw new Error("Pokemon already exists.")};
  
  const newPokemon = await Pokemon.create({
    id,
    name,
    image: image ? image : imgDefault,
    life,
    attack,
    defense,
    speed,
    height,
    weight,
    types
  });

  const pokemonTypes = await Type.findAll({
    where: {
      name: types
    }
  });

  newPokemon.addType(pokemonTypes);
  return newPokemon;
}

module.exports = createPokemonController;