import React from 'react'


const Nomenclature = (props) => {
  return (
    <div className="nomenclature">
      <p>{props.nomenclature.name}</p>
      {props.nomenclature.cards.map(card => (
        <img key={card._id} alt={card.originalname}src={card.location}/>
      ))}
    </div>
  )

}
export default Nomenclature
