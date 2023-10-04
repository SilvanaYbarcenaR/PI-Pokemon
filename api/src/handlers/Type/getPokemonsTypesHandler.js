const pokemonsTypesController = require("../../controllers/Type/pokemonsTypesController");

const getPokemonsTypes = async (req, res) => {
  try {
    const types = await pokemonsTypesController();
    res.status(200).json(types);
  }
  catch(error) {
    res.status(400).send({ error: error.message });
  }
}

module.exports = getPokemonsTypes;