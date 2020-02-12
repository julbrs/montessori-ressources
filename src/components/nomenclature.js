import React from 'react'

import TagsList from './Tags/TagsList'


const Nomenclature = (props) => {
  const TAGS = [{id:'t1', name:'pot'}] // here goes the API for tags

  return (
    <div className="nomenclature">
      <p>{props.nomenclature.name}</p>
      {props.nomenclature.cards.map(card => (
        <img key={card._id} alt={card.originalname}src={card.location}/>
      ))}
      <p>by author</p>
      <TagsList tags={TAGS}/>
    </div>
  )

}
export default Nomenclature
