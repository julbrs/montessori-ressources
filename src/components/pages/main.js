import React from 'react'

import banner from '../../images/banner.jpg'
import Image from 'react-bulma-components/lib/components/image'
import Nomenclatures from '../nomenclatures'

const Main = () => {
  return(
    <>
        <Image  src={banner} style={{ width: "100%", marginLeft: "auto",  marginRight: "auto"}}/>
        <Nomenclatures />
    </>
  )
}


export default Main
