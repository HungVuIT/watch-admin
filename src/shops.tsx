import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useRecordContext } from "ra-core";
import { RichTextInput, RichTextInputToolbar } from "ra-input-rich-text";
import React from "react";
import {
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  ImageField,
  List,
  SimpleForm,
  SimpleList,
  TextField,
  TextInput,
} from "react-admin";

export const ShopList = () => {
  const isSmall = useMediaQuery<any>((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.shopname}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="name" label="Tên cửa hàng"/>
          <EditButton />
          <DeleteButton />
        </Datagrid>
      )}
    </List>
  );
};

const ShopTitle = () => {
  const record = useRecordContext();
  return <span>Shop {record ? `"${record.title}"` : ""}</span>;
};

export const ShopEdit = (props) => {
  return (
    <Edit title="Edit Shop" {...props}>
      <ShopDetail />
    </Edit>
  );
};

const ShopDetail = () => {
  const record = useRecordContext();

  const handleClick = () => {
    window.location.href = "http://localhost:3000/#/users/" + record.id;
  };
  return (
    <SimpleForm>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <TextInput source="name" label="Tên cửa hàng"/>
            </div>
            <div>
              <RichTextInput
                source="description"
                toolbar={<RichTextInputToolbar />}
                label="Mô tả ngắn"
              />
            </div>
            <div>
              <RichTextInput
                source="content"
                toolbar={<RichTextInputToolbar />}
                label="Mô tả chi tiết"
              />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
            <TextInput source="province" label="Tỉnh thành"/>
              <TextInput source="district" label="Quận huyện"/>
    
              <TextInput source="ward" label="Phường xẫ"/>
              <TextInput source="phoneNumber" label="Số điện thoại"/>
            </div>
            <div style={{ display: "flex", gap: "10px" }}></div>

            <TextInput source="address" label="Số nhà, tên đường"/>
            <TextInput source="email" label="Email liên hệ"/>
            <Button variant="contained" color="warning" onClick={handleClick}>
              Tới chủ cửa hàng
            </Button>
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
            src={record.logo}
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
            Logo
          </Typography>
        </Box>
      </div>
    </SimpleForm>
  );
};
