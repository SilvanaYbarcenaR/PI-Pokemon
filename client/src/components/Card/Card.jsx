import React from 'react';
import CardStyles from '../Card/Card.module.css';
import { NavLink } from 'react-router-dom';

const Card = ({id, name, image, types}) => {
  return (
    <div className={CardStyles.card}>
      <NavLink to={`/detail/${id}`}>
        <div><img src={image} alt={name} loading="lazy"/></div>
        <h2>{name}</h2>
        <p>Types: {types.map((type, index) => (index === 0 ? "" : ", ") + type)}</p>
      </NavLink>
    </div>
  )
}

export default Card;