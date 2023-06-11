import { Box, Typography, makeStyles, useMediaQuery } from "@mui/material";
import React, { CSSProperties } from "react";
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  ShowBase,
  ShowButton,
  DeleteButton,
  TextInput,
  SimpleForm,
  Edit,
  BooleanInput,
  ImageField,
  Create,
  useRecordContext,
  SelectField,
  SelectInput,
  DateInput,
  FileInput,
  TabbedForm,
  FormTab,
  ImageInput,
} from "react-admin";

export const BrandList = () => {
  const isSmall = useMediaQuery<any>((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.brandname}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="name" label="Tên thương hiệu"/>
          <TextField source="description" label="Mô tả"/>
          <ImageField source="image" label="Logo"/>
          <EditButton />
          <DeleteButton />
        </Datagrid>
      )}
    </List>
  );
};

export const BrandCreate = (props) => (
    <Create {...props}>
      <SimpleForm>
      <TextInput source="name" label="Tên danh mục"/>
        <TextInput source="description" label="Mô tả"/>
        <FileInput source="image" label="Ảnh minh hoạ"/>
      </SimpleForm>
    </Create>
  );


export const BrandEdit = (props) => {
  return (
    <Edit title="Edit Brand" {...props}>
      <BrandDetail />
    </Edit>
  );
};


const BrandDetail = () => {
  const record = useRecordContext();
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