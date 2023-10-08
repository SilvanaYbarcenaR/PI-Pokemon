import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getPokemons, paginatePokemons } from "../../redux/actions";
import Cards from '../../components/Cards/Cards';

const Home = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);
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
        {!isFirstPage && <button name="prev" onClick={paginate}>Prev</button>}
        {!isLastPage && <button name="next" onClick={paginate}>Next</button>}
      </div>
      <Cards allPokemons={allPokemons} />
    </>
  )
}

export default Home;