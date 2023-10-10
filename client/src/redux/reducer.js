import { CLEAR_PAGINATION } from "./action-types";
import { GET_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, 
GET_TYPES, PAGINATE, FILTER_BY_TYPES, ORDER_ALPHABETICALLY, 
FILTER_BY_ORIGIN, FILTER_BY_ATTACK } from "./action-types";

let initialState = {
  pokemons: [],
  pokemonTypes: [],
  pokemonById: {},
  allPokemons: [],
  pokemonsFiltered: [],
  currentPage: 0,
  itemsPerPage: 2,
  isFirstPage: true,
  isLastPage: false,
}

const reducer = (state = initialState, {type, payload}) => {
  const ITEMS_PER_PAGE = state.itemsPerPage;
  switch(type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: [...payload].splice(0, ITEMS_PER_PAGE),
        allPokemons: payload,
        pokemonsFiltered: payload
      }

    case GET_POKEMON_BY_ID:
      return {
        ...state,
        pokemonById: payload
      }

    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemons: payload ? [{...payload}] : [...state.allPokemons]
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
        pokemons: [...state.pokemonsFiltered].splice(firstIndex, ITEMS_PER_PAGE),
        currentPage: payload === "next" ? nextPage : prevPage,
        isFirstPage: payload === "prev" && prevPage < 1 ? true : false,
        isLastPage: payload === "next" && (firstIndex >= state.pokemonsFiltered.length - ITEMS_PER_PAGE) ? true : false
      }
    
    case FILTER_BY_TYPES:
      if(payload === "all") {
        return {
          ...state,
          pokemonsFiltered: state.allPokemons,
          pokemons: [...state.allPokemons].splice(0, ITEMS_PER_PAGE)
        }
      }
      
      const filteredByType = [...state.allPokemons].filter((pokemon) => pokemon.types.includes(payload));
      return {
        ...state,
        pokemonsFiltered: [...filteredByType],
        pokemons: [...filteredByType].splice(0, ITEMS_PER_PAGE)
      }
    
    case ORDER_ALPHABETICALLY: 
      let filteredByOrder = [];
      if(payload === "asc") {
        filteredByOrder = [...state.pokemonsFiltered].sort((a, b) => {
          if (a.name?.toLowerCase() < b.name?.toLowerCase()) return -1;
          if (a.name?.toLowerCase() > b.name?.toLowerCase()) return 1;
          return 0;
        });
      } else if (payload === "desc") {
        filteredByOrder = [...state.pokemonsFiltered].sort((a, b) => {
          if (a.name?.toLowerCase() < b.name?.toLowerCase()) return 1;
          if (a.name?.toLowerCase() > b.name?.toLowerCase()) return -1;
          return 0;
        })
      }
      else {
        return {
          ...state,
          pokemons: [...state.pokemons].splice(0, ITEMS_PER_PAGE)
        }
      }

      return {
        ...state,
        pokemonsFiltered: filteredByOrder,
        pokemons: [...filteredByOrder].splice(0, ITEMS_PER_PAGE)
      }

    case FILTER_BY_ORIGIN:
      let filteredByOrigin = [];
      if(payload === "db") {
        filteredByOrigin = [...state.pokemonsFiltered].filter((pokemon) => pokemon.created === true);
      } else if(payload === "api") {
        filteredByOrigin = [...state.pokemonsFiltered].filter((pokemon) => pokemon.created === false);
      }
      else {
        return {
          ...state,
          pokemons: [...state.pokemons].splice(0, ITEMS_PER_PAGE)
        }
      } 

      return {
        ...state,
        pokemonsFiltered: filteredByOrigin,
        pokemons: [...filteredByOrigin].splice(0, ITEMS_PER_PAGE)
      }
    
    case FILTER_BY_ATTACK: 
      let filteredByAttack = [];
      if(payload === "asc" || payload === "desc") {
        filteredByAttack = [...state.pokemonsFiltered].sort((a, b) => {
          if(payload === "asc") return a.attack - b.attack;
          if(payload === "desc") return b.attack - a.attack;
        });
      }
      else {
        return {
          ...state,
          pokemons: [...state.pokemons].splice(0, ITEMS_PER_PAGE)
        }
      } 
      
      return {
        ...state,
        pokemonsFiltered: filteredByAttack,
        pokemons: [...filteredByAttack].splice(0, ITEMS_PER_PAGE)
      }

      case CLEAR_PAGINATION:
        return {
          ...state,
          currentPage: 0,
          isFirstPage: true,
          isLastPage: false
        }
        
    default:
      return {...state}
  }
}

export default reducer;