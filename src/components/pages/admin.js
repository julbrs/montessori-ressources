import React from 'react'

import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import {API} from '../../tools/config'
import { NomenclatureList, NomenclatureEdit, NomenclatureCreate, NomenclatureIcon } from './nomenclature';


const Info = () => {
  return(
    <Admin dataProvider={restProvider(API)}>
        <Resource
          name="nomenclatures"
          list={NomenclatureList}
          edit={NomenclatureEdit}
          create={NomenclatureCreate}
          icon={NomenclatureIcon}
        />
    </Admin>
  )
}


export default Info
