import React from 'react'

import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Columns, Box } from 'react-bulma-components'
import Card from './Card/Card'




const Nomenclature = props => {
  
  return (
    <div>
      {props.nomenclature.cards.map(card => (
            <Card key={card._id} alt={card.originalname} src={card.location} />
      ))}
    </div>
  )

}
export default Nomenclature
