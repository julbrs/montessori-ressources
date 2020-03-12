import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {API} from '../../tools/config'
import { Columns } from 'react-bulma-components'
import EdiText from 'react-editext'
import CardView from './CardView'

const NomenclatureView = ()  => {
  let { nomenclatureId } = useParams();
  const [loading, isLoading] = useState(true)
  const [nomenclature, setNomenclature] = useState([])

  // handle the card change
  const onChangeCard = (card) => {
    let cards = nomenclature.cards.map(e => {
      if(e._id === card.id) {
        return card
      }
      else {
        return e
      }
    })
    handleSave({cards: cards})
  }

  // save state to backend
  const handleSave = (data) => {
    setNomenclature({...nomenclature, ...data })
    // save the state
    fetch(`${API}/nomenclatures/${nomenclatureId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(() => {
      console.log("success")
    })
    .catch((err) => {
      console.log(err)
    })
  }

  // load the nomenclature from the backend
  useEffect(() => {
    fetch(`${API}/nomenclatures/${nomenclatureId}`)
      .then(res => res.json())
      .then(
        (result) => {
          setNomenclature(result)
          isLoading(false)
        }
      )
  }, [nomenclatureId])

  // print the component
  if (loading) {
      return <div>Chargement…</div>;
  } else {
    return (
      <div>
      <EdiText
          className="title is-3"
          type="text"
          value={nomenclature.name}
          onSave={value => {handleSave({name: value})}}
          editOnViewClick
          submitOnUnfocus
          submitOnEnter
        />

      <Columns multiline={true}>
        {nomenclature.cards.map(card => (
          <CardView
            key={card._id}
            card={card}
            onChange={onChangeCard}
          />
        ))}
      </Columns>
      </div>
    )
  }
}
export default NomenclatureView
