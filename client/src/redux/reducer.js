import { GET_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, PAGINATE } from "./action-types";

let initialState = {
  allPokemons: [],
  allTypes: [],
  pokemonById: {},
  allPokemonsBackup: [],
  currentPage: 0,
  isFirstPage: true,
  isLastPage: false
}

const reducer = (state = initialState, {type, payload}) => {
  const ITEMS_PER_PAGE = 20;
  switch(type) {
    case GET_POKEMONS:
      return {
        ...state,
        allPokemons: [...payload].splice(0, ITEMS_PER_PAGE),
        allPokemonsBackup: payload
      }
    case GET_POKEMON_BY_ID:
      return {
        ...state,
        pokemonById: payload
      }
    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        allPokemons: payload ? [{...payload}] : [...state.allPokemonsBackup].splice(0, ITEMS_PER_PAGE)
      }
    case PAGINATE:
      const nextPage = state.currentPage + 1;
      const prevPage = state.currentPage - 1;
      const firstIndex = payload === "next" ? nextPage * ITEMS_PER_PAGE : prevPage * ITEMS_PER_PAGE;

      return {
        ...state,
        allPokemons: [...state.allPokemonsBackup].splice(firstIndex, ITEMS_PER_PAGE),
        currentPage: payload === "next" ? nextPage : prevPage,
        isFirstPage: payload === "prev" && prevPage < 1 ? true : false,
        isLastPage: payload === "next" && firstIndex >= state.allPokemonsBackup.length - ITEMS_PER_PAGE ? true : false
      }
    default:
      return {...state}
  }
}

export default reducer;