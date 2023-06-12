import { useMediaQuery } from "@mui/material";
import { RichTextInput, RichTextInputToolbar } from "ra-input-rich-text";
import React from "react";
import {
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  List,
  SimpleForm,
  SimpleList,
  TextField,
  TextInput
} from "react-admin";

export const NewList = () => {
  const isSmall = useMediaQuery<any>((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.newname}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="title" label="Tiêu đề"/>
          <EditButton />
          <DeleteButton />
        </Datagrid>
      )}
    </List>
  );
};

export const NewCreate = (props) => (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="title" />
        <div>
              <RichTextInput
                source="content"
                toolbar={<RichTextInputToolbar />}
              />
            </div>
      </SimpleForm>
    </Create>
  );

// const NewTitle = () => {
//   const record = useRecordContext();
//   return <span>New {record ? `"${record.title}"` : ""}</span>;
// };

export const NewEdit = (props) => {
  return (
    <Edit title="Edit New" {...props}>
      <NewDetail />
    </Edit>
  );
};

const NewDetail = () => {
  // const record = useRecordContext();

  // const handleClick = () => {
  //   window.location.href = "http://localhost:3000/#/users/" + record.id;
  // };
  return (
    <SimpleForm>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <TextInput source="name" label="Tiêu đề"/>
            </div>

            <div>
              <RichTextInput
                source="content"
                toolbar={<RichTextInputToolbar />}
                label ="Nội dung"
              />
            </div>

           
          </div>
        </div>

        
      </div>
    </SimpleForm>
  );
};
