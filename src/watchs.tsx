import { Button, Paper, useMediaQuery } from "@mui/material";
import { useRecordContext } from "ra-core";
import { RichTextInput, RichTextInputToolbar } from "ra-input-rich-text";
import React from "react";
import {
  BooleanInput,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  List,
  NumberInput,
  SimpleForm,
  SimpleList,
  TextField,
  TextInput
} from "react-admin";
import Carousel from "react-material-ui-carousel";

export const WatchList = () => {
  const isSmall = useMediaQuery<any>((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.watchname}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          {/* <ImageField source="image[0]" label="Image" sx={{width: "30px", height: "30px", c}} /> */}
          <TextField source="name" label="Tên đồng hồ"/>
          <TextField source="quantity" label="Số lượng"/>
          <TextField source="saled" label="Đã bán"/>
          <TextField source="price" label="Giá đơn vị" />
          <EditButton />
          <DeleteButton />
        </Datagrid>
      )}
    </List>
  );
};

// const WatchTitle = () => {
//   const record = useRecordContext();
//   return <span>Watch {record ? `"${record.title}"` : ""}</span>;
// };

export const WatchEdit = (props) => {
  return (
    <Edit title="Edit Watch" {...props}>
      <WatchDetail />
    </Edit>
  );
};

const WatchDetail = () => {
  const record = useRecordContext();

  const handleClick = () => {
    window.location.href = "http://localhost:3000/#/shops/" + record.SID;
  };
  return (
    
    <SimpleForm>
      <Carousel
              animation="slide"
              indicators={false}
              sx={{ width: "700px", border: "2px solid darkseagreen" }}
            >
              {record.image.map((image, index) => (
                <Paper key={index} sx={{ height: "500px" }}>
                  <img
                    src={image}
                    alt={`Slide ${index}`}
                    style={{ height: "100%", width: "100%", objectFit: "contain" }}
                  />
                </Paper>
              ))}
            </Carousel>
      <div style={{width: "60%" }}>
        <div style={{ flex: 1 }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            
            <div style={{ display: "flex", gap: "10px" }}>
              <TextInput source="name" label="Tên đồng hồ"/>
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
              <NumberInput source="quantity" label="Số lượng sản phẩm"/>
              <NumberInput source="saled" label="Đã bán"/>
              <NumberInput source="price" label="Giá đơn vị"/>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <TextInput source="gender" label="Giới tính"/>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <TextInput source="materialCord" label="Chất liệu dây"/>
              <TextInput source="glassSurface" label="Chất liệu kính"/>
              <TextInput source="glassSize" label="Kích thước mặt kính"/>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <TextInput source="weight" label="Độ cao"/>
              <TextInput source="height" label="Độ nặng"/>
              <TextInput source="length" label="Độ dài"/>
              <TextInput source="width" label="Độ rộng"/>
            </div>
            <TextInput source="madeBy" label="Xuất sứ"/>
            <BooleanInput source="isActive" label="Khả dụng"/>
            <Button variant="contained" color="warning" onClick={handleClick}>
              Đi tới cửa hàng
            </Button>
          </div>
        </div>
      </div>
    </SimpleForm>
  );
};
