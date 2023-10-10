const { Router } = require('express');
const getAllPokemonsHandler = require('../handlers/Pokemon/getAllPokemonsHandler');
const createPokemonHandler = require('../handlers/Pokemon/createPokemonHandler');
const getPokemonByIdHandler = require('../handlers/Pokemon/getPokemonByIdHandler');
const validate = require('../helpers/validate');
const pokemonsRouter = Router();

pokemonsRouter.get('/', getAllPokemonsHandler);
pokemonsRouter.get('/:pokemonId', getPokemonByIdHandler);
pokemonsRouter.post('/', validate, createPokemonHandler);

module.exports = pokemonsRouter;