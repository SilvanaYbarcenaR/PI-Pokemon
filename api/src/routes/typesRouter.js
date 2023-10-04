const { Router } = require('express');
const getPokemonsTypesHandler = require('../handlers/Type/getPokemonsTypesHandler');
const typesRouter = Router();

typesRouter.use('/', getPokemonsTypesHandler);

module.exports = typesRouter;