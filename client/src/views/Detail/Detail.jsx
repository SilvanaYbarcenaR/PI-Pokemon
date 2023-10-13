import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearDetail, getPokemonById } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import detailStyles from './Detail.module.css'

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
    <div className={detailStyles.detailContainer}>
      <div>
        <h1>{pokemonById.name}</h1>
        <span>{pokemonById.id}</span>
        <p>Types: {pokemonById.types?.map((type, index) => (index === 0 ? "" : ", ") + type)}</p>
      </div>
      <div className={detailStyles.imgContainer}>
        <img src={pokemonById.image} alt={pokemonById.name}/>
      </div>
      <div className={detailStyles.tagsDetailLeft}>
        <p><b>Life:</b> {pokemonById.life}</p>
        <p><b>Attack:</b> {pokemonById.attack}</p>
        <p><b>Defense:</b> {pokemonById.defense}</p>
      </div>
      <div className={detailStyles.tagsDetailRight}>
        <p><b>Speed:</b> {pokemonById.speed}</p>
        <p><b>Height:</b> {pokemonById.height}</p>
        <p><b>Weight:</b> {pokemonById.weight}</p>
      </div>
    </div>
  )
}

export default Detail