import React, {useState, useEffect} from 'react'
import {API} from '../config'

const Nomenclatures = () => {
  const [loading, isLoading] = useState(true)
  const [nomenclatures, setNomenclatures] = useState([])

  useEffect(() => {
    fetch(`${API}/nomenclatures`)
      .then(res => res.json())
      .then(
        (result) => {
          setNomenclatures(result)
          isLoading(false)
        }
      )
  }, [])

  if (loading) {
      return <div>Chargement…</div>;
  } else {
  return (
    <div>
    {nomenclatures.map(nomenclature => (
          <li key={nomenclature.name}>
            {nomenclature.name} {nomenclature.cards.map(card => (
              <img src={card.location}/>
            ))}
          </li>
        ))}
    </div>
  )
}
}

export default Nomenclatures
