import React from 'react'
import Card from '../Card/Card';
import CardsStyles from '../Cards/Cards.module.css'

const Cards = ({ pokemons, classCustomCards, classCustomCard }) => {
  return (
    <div className={`${CardsStyles.cardsContainer} ${CardsStyles[classCustomCards]}`}>
      {!pokemons?.length ? 
        <p className={CardsStyles.notFound}>No pokemons were found.</p> 
        :
        pokemons?.map(({ id, name, image, types, attack, life, defense, speed, height, weight, created }) => {
          return (
            <Card
              key={id} 
              id={id}
              image={image}
              name={name}
              types={types}
              attack={attack}
              life={life}
              defense={defense}
              speed={speed}
              height={height}
              weight={weight}
              created={created}
              classCustomCard={classCustomCard}
            />
          )
        })
      }
    </div>
  )
}

export default Cards;