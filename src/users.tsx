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
} from "react-admin";

export const UserList = () => {
  const isSmall = useMediaQuery<any>((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.username}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <ImageField source="avatar" label="Ảnh đại diện"/>
          <TextField source="firstName" label="Tên"/>
          <TextField source="lastName" label="Họ"/>
          <EmailField source="email" label="Email"/>
          <TextField source="phone" label="Số điện thoại"/>
          <TextField source="role" label="Loại người dùng"/>
          {/* <MyUrlField source="website" /> */}
          <EditButton />
          <DeleteButton />
        </Datagrid>
      )}
    </List>
  );
};

// const UserTitle = () => {
//   const record = useRecordContext();
//   return <span>User {record ? `"${record.title}"` : ""}</span>;
// };

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      {/* <ReferenceInput source="userId" reference="users" /> */}
      <TextInput source="title" />
      <TextInput source="body" multiline rows={5} />
    </SimpleForm>
  </Create>
);

export const UserEdit = (props) => {
  return (
    <Edit title="Edit User" {...props}>
      <UserDetail />
    </Edit>
  );
};

const UserDetail = () => {
  const record = useRecordContext();

  return (
    <SimpleForm>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <TextInput source="id" disabled />

              <SelectInput
                source="role"
                choices={[
                  { id: "user", name: "User" },
                  { id: "vendor", name: "Vendor" },

                ]}
                label="Loại người dùng"
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <TextInput source="firstName" label="Tên"/>
              <TextInput source="lastName" label="Họ"/>
            </div>
            <TextInput source="username" label="Username"/>
            <TextInput source="email" label="Email"/>
            <div style={{ display: "flex", gap: "10px" }}>
              <TextInput source="province" label="Tỉnh thành"/>
              <TextInput source="district" label="Quận huyện"/>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <TextInput source="ward" label="Phường xẫ"/>
              <TextInput source="phoneNumber" label="Số điện thoại"/>
            </div>
            <TextInput source="address" label="Số nhà, tên đường"/>
            <TextInput source="birthDay" label="Ngày sinh"/>

            <DateInput source="birthDay" label="Ngày sinh"/>
            <BooleanInput source="isActive" label="Khả dụng"/>
          </div>
        </div>

        <Box
          sx={{
            width: "300px",
            height: "400px",
            marginLeft: "100px",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid lightgray",
            boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            padding: "20px",
          }}
        >
          <img
            src={record.avatar}
            alt="My Image"
            style={{
              objectFit: "contain",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
          <Typography
            variant="h5"
            component="h2"
            align="center"
            sx={{ fontWeight: "bold", mt: 2 }}
          >
            Ảnh đại diện
          </Typography>
        </Box>
      </div>
    </SimpleForm>
  );
};
