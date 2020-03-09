import React, {useState, useEffect} from 'react'
import {API} from '../config'

import Nomenclature from './nomenclature'
import Columns from 'react-bulma-components/lib/components/columns'
import Section from 'react-bulma-components/lib/components/section'

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
      return (
        <Section>
          Loading
        </Section>
      )
  } else {
  return (
    <Section>
      <Columns multiline={true} breakpoint="desktop">
      {nomenclatures.map(nomenclature => (
              <Nomenclature key={nomenclature._id} nomenclature={nomenclature} />
          ))}
      </Columns>
    </Section>
  )
}
}

export default Nomenclatures
