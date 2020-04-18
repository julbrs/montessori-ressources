// in posts.js
import React from 'react';
import { ChipField, ArrayField, SingleFieldList, ReferenceField, List, Datagrid, Edit, Create, SimpleForm, TextField, EditButton, TextInput, DateInput } from 'react-admin';
import BookIcon from '@material-ui/icons/Book';
export const NomenclatureIcon = BookIcon;

export const NomenclatureList = (props) => (
    <List {...props}>
        <Datagrid>
          <ReferenceField source="_id" reference="s"><TextField source="_id" /></ReferenceField>
          <TextField source="name" />
          <ArrayField source="cards">
              <SingleFieldList>
                  <ChipField source="_id" />
                </SingleFieldList>
            </ArrayField>
          
          <EditButton basePath="/nomenclature" />
        </Datagrid>
    </List>
);

const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const NomenclatureEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="_id" />
            <TextInput source="title" />
            <TextInput source="teaser" options={{ multiLine: true }} />
            <TextInput multiline source="body" />
            <DateInput label="Publication date" source="published_at" />
            <TextInput source="average_note" />
            <TextInput disabled label="Nb views" source="views" />
        </SimpleForm>
    </Edit>
);

export const NomenclatureCreate = (props) => (
    <Create title="Create a Post" {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="teaser" options={{ multiLine: true }} />
            <TextInput multiline source="body" />
            <TextInput label="Publication date" source="published_at" />
            <TextInput source="average_note" />
        </SimpleForm>
    </Create>
);
