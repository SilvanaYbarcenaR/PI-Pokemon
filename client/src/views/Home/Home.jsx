import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getPokemons, paginatePokemons } from "../../redux/actions";
import Cards from '../../components/Cards/Cards';

const Home = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const pokemonsFiltered = useSelector((state) => state.pokemonsFiltered);
  const itemsPerPage = useSelector((state) => state.itemsPerPage);
  const isFirstPage = useSelector((state) => state.isFirstPage);
  const isLastPage = useSelector((state) => state.isLastPage);
  const paginate = (event) => {
    dispatch(paginatePokemons(event.target.name));
  }

  useEffect(() => {
    dispatch(getPokemons());
  }, [])

  return (
    <>
      <div>
        {(pokemonsFiltered.length > 0 && pokemonsFiltered.length > itemsPerPage) &&
          <>
            <button name="prev" onClick={paginate} disabled={isFirstPage}>Prev</button>
            <button name="next" onClick={paginate} disabled={isLastPage}>Next</button>
          </>
        }
      </div>
      <Cards pokemons={pokemons} />
    </>
  )
}

export default Home;