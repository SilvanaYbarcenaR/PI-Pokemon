import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemonById } from '../../redux/actions';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const pokemonById = useSelector((state) => state.pokemonById);

  useEffect(() => {
    dispatch(getPokemonById(id));
  }, [])

  return (
    <div>
      <span>{pokemonById.id}</span>
      <h1>{pokemonById.name}</h1>
      <img src={pokemonById.image} alt={pokemonById.name}/>
      <p>{pokemonById.life}</p>
      <p>{pokemonById.attack}</p>
      <p>{pokemonById.defense}</p>
      <p>{pokemonById.speed}</p>
      <p>{pokemonById.height}</p>
      <p>{pokemonById.weight}</p>
      <p>{pokemonById.types?.map((type, index) => (index === 0 ? "" : ", ") + type)}</p>
    </div>
  )
}

export default Detail