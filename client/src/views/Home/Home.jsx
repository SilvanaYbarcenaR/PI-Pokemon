import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getPokemons, paginatePokemons } from "../../redux/actions";
import Cards from '../../components/Cards/Cards';
import Filters from '../../components/Filters/Filters';
import homeStyles from './Home.module.css';
import bannerVideo from '../../assets/videos/banner-pokemon.mp4';

const Home = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const pokemonsFiltered = useSelector((state) => state.pokemonsFiltered);
  const itemsPerPage = useSelector((state) => state.itemsPerPage);
  const isFirstPage = useSelector((state) => state.isFirstPage);
  const isLastPage = useSelector((state) => state.isLastPage);
  const numberPages = useSelector((state) => state.numberPages);

  const paginate = (event) => {
    dispatch(paginatePokemons(event.target.name));
  }

  useEffect(() => {
    dispatch(getPokemons());
  }, [])

  return (
    <>
      <div className={homeStyles.videoBanner}>
        <video className={homeStyles.videoBg} autoPlay loop muted>
          <source src={bannerVideo} type="video/mp4"/>
        </video>
      </div>
      <div className={homeStyles.homeContainer}>
        <Filters/>
        <div className={homeStyles.rightContainer}>
          <div className={homeStyles.paginationContainer}>
            <div className={homeStyles.pagination}>
              {(pokemonsFiltered.length > 0 && pokemonsFiltered.length > itemsPerPage) &&
                <>
                  <button name="prev" onClick={paginate} disabled={isFirstPage}>Prev</button>
                  {numberPages ? 
                    [...Array(numberPages)].map((e, i) => <button key={i} name={i} onClick={paginate}>{i+1}</button>) 
                    : ""}
                  <button name="next" onClick={paginate} disabled={isLastPage}>Next</button>
                </>
              }
            </div>
            <p>{`Results: ${pokemonsFiltered.length} pokemons`}</p>
          </div>
          <Cards pokemons={pokemons} />
        </div>
      </div>
    </>
  )
}

export default Home;