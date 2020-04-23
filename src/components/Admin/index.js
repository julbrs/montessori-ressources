import React from 'react'

import { Admin, Resource } from 'react-admin';
import restProvider from './dataprovider';
import { NomenclatureList, NomenclatureEdit, NomenclatureIcon } from './nomenclature';
import { UserList, UserEdit, UserIcon } from './users';


const Info = () => {
  return(
    <Admin dataProvider={restProvider}>
        <Resource
          name="nomenclatures"
          list={NomenclatureList}
          edit={NomenclatureEdit}
          icon={NomenclatureIcon}
        />
        <Resource
          name="users"
          list={UserList}
          edit={UserEdit}
          icon={UserIcon}
        />
    </Admin>
  )
}


export default Info
