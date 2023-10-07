import React from 'react'
import Card from '../Card/Card';
import CardsStyles from '../Cards/Cards.module.css'

const Cards = ({allPokemons}) => {
  return (
    <div className={CardsStyles.cardsContainer}>
      {
        allPokemons?.map(({ id, name, image, types }) => {
          return (
            <Card
              key={id} 
              id={id}
              image={image}
              name={name}
              types={types}
            />
          )
        })
      }
    </div>
  )
}

export default Cards;