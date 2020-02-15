import React from 'react'
import { Link } from 'react-router-dom'


const Nomenclature = (props) => {
  return (
    <div className="nomenclature">
      <p>{props.nomenclature.name}</p>
      {props.nomenclature.cards.map(card => (
        <img key={card._id} alt={card.originalname}src={card.location}/>
      ))}
      <Link to={`/nomenclature/${props.nomenclature._id}`}>Print me !</Link>
    </div>
  )

}
export default Nomenclature
