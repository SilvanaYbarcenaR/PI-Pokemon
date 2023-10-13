import { useEffect, useState } from 'react';
import { getTypes, postPokemon } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import createStyles from './Create.module.css';
import validation from '../../../helpers/validation';
import Cards from '../../components/Cards/Cards';
import Modal from '../../components/Modal/Modal';

const Create = () => {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [closeModal, setCloseModal] = useState(false);
  const pokemonTypes = useSelector((state) => state.pokemonTypes);
  const [newPokemon, setNewPokemon] = useState({
    name: "",
    image: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: []
  })

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: ""
  });

  const typesArray = () => {
    const typesSelected = document.querySelectorAll('#type option:checked');
    return Array.from(typesSelected).map(el => el.value);
  }

  const handleChange = (event) => {
    const prop = event.target.name;
    const val = event.target.value;
    if(prop === "type") {
      setNewPokemon({
        ...newPokemon,
        types: typesArray()
      })
      setErrors(
        validation({
            ...newPokemon,
            types: typesArray()
        })
      ); 
    } else {
      setNewPokemon({
        ...newPokemon,
        [prop]: val
      })
      setErrors(
        validation({
            ...newPokemon,
            [prop]: val
        })
      ); 
    } 
  }

  const createPokemon = (event) => {
    event.preventDefault();
    dispatch(postPokemon(newPokemon)).then(() => {
      setSuccess("Pokemon was created successfully.")
    }).catch((error) => {
      setError(error.message);
    });
    setNewPokemon({
      name: "",
      image: "",
      life: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      types: []
    });
    document.getElementById("createForm").reset();
  }

  const handleClose = (close) => {
    setCloseModal(close);
    setSuccess("");
    setError("");
  }

  useEffect(() => {
    dispatch(getTypes());
  }, [])

  return (
    <div className={createStyles.createContainer}>
      <h1>CREATE A POKEMON</h1>
      <div className={createStyles.previewForm}>
        <form className={createStyles.formCreate} id="createForm">
          <div className={createStyles.fromGroup}>
            <label htmlFor="name">Name(*)</label>
            <input name="name" id="name" type="text" onChange={handleChange} placeholder="pikachu"/>
            <span className={createStyles.error}>{errors.name}</span>
          </div>

          <div className={createStyles.fromGroup}>
            <label htmlFor="image">Image(*)</label>
            <input name="image" id="image" type="text" onChange={handleChange} placeholder="https://shorturl.at/yzFTW"/>
            <span className={createStyles.error}>{errors.image}</span>
          </div>

          <div className={createStyles.fromGroup}>
            <label htmlFor="life">Life(*)</label>
            <input name="life" id="life" onChange={handleChange} placeholder="25"/>
            <span className={createStyles.error}>{errors.life}</span>
          </div>

          <div className={createStyles.fromGroup}>
            <label htmlFor="attack">Attack(*)</label>
            <input name="attack" id="attack" onChange={handleChange} placeholder="34"/>
            <span className={createStyles.error}>{errors.attack}</span>
          </div>        

          <div className={createStyles.fromGroup}>
            <label htmlFor="defense">Defense(*)</label>
            <input name="defense" id="defense" onChange={handleChange} placeholder="12"/>
            <span className={createStyles.error}>{errors.defense}</span>
          </div>

          <div className={createStyles.fromGroup}>
            <label htmlFor="speed">Speed</label>
            <input name="speed" id="speed" onChange={handleChange} placeholder="15"/>
            <span className={createStyles.error}>{errors.speed}</span>
          </div>

          <div className={createStyles.fromGroup}>
            <label htmlFor="height">Height</label>
            <input name="height" id="height" onChange={handleChange} placeholder="7"/>
            <span className={createStyles.error}>{errors.height}</span>
          </div>

          <div className={createStyles.fromGroup}>
            <label htmlFor="weight">Weight</label>
            <input name="weight" id="weght" onChange={handleChange} placeholder="50"/>
            <span className={createStyles.error}>{errors.weight}</span>
          </div>

          <div className={createStyles.fromGroup}>
            <label htmlFor="type">Types(*)</label>
            <select multiple name="type" id="type" onChange={handleChange}>
              {
                pokemonTypes?.map((type, index) => {
                  return (
                    <option key={index} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  )
                })
              }
            </select>
            <span className={createStyles.error}>{errors.types}</span>
          </div>
          <div className={createStyles.btnForm}><input type="submit" value="Crear" onClick={createPokemon} disabled={Object.keys(errors).length ? true : false}/></div>
        </form>
        <div className={createStyles.cardForm}>
          {Object.keys(newPokemon).length > 0 && 
            <Cards pokemons={[{...newPokemon, id: 0}]} classCustomCards={"formCards"} classCustomCard={"formCard"}/>
          }
        </div>
        {success && !closeModal && <Modal description={success} title={"Success"} closeModal={handleClose}/>}
        {error && !closeModal && <Modal description={error} title={"Error"} closeModal={handleClose}/>}
      </div>
    </div>
  )
}

export default Create;