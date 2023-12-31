import axios from "axios";
import { GET_POKEMONS, GET_TYPES, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, 
PAGINATE, FILTER_BY_TYPES, ORDER_ALPHABETICALLY, FILTER_BY_ORIGIN, 
FILTER_BY_ATTACK, CLEAR_PAGINATION, CLEAR_DETAIL } from "./action-types";

const getPokemons = () => {
  const endpoint = 'http://localhost:3001/pokemons/';
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GET_POKEMONS,
        payload: data,
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
};

const getTypes = () => {
  const endpoint = 'http://localhost:3001/types/';
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      dispatch({
        type: GET_TYPES,
        payload: data,
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  }
};

const getPokemonById = (id) => {
  const endpoint = `http://localhost:3001/pokemons/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      clearPagination();
      dispatch({
        type: GET_POKEMON_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  }
}

const getPokemonByName = (name) => {
  if (name) {
    const endpoint = `http://localhost:3001/pokemons/?name=${name}`;
    return async (dispatch) => {
      try {
        const { data } = await axios.get(endpoint);
        dispatch({
          type: GET_POKEMON_BY_NAME,
          payload: data,
        });
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    }
  } else {
    return async (dispatch) => {
      dispatch({
        type: GET_POKEMON_BY_NAME,
        payload: undefined,
      });
    }
  }
}

const paginatePokemons = (order) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: PAGINATE,
        payload: order,
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  }
}

const filterByTypes = (type) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FILTER_BY_TYPES,
        payload: type,
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  }
}

const filterByOrder = (order) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ORDER_ALPHABETICALLY,
        payload: order,
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  }
}

const filterByOrigin = (created) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FILTER_BY_ORIGIN,
        payload: created,
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  }
}

const filterByAttack = (attack) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FILTER_BY_ATTACK,
        payload: attack,
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  }
}

const postPokemon = (pokemon) => {
  return async () => {
    const endpoint = "http://localhost:3001/pokemons/";
    try {
      await axios.post(endpoint, pokemon);
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
}

const clearPagination = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_PAGINATION,
    });
  }
}

const clearDetail = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_DETAIL,
    });
  }
}

export {
  getPokemons,
  getTypes,
  getPokemonById,
  getPokemonByName,
  paginatePokemons,
  filterByTypes,
  filterByOrder,
  filterByOrigin,
  filterByAttack,
  postPokemon,
  clearPagination,
  clearDetail
}