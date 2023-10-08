import { useDispatch, useSelector } from "react-redux";
import { filterByAttack, filterByOrder, filterByOrigin, filterByTypes, getTypes } from "../../redux/actions";
import { useEffect } from "react";

const Filters = () => {
  const dispatch = useDispatch();
  const pokemonTypes = useSelector((state) => state.pokemonTypes);

  const handleChangeType = (event) => {
    dispatch(filterByTypes(event.target.value));
  }
  const handleChangeOrder = (event) => {
    dispatch(filterByOrder(event.target.value));
  }
  const handleChangeOrigin= (event) => {
    dispatch(filterByOrigin(event.target.value));
  }
  const handleChangeAttack= (event) => {
    dispatch(filterByAttack(event.target.value));
  }

  useEffect(() => {
    dispatch(getTypes());
  }, [])

  return (
    <div>
      <label>Types: </label>
        <select onChange={handleChangeType}>
          <option value="all">All</option>
          {
            pokemonTypes?.map((type, index) => {
              return (
                <option key={index} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              )
            })
          }
        </select>
        <label>Alphabetical order: </label>
        <select onChange={handleChangeOrder}>
          <option value="unorder">---</option>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
        <label>Origin: </label>
        <select onChange={handleChangeOrigin}>
          <option value="all">All</option>
          <option value="db">Database</option>
          <option value="api">API</option>
        </select>
        <label>Attack: </label>
        <select onChange={handleChangeAttack}>
          <option value="all">All</option>
          <option value="asc">ASC</option>
          <option value="desc">DES</option>
        </select>
    </div>
  )
}

export default Filters;