import axios from "axios";
import { GET_POKEMONS, GET_TYPES, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, PAGINATE } from "./action-types";

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
      console.log(error.message);
    }
  };
};

const getTypes = () => {
  const endpoint = 'http://localhost:3001/types/';
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: GET_TYPES,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
};

const getPokemonById = (id) => {
  const endpoint = `http://localhost:3001/pokemons/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: GET_POKEMON_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}

const getPokemonByName = (name) => {
  const endpoint = `http://localhost:3001/pokemons/?name=${name}`;
  if (name) {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(endpoint);
        return dispatch({
          type: GET_POKEMON_BY_NAME,
          payload: data,
        });
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
  }
  else {
    return async (dispatch) => {
      return dispatch({
        type: GET_POKEMON_BY_NAME,
        payload: name,
      });
    }
  }
}

const paginatePokemons = (order) => {
  return async (dispatch) => {
    try {
      return dispatch({
        type: PAGINATE,
        payload: order,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}

export {
  getPokemons,
  getTypes,
  getPokemonById,
  getPokemonByName,
  paginatePokemons
}