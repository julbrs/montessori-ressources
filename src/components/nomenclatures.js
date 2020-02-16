import React, {useState, useEffect} from 'react'
import {API} from '../config'

import Nomenclature from './nomenclature'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Columns } from 'react-bulma-components'


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
    <div class="nomenclatures">
    {nomenclatures.map(nomenclature => (
          <Columns multiline={true}>
            <Nomenclature nomenclature={nomenclature} />
          </Columns>
        ))}
    </div>
  )
}
}

export default Nomenclatures
