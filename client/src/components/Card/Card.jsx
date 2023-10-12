import React from 'react';
import cardStyles from '../Card/Card.module.css';
import { NavLink } from 'react-router-dom';

const Card = ({id, name, image, types, attack, life, defense}) => {
  return (
    <div className={`${cardStyles.card} ${cardStyles[types[0]]}`}>
      <NavLink to={`/detail/${id}`}>
        <div><img src={image} alt={name} loading="lazy"/></div>
        <div className={cardStyles.cardDetail}>
          <h2>{name}</h2>
          <div className={cardStyles.types}>{types.map((type, index) => <span key={index} className={cardStyles[type]}>{type}</span>)}</div>
          <div className={cardStyles.infoPokemon}>
            <div className={cardStyles.lifeContainer}>
            <svg version="1.1" viewBox="0 0 512 512" width="512px" xmlSpace="preserve"><g id="_x31_66_x2C__Heart_x2C__Love_x2C__Like_x2C__Twitter"><g><path d="M365.4,59.628c60.56,0,109.6,49.03,109.6,109.47c0,109.47-109.6,171.8-219.06,281.271    C146.47,340.898,37,278.568,37,169.099c0-60.44,49.04-109.47,109.47-109.47c54.73,0,82.1,27.37,109.47,82.1    C283.3,86.999,310.67,59.628,365.4,59.628z"/></g></g><g id="Layer_1"/></svg>
              <span>{life}</span>
            </div>
            <div className={cardStyles.attackContainer}>
              <svg xmlns="httpc//www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 98.841" enableBackground="new 0 0 100 98.841" xmlSpace="preserve"><path d="M74.29,57.077L100,40.612l-24.824-2.63l6.699-28.887L64.277,27.317L59.375,6.731l-7.409,19.206L31.836,0l6.361,32.513  L20.26,28.528c0,0,5.437,10.41,8.477,16.68L0,43.203l26.002,15.195l-7.467,7.689l12.077-2.207l-8.567,30.299L47.52,72.89  l6.589,16.459l6.803-13.164l21.914,22.656L71.888,68.49l24.069,2.441L74.29,57.077z"></path></svg>
              <span>{attack}</span>
            </div>
            <div className={cardStyles.defenseContainer}>
            <svg xmlns="http://www.w3.org/2000/svg" focusable="false" viewBox="0 0 12 12">
              <path fill="currentColor" d="M6 12c-.81 0-5-2.78-5-8V2.5c0-.2.12-.38.3-.46l4.5-2a.49.49 0 01.41 0l4.5 2c.17.08.29.26.29.46V4c0 5.22-4.19 8-5 8zm.05-1z"/>
            </svg>
              <span>{defense}</span>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  )
}

export default Card;