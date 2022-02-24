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
  FormDataConsumer,
  ReferenceInput,
  FileInput,
  FileField,
  TextField,
  TextInput,
  ShowButton,
  EditButton,
  DeleteButton,
  RichTextField,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
  SelectField,
  ImageField,
  ArrayField,
  ChipField,
  Labeled,
  BooleanInput,
  BooleanField,
  required,
  useRecordContext,
} from "react-admin";
import RichTextInput from "ra-input-rich-text";

const choices = [
  { id: "file", name: "File" },
  { id: "nomenclature", name: "Nomenclature" },
];

const nomenclatures = [
  { id: 1, name: "Type 1 (object association)" },
  { id: 2, name: "Type 2 (image association)" },
];

export const DocumentList = (props) => (
  <List {...props} sort={{ field: "createdate", order: "DESC" }}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="slug" />
      <DateField source="createdate" label="Created" />
      <TextField source="title" />
      <BooleanField source="validated" />
      <SelectField source="type" choices={choices} />
      <SelectField source="nomenclature_type" choices={nomenclatures} />
      <ReferenceField
        label="Category"
        source="category_id"
        reference="categories"
      >
        <ChipField source="slug" />
      </ReferenceField>
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" redirect={false} />
    </Datagrid>
  </List>
);

const ConditionalFileField = (props) => {
  const record = useRecordContext(props);
  return record && record.type === "file" ? (
    <Labeled label="File">
      <FileField source="file.src" title="file.title" {...props} />
    </Labeled>
  ) : null;
};

const ConditionalCardsField = (props) => {
  const record = useRecordContext(props);
  return record && record.type === "nomenclature" ? (
    <ArrayField source="cards" {...props}>
      <Datagrid>
        <TextField label="Name" source="name" />
        <ImageField label="File" source="file.src" title="file.title" />
      </Datagrid>
    </ArrayField>
  ) : null;
};

export const DocumentShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="slug" />
      <SelectField source="type" choices={choices} />
      <ReferenceField
        label="Category"
        source="category_id"
        reference="categories"
      >
        <TextField source="slug" />
      </ReferenceField>
      <TextField source="title" />
      <RichTextField source="description" />
      <DateField source="createdate" options={{ disabled: true }} />
      <ConditionalFileField />
      <DateField source="lastupdate" options={{ disabled: true }} />

      <ConditionalCardsField />
    </SimpleShowLayout>
  </Show>
);

export const DocumentCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <SelectInput
        fullWidth
        source="type"
        choices={choices}
        helperText="the tool currently support either file (just a pdf file) or nomenclature (a set of images and text that will be arranged automatically in pdf for output)"
      />
      <EditCreate />
    </SimpleForm>
  </Create>
);

export const DocumentEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <DateInput source="createdate" options={{ disabled: true }} />
      <DateInput source="lastupdate" options={{ disabled: true }} />
      <SelectField source="type" choices={choices} />
      <EditCreate />
    </SimpleForm>
  </Edit>
);

const EditCreate = () => (
  <>
    <TextInput
      source="id"
      helperText="Id of the document. Must be unique. Used in url as slug."
      fullWidth
      validate={[required()]}
    />
    <TextInput
      source="slug"
      helperText="Slug of the document"
      fullWidth
      validate={[required()]}
    />
    <TextInput
      source="title"
      helperText="Name of the document"
      fullWidth
      validate={[required()]}
    />

    <BooleanInput source="validated" helperText="Visible ?" fullWidth />
    <TextInput
      source="author"
      helperText="Provide author name for credit"
      fullWidth
      validate={[required()]}
    />
    <ReferenceInput
      fullWidth
      label="Category"
      source="category_id"
      reference="categories"
    >
      <SelectInput
        optionText="slug"
        helperText="Select here the category for this document"
      />
    </ReferenceInput>

    <FormDataConsumer>
      {({ formData, ...rest }) =>
        formData.type === "file" && (
          <FileInput
            source="file"
            label="File"
            accept="application/pdf"
            helperText="For a file document you must upload a pdf here"
            {...rest}
          >
            <FileField source="src" title="title" />
          </FileInput>
        )
      }
    </FormDataConsumer>

    <FormDataConsumer>
      {({ formData, ...rest }) =>
        formData.type === "nomenclature" && (
          <>
            <SelectInput
              fullWidth
              source="nomenclature_type"
              choices={nomenclatures}
              helperText="Choose the nomenclature type"
            />
            <ArrayInput source="cards">
              <SimpleFormIterator>
                <TextInput label="Label" source="name" />
                <FileInput
                  source="file"
                  label="File"
                  accept="image/*"
                  helperText="Provide one image per card"
                  {...rest}
                >
                  <ImageField source="src" title="title" />
                </FileInput>
              </SimpleFormIterator>
            </ArrayInput>
          </>
        )
      }
    </FormDataConsumer>

    <RichTextInput
      source="description"
      helperText="This description field is not used yet."
    />
  </>
);
