const getPokemonByIdController = require("../../controllers/Pokemon/getPokemonByIdController");

const getPokemonByIdHandler = async (req, res) => {
  const { pokemonId } = req.params;
  const source = isNaN(pokemonId) ? "db" : "api";
  try {
    const pokemonById = await getPokemonByIdController(pokemonId, source);
    res.status(200).json(pokemonById);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = getPokemonByIdHandler;