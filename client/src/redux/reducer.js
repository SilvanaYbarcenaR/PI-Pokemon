import { GET_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, 
GET_TYPES, PAGINATE, FILTER_BY_TYPES, ORDER_ALPHABETICALLY, 
FILTER_BY_ORIGIN, FILTER_BY_ATTACK, CLEAR_DETAIL, CLEAR_PAGINATION } from "./action-types";

let initialState = {
  pokemons: [],
  pokemonTypes: [],
  pokemonById: {},
  allPokemons: [],
  pokemonsFiltered: [],
  currentPage: 0,
  itemsPerPage: 12,
  isFirstPage: true,
  isLastPage: false,
  numberPages: 0
}

const reducer = (state = initialState, {type, payload}) => {
  const ITEMS_PER_PAGE = state.itemsPerPage;
  switch(type) {
    case GET_POKEMONS:
      const numberOfPages = Math.ceil(payload.length/ITEMS_PER_PAGE);
      return {
        ...state,
        pokemons: [...payload].splice(0, ITEMS_PER_PAGE),
        allPokemons: payload,
        pokemonsFiltered: payload,
        numberPages: numberOfPages
      }

    case GET_POKEMON_BY_ID:
      return {
        ...state,
        pokemonById: payload
      }

    case GET_POKEMON_BY_NAME:
      console.log("paylod", payload)
      return {
        ...state,
        pokemons: payload ? [{...payload}] : [...state.allPokemons].splice(0, ITEMS_PER_PAGE),
        numberPages: payload ? 0 : Math.ceil(state.allPokemons.length/ITEMS_PER_PAGE)
      }

    case GET_TYPES:
      return {
        ...state,
        pokemonTypes: [...payload]
      }

    case PAGINATE:
      if( payload === "next" || payload === "prev") {
        const nextPage = Number(state.currentPage) + 1;
        const prevPage = Number(state.currentPage) - 1;
        const firstIndex = payload === "next" ? nextPage * ITEMS_PER_PAGE : prevPage * ITEMS_PER_PAGE;
        
        return {
          ...state,
          pokemons: [...state.pokemonsFiltered].splice(firstIndex, ITEMS_PER_PAGE),
          currentPage: payload === "next" ? nextPage : prevPage,
          isFirstPage: payload === "prev" && prevPage < 1 ? true : false,
          isLastPage: payload === "next" && (firstIndex >= state.pokemonsFiltered.length - ITEMS_PER_PAGE) ? true : false
        }
      }
      const firstIndex = payload * ITEMS_PER_PAGE;
      return {
        ...state,
        pokemons: [...state.pokemonsFiltered].splice(firstIndex, ITEMS_PER_PAGE),
        currentPage: payload,
        isFirstPage: payload == 0 ? true : false,
        isLastPage: payload == state.numberPages - 1 ? true : false
      }
    
    case FILTER_BY_TYPES:
      if(payload === "all") {
        return {
          ...state,
          pokemonsFiltered: state.allPokemons,
          numberPages: state.allPokemons.length ? Math.ceil(state.allPokemons.length/ITEMS_PER_PAGE) : 0,
          pokemons: [...state.allPokemons].splice(0, ITEMS_PER_PAGE)
        }
      }
      
      const filteredByType = [...state.allPokemons].filter((pokemon) => pokemon.types.includes(payload));
    
      return {
        ...state,
        pokemonsFiltered: [...filteredByType],
        numberPages: filteredByType.length ? Math.ceil(filteredByType.length/ITEMS_PER_PAGE) : 0,
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
        numberPages: filteredByOrder.length ? Math.ceil(filteredByOrder.length/ITEMS_PER_PAGE) : 0,
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
        numberPages: filteredByOrigin.length ? Math.ceil(filteredByOrigin.length/ITEMS_PER_PAGE) : 0,
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
        numberPages: filteredByAttack.length ? Math.ceil(filteredByAttack.length/ITEMS_PER_PAGE) : 0,
        pokemons: [...filteredByAttack].splice(0, ITEMS_PER_PAGE)
      }

      case CLEAR_PAGINATION:
        return {
          ...state,
          currentPage: 0,
          isFirstPage: true,
          isLastPage: false
        }
        
      case CLEAR_DETAIL:
        return {
          ...state,
          pokemonById: {},
        }

    default:
      return {...state}
  }
}

export default reducer;