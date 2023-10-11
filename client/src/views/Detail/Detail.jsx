import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearDetail, getPokemonById } from '../../redux/actions';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  let pokemonById = useSelector((state) => state.pokemonById);

  useEffect(() => {
    dispatch(getPokemonById(id));
    return () => {
      dispatch(clearDetail());
    }
  }, [])
  
  return (
    <div>
      <span>{pokemonById.id}</span>
      <h1>Name: {pokemonById.name}</h1>
      <img src={pokemonById.image} alt={pokemonById.name}/>
      <p>Life: {pokemonById.life}</p>
      <p>Attack: {pokemonById.attack}</p>
      <p>Defense: {pokemonById.defense}</p>
      <p>Speed: {pokemonById.speed}</p>
      <p>Height: {pokemonById.height}</p>
      <p>Wight: {pokemonById.weight}</p>
      <p>Types: {pokemonById.types?.map((type, index) => (index === 0 ? "" : ", ") + type)}</p>
    </div>
  )
}

export default Detail