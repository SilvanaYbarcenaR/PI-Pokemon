const { Type } = require("../../db");
const axios = require("axios");
const URL = 'https://pokeapi.co/api/v2/type';

const getPokemonsTypesController = async () => {
  let types = await Type.findAll({
    attributes: ["id", "name"]
  })
  if(!types.length) {
    const { data } = await axios.get(URL);
    types = await data.results;
    await Type.bulkCreate(types);
  }
  let typesArray = types?.map( type => {
    return type['name'];
  })
  return typesArray;
}

module.exports = getPokemonsTypesController;