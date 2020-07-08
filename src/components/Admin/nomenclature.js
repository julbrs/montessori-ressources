// in posts.js
import React from 'react';
import { Pagination, SelectInput, SimpleFormIterator, DateField, ArrayInput, ChipField, ArrayField, SingleFieldList, List, Datagrid, Edit, SimpleForm, TextField, EditButton, TextInput } from 'react-admin';
import BookIcon from '@material-ui/icons/Book';
export const NomenclatureIcon = BookIcon;

const PostPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

export const NomenclatureList = (props) => (
         <List {...props} pagination={<PostPagination />}>
           <Datagrid>
             <TextField source="name" />
             <TextField source="status" />
             <ArrayField source="cards">
               <SingleFieldList>
                 <ChipField source="originalname" />
               </SingleFieldList>
             </ArrayField>
             <DateField source="created" />
             <DateField source="updated" />
             <EditButton />
           </Datagrid>
         </List>
       );

const NomenclatureTitle = ({ record }) => {
    return <span>Nomenclature {record ? `"${record.title}"` : ''}</span>;
};

const ImageFieldInForm = ({variant, ...props}) => {
  return (
    <img src={props.record.location} width="300px" alt="card content"/>
  )
}

export const NomenclatureEdit = (props, record) => (
    <Edit undoable={false} title={<NomenclatureTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="author" />
            <SelectInput source="status" choices={[
                { id: 'DRAFT', name: 'Draft' },
                { id: 'VALIDATED', name: 'Validated' },
            ]} />
            <ArrayInput source="tags">
                <SimpleFormIterator>
                    <TextInput label="Tag" source="name" />
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="cards">
                <SimpleFormIterator disableAdd>
                    <TextInput label="Label" source="originalname" />
                    <ImageFieldInForm source="location" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);
