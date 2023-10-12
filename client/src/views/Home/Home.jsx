import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { clearPagination, getPokemons, paginatePokemons } from "../../redux/actions";
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
  const currentPage = useSelector((state) => state.currentPage);

  const paginate = (event) => {
    dispatch(paginatePokemons(event.target.name));
  }

  useEffect(() => {
    dispatch(getPokemons());
    return () => {
      dispatch(clearPagination());
    }
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
                 {console.log(numberPages)}
                  {numberPages > 0 &&
                    <>
                      <button name="prev" onClick={paginate} disabled={isFirstPage}>Prev</button>
                      {[...Array(numberPages).keys()].map((i) => {
                        return (
                          <button key={i} name={i} onClick={paginate} className={currentPage == i ? 
                            homeStyles["active"] : ""}>
                            {i+1}
                          </button>
                        )
                      })}
                      <button name="next" onClick={paginate} disabled={isLastPage}>Next</button>
                    </>
                  }
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