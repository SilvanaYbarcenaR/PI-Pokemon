import { CREATE_POKEMON } from "./action-types";
import { GET_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, 
GET_TYPES, PAGINATE, FILTER_BY_TYPES, ORDER_ALPHABETICALLY, 
FILTER_BY_ORIGIN, FILTER_BY_ATTACK } from "./action-types";

let initialState = {
  allPokemons: [],
  pokemonTypes: [],
  pokemonById: {},
  allPokemonsBackup: [],
  currentPage: 0,
  isFirstPage: true,
  isLastPage: false,
  pokemonsFilteredByType: [],
  pokemonsFilteredByOrigin: [],
  filter: false
}

const reducer = (state = initialState, {type, payload}) => {
  const ITEMS_PER_PAGE = 12;
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

    case GET_TYPES:
      return {
        ...state,
        pokemonTypes: [...payload]
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
        isLastPage: payload === "next" && (firstIndex >= state.allPokemonsBackup.length - ITEMS_PER_PAGE) ? true : false
      }
    
    case FILTER_BY_TYPES:
      const filteredByType = [...state.allPokemonsBackup].filter((pokemon) => pokemon.types.includes(payload));
      return {
        ...state,
        allPokemons: filteredByType,
        pokemonsFilteredByType: filteredByType,
        filter: true
      }
    
    case ORDER_ALPHABETICALLY: 
      let filteredByOrder = [];
      if(payload === "asc") {
        filteredByOrder = [...state.allPokemonsBackup].sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
      } else if (payload === "desc") {
        filteredByOrder = [...state.allPokemonsBackup].sort((a, b) => {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
          return 0;
        })
      } else {
        filteredByOrder = [...state.allPokemonsBackup]
      }
      return {
        ...state,
        allPokemons: filteredByOrder,
        filter: true
      }

    case FILTER_BY_ORIGIN:
      let filteredByOrigin = [];
      if(payload === "db") {
        filteredByOrigin = [...state.allPokemonsBackup].filter((pokemon) => pokemon.created === true);
      } else if(payload === "api") {
        filteredByOrigin = [...state.allPokemonsBackup].filter((pokemon) => pokemon.created === false);
      } else {
        filteredByOrigin = [...state.allPokemonsBackup]
      }
      return {
        ...state,
        allPokemons: filteredByOrigin,
        pokemonsFilteredByOrigin: filteredByOrigin,
        filter: true
      }
    
    case FILTER_BY_ATTACK: 
      let filteredByAttack = [];
      if(payload === "asc" || payload === "desc") {
        filteredByAttack = [...state.allPokemonsBackup].sort((a, b) => {
          if(payload === "asc") return a.attack - b.attack;
          if(payload === "desc") return b.attack - a.attack;
        });
      }
      else if(payload === "all") filteredByAttack = [...state.allPokemonsBackup];
  
      return {
        ...state,
        allPokemons: filteredByAttack,
        filter: true
      }
        
    default:
      return {...state}
  }
}

export default reducer;