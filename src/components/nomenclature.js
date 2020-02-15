import React from 'react'

import Card from './Card/Card'
import TagsList from './Tags/TagsList'



const Nomenclature = (props) => {
  

  return (
    <div className="nomenclature">
      {props.nomenclature.cards.map(card => (
        <Card key={card._id} alt={card.originalname} src={card.location} name={props.nomenclature.name} />
      ))}
    </div>
  )

}
export default Nomenclature
