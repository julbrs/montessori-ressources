import React from 'react';
import { SelectInput, EmailField, List, Datagrid, Edit, SimpleForm, TextField, EditButton, TextInput } from 'react-admin';
import Person from '@material-ui/icons/Person';
export const UserIcon = Person;

export const UserList = (props) => (
         <List {...props}>
           <Datagrid>
             <TextField source="name" />
             <EmailField source="email" />
             <TextField source="role" />
             <TextField source="googleId" />
             <TextField source="facebookId" />
             <EditButton />
           </Datagrid>
         </List>
       );

const UserTitle = ({ record }) => {
    return <span>User {record ? `"${record.title}"` : ''}</span>;
};

export const UserEdit = (props) => (
    <Edit undoable={false} title={<UserTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="googleId" />
            <TextInput source="facebookId" />
            <SelectInput source="role" choices={[
                { id: 'USER', name: 'User' },
                { id: 'ADMIN', name: 'Admin' },
            ]} />
        </SimpleForm>
    </Edit>
);
