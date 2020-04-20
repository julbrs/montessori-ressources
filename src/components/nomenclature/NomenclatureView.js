import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Columns } from 'react-bulma-components'
import EdiText from 'react-editext'
import CardView from './CardView'
import client from '../../tools/client'

const NomenclatureView = ()  => {
  let { nomenclatureId } = useParams();
  const [loading, isLoading] = useState(true)
  const [nomenclature, setNomenclature] = useState([])

  // handle the card change
  const onChangeCard = (card) => {
    let cards = nomenclature.cards.map(e => {
      if(e.id === card.id) {
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
    //
    client.put(`/nomenclatures/${nomenclatureId}`,
    {
      data
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
    client.get(`/nomenclatures/${nomenclatureId}`)
      .then(
        (result) => {
          setNomenclature(result.data)
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
            key={card.id}
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
