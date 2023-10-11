import { useDispatch, useSelector } from "react-redux";
import { clearPagination, filterByAttack, filterByOrder, filterByOrigin, filterByTypes, getTypes } from "../../redux/actions";
import { useEffect } from "react";
import filtersStyles from "./Filters.module.css"

const Filters = () => {
  const dispatch = useDispatch();
  const pokemonTypes = useSelector((state) => state.pokemonTypes);
  const selectType = document.getElementById("type");
  const selectOrder = document.getElementById("order");
  const selectOrigin = document.getElementById("origin");
  const selectAttack = document.getElementById("attack");

  const onChange = () => {
    const type = selectType?.options[selectType?.selectedIndex].value;
    const order = selectOrder?.options[selectOrder?.selectedIndex].value;
    const origin = selectOrigin?.options[selectOrigin?.selectedIndex].value;
    const attack = selectAttack?.options[selectAttack?.selectedIndex].value;
   
    dispatch(clearPagination());
    dispatch(filterByTypes(type));
    dispatch(filterByOrder(order));
    dispatch(filterByOrigin(origin));
    dispatch(filterByAttack(attack));
  }

  useEffect(() => {
    dispatch(getTypes());
  }, [])

  return (
    <div className={filtersStyles.filters}>
      <div>
        <h4>FILTERS</h4>
        <label htmlFor="type">Types: </label>
        <select name="type" id="type" onChange={onChange}>
          <option value="all">All</option>
          {
            pokemonTypes?.map((type, index) => {
              return (
                <option key={index} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              )
            })
          }
        </select>

        <label htmlFor="order">Alphabetical order: </label>
        <select name="order" id="order" onChange={onChange}>
          <option value="unorder">---</option>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>

        <label htmlFor="origin">Origin: </label>
        <select name="origin" id="origin" onChange={onChange}>
          <option value="all">All</option>
          <option value="db">Database</option>
          <option value="api">API</option>
        </select>

        <label htmlFor="attack">Attack: </label>
        <select name="attack" id="attack" onChange={onChange}>
          <option value="all">---</option>
          <option value="asc">ASC</option>
          <option value="desc">DES</option>
        </select>
      </div>
    </div>
  )
}

export default Filters;