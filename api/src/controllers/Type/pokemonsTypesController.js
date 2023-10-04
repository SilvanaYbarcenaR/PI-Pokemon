const { Type } = require("../../db");
const axios = require("axios");
const URL = 'https://pokeapi.co/api/v2/type';

const pokemonsTypesController = async () => {
  let types = await Type.findAll({
    attributes: ["id", "name"]
  })
  if(!types.length) {
    const { data } = await axios.get(URL);
    types = await data.results;
    for(const type of types) {
      const typeUrl = await axios.get(type.url);
      delete type.url;
      type.id = typeUrl.data.id;
    }
    await Type.bulkCreate(types);
  }
  return types;
}

module.exports = pokemonsTypesController;