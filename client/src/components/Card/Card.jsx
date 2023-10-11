import React from 'react';
import CardStyles from '../Card/Card.module.css';
import { NavLink } from 'react-router-dom';

const Card = ({id, name, image, types}) => {
  return (
    <div className={`${CardStyles.card} ${CardStyles[types[0]]}`}>
      <NavLink to={`/detail/${id}`}>
        <div><img src={image} alt={name} loading="lazy"/></div>
        <div className={CardStyles.cardDetail}>
          <h2>{name}</h2>
          <div className={CardStyles.types}>{types.map((type, index) => <span key={index} className={CardStyles[type]}>{type}</span>)}</div>
        </div>
      </NavLink>
    </div>
  )
}

export default Card;