// in src/Comments.js
import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  DateInput,
  DateField,
  SimpleShowLayout,
  SimpleForm,
  ReferenceField,
  ReferenceInput,
  TextField,
  TextInput,
  ShowButton,
  EditButton,
  DeleteButton,
  RichTextField,
  SelectInput,
  required,
} from "react-admin";
import RichTextInput from "ra-input-rich-text";

export const CategoryList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="title" />
      <TextField source="slug" />
      <ReferenceField
        label="Parent Category"
        source="parent_id"
        reference="categories"
      >
        <TextField source="title" />
      </ReferenceField>
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" redirect={false} />
    </Datagrid>
  </List>
);

export const CategoryShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <ReferenceField
        label="Parent Category"
        source="parent_id"
        reference="categories"
      >
        <TextField source="title" />
      </ReferenceField>
      <TextField source="title" />
      <TextField source="slug" />
      <RichTextField source="description" />
      <DateField source="createdate" options={{ disabled: true }} />
      <DateField source="lastupdate" options={{ disabled: true }} />
    </SimpleShowLayout>
  </Show>
);

export const CategoryCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" validate={[required()]} />
      <TextInput source="slug" validate={[required()]} />
      <ReferenceInput
        label="Parent Category"
        source="parent_id"
        reference="categories"
        allowEmpty
      >
        <SelectInput
          optionText="title"
          helperText="Select here the parent category if applicable."
        />
      </ReferenceInput>
      <RichTextInput source="description" />
    </SimpleForm>
  </Create>
);

export const CategoryEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" options={{ disabled: true }} />
      <DateInput source="createdate" options={{ disabled: true }} />
      <DateInput source="lastupdate" options={{ disabled: true }} />
      <TextInput source="title" validate={[required()]} />
      <TextInput source="slug" validate={[required()]} />
      <ReferenceInput
        label="Parent Category"
        source="parent_id"
        reference="categories"
        allowEmpty
      >
        <SelectInput
          optionText="title"
          helperText="Select here the parent category if applicable."
        />
      </ReferenceInput>
      <RichTextInput source="description" />
      <SelectInput
        source="rating"
        choices={[
          { id: 1, name: "Good" },
          { id: 2, name: "Okay" },
          { id: 3, name: "Bad" },
        ]}
      />
    </SimpleForm>
  </Edit>
);
