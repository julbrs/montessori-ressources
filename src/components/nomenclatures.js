import React, {useState, useEffect} from 'react'
import {API} from '../config'
import Nomenclature from './nomenclature'
import './nomenclatures.css';


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
    <div className="nomenclatures">
    {nomenclatures.map(nomenclature => (
          <Nomenclature key={nomenclature._id} nomenclature={nomenclature} />
        ))}
    </div>
  )
}
}

export default Nomenclatures
