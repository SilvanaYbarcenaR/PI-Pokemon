import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { getPokemonByName } from '../../redux/actions';
import searchStyles from './SearchBar.module.css';
import Modal from '../Modal/Modal';

const Searchbar = () => {
  const [namePokemon, setNamePokemon] = useState("");
  const [error, setError] = useState("");
  const [closeModal, setCloseModal] = useState(false);
  const dispatch = useDispatch();

  const searchByName = (namePokemon) => {
    dispatch(getPokemonByName(namePokemon)).catch((error) => {
      setError(error.message);
    });
  }
  const handleChange = (event) => {
    setNamePokemon(event.target.value);
    if(!event.target.value) searchByName();
  }

  const handleClose = (close) => {
    setCloseModal(close);
  }

  return (
    <div className={searchStyles.searchBar}>
      <input type="search" name="search" id="search" value={namePokemon} onChange={handleChange} placeholder='pikacku'/>
      <button className={searchStyles.btnSearch} onClick={() => searchByName(namePokemon)}>Search</button>
      {error && !closeModal && <Modal description={error} title={"Error"} closeModal={handleClose}/>}
    </div>
  )
}

export default Searchbar