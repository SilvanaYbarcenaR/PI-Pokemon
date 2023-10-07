const getPokemonsTypesController = require("../../controllers/Type/getPokemonsTypesController");

const getPokemonsTypes = async (req, res) => {
  try {
    const types = await getPokemonsTypesController();
    res.status(200).json(types);
  }
  catch(error) {
    res.status(500).send({ error: error.message });
  }
}

module.exports = getPokemonsTypes;