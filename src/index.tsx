/* eslint react/jsx-key: off */
import * as React from "react";
import { Admin, Resource, CustomRoutes } from "react-admin"; // eslint-disable-line import/no-unresolved
import { render } from "react-dom";
import { Route } from "react-router-dom";

import authProvider from "./authProvider";
import comments from "./comments";
import CustomRouteLayout from "./customRouteLayout";
import CustomRouteNoLayout from "./customRouteNoLayout";
import Layout from "./Layout";
import { UserCreate, UserEdit, UserList } from "./users";
import tags from "./tags";
import dataProvider from "./dataProvider";
import { UserIcon } from "./users/UserList";

import { WatchEdit, WatchList } from "./watchs";

import { defaultTheme } from "react-admin";
import { ThemeOptions, createTheme } from "@mui/material";
import { ShopEdit, ShopList } from "./shops";
import { CategoryCreate, CategoryEdit, CategoryList } from "./categorys";
import { OrderEdit, OrderList } from "./orders";
import { BrandList, BrandEdit, BrandCreate } from "./brands";
import { NewList, NewEdit, NewCreate } from "./news";
import { Dashboard } from "./Dashboard";


render(
  <React.StrictMode>
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      dashboard={Dashboard}
      layout={Layout}
    >
      <Resource
        name="watchs"
        list={WatchList}
        edit={WatchEdit}
        // create={WatchCreate}
      />
      <Resource
        name="users"
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
        icon={UserIcon}
        recordRepresentation="name"
      />
      <Resource
        name="shops"
        list={ShopList}
        edit={ShopEdit}
        icon={UserIcon}
        recordRepresentation="name"
      />

      <Resource
        name="order"
        list={OrderList}
        edit={OrderEdit}
        icon={UserIcon}
        recordRepresentation="name"
      />
      <Resource
        name="categorys"
        list={CategoryList}
        edit={CategoryEdit}
        create={CategoryCreate}
        icon={UserIcon}
        recordRepresentation="name"
      />
            <Resource
        name="brands"
        list={BrandList}
        edit={BrandEdit}
        create={BrandCreate}
        icon={UserIcon}
        recordRepresentation="name"
      />
                  <Resource
        name="news"
        list={NewList}
        edit={NewEdit}
        create={NewCreate}
        icon={UserIcon}
        recordRepresentation="name"
      />
    </Admin>
  </React.StrictMode>,
  document.getElementById("root")
);

// render(
//   <React.StrictMode>
//     <Admin
//       authProvider={authProvider}
//       dataProvider={dataProvider}
//       title="Example Admin"
//       layout={Layout}
//     >
//       <>
//         <Resource name="watchs" {...watchs} />
//         <Resource name="comments" {...comments} />
//         <Resource name="tags" {...tags} />
//         <Resource name="users" {...users} />
//         <Resource name="watchs" {...watchs}  />
//       </>
//     </Admin>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
