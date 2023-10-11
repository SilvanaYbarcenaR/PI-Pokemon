import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { getPokemonByName } from '../../redux/actions';
import searchStyles from './SearchBar.module.css';

const Searchbar = () => {
  const [namePokemon, setNamePokemon] = useState("");
  const dispatch = useDispatch();

  const searchByName = (namePokemon) => {
    dispatch(getPokemonByName(namePokemon));
  }
  const handleChange = (event) => {
    setNamePokemon(event.target.value);
    if(!event.target.value) searchByName();
  }

  return (
    <div className={searchStyles.searchBar}>
      <input type="search" name="search" id="search" value={namePokemon} onChange={handleChange} placeholder='pikacku'/>
      <button onClick={() => searchByName(namePokemon)}>Search</button>
    </div>
  )
}

export default Searchbar