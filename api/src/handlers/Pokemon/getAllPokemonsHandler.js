const allPokemonsController = require("../../controllers/Pokemon/allPokemonsController");
const getPokemonByNameController = require("../../controllers/Pokemon/getPokemonByNameController");

const getAllPokemonsHandler = async (req, res) => {
  let { name } = req.query;
  
  if (name) {
    try {
      let pokemonName = await getPokemonByNameController(name.toLowerCase());
      res.status(200).json(pokemonName);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  } else {
    try {
      const pokemonsData = await allPokemonsController();
      res.status(200).json(pokemonsData);
    }
    catch(error) {
      res.status(500).send({ error: error.message });
    }
  }
}

module.exports = getAllPokemonsHandler;