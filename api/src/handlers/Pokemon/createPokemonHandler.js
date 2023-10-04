const createPokemonController = require("../../controllers/Pokemon/createPokemonController");

const createPokemonHandler = async (req, res) => {
  const {
    id,
    name,
    image,
    life,
    attack,
    defense,
    speed,
    height,
    weight,
    types,
  } = req.body;

  try {
    const newPokemon = await createPokemonController(id,
      name,
      image,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
      types
    );
    res.status(201).json(newPokemon);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = createPokemonHandler;