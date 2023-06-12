import { useMediaQuery } from "@mui/material";
import React from "react";
import {
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  FileInput,
  FormTab,
  ImageField,
  ImageInput,
  List,
  SimpleForm,
  SimpleList,
  TabbedForm,
  TextField,
  TextInput
} from "react-admin";

export const CategoryList = () => {
  const isSmall = useMediaQuery<any>((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.categoryname}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="name" label="Tên danh mục"/>
          <TextField source="description" label="Mô tả"/>
          <ImageField source="image" label="Logo"/>
          <EditButton />
          <DeleteButton />
        </Datagrid>
      )}
    </List>
  );
};

export const CategoryCreate = (props) => (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" label="Tên danh mục"/>
        <TextInput source="description" label="Mô tả"/>
        <FileInput source="image" label="Ảnh minh hoạ"/>
      </SimpleForm>
    </Create>
  );


export const CategoryEdit = (props) => {
  return (
    <Edit title="Edit Category" {...props}>
      <CategoryDetail />
    </Edit>
  );
};


const CategoryDetail = () => {
  // const record = useRecordContext();
  return (
    <TabbedForm>
        <FormTab label="Chi tiết">
        <TextInput source="name" label="Tên danh mục"/>
        <TextInput source="description" label="Mô tả"/>
          <ImageInput source="image" label="Ảnh minh hoạ"/>
        </FormTab>
      </TabbedForm>
  );
};
