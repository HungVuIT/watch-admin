import CategoryIcon from '@mui/icons-material/Category';
import DiamondIcon from '@mui/icons-material/Diamond';
import FeedIcon from '@mui/icons-material/Feed';
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import WatchIcon from '@mui/icons-material/Watch';
import { ThemeOptions, Typography } from "@mui/material";
import * as React from "react";
import { memo } from "react";
import {
  AppBar,
  InspectorButton,
  Layout,
  Menu,
  MenuItemLink,
  ThemeProvider,
  ToggleThemeButton,
  defaultTheme,
} from "react-admin";
import { ReactQueryDevtools } from "react-query/devtools";
export const darkTheme = {
    palette: {
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#FBBA72',
        },
        mode: 'dark' as 'dark', // Switching the dark mode on is a single property value change.
    },
    sidebar: {
        width: 200,
    },
    components: {
        ...defaultTheme.components,
        RaMenuItemLink: {
            styleOverrides: {
                root: {
                    borderLeft: '3px solid #000',
                    '&.RaMenuItemLink-active': {
                        borderLeft: '3px solid #90caf9',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                colorSecondary: {
                    color: '#ffffffb3',
                    backgroundColor: '#616161e6',
                },
            },
        },
    },
};

const MyAppBar = memo((props) => {
    const style = {
        backgroundColor: '#141414',
        color: '#fff',
      };
  return (
    <AppBar {...props} style={style}>
      <Typography flex="1" variant="h6" id="react-admin-title" />
      <ToggleThemeButton lightTheme={defaultTheme} darkTheme={darkTheme} />
      <InspectorButton />
    </AppBar>
  );
});

const MyMenu = () => {

    return (
      <>
        <Menu >
          <MenuItemLink to="/" primaryText="Trang chủ" />
          <MenuItemLink to="/users" primaryText="Người dùng" leftIcon={<PeopleIcon />} />
          <MenuItemLink to="/shops" primaryText="Cửa hàng" leftIcon={<StoreIcon />} />
          <MenuItemLink to="/watchs" primaryText="Đồng hồ" leftIcon={<WatchIcon />} />
          <MenuItemLink to="/order" primaryText="Đơn hàng" leftIcon={<ShoppingCartIcon />} />
          <MenuItemLink to="/news" primaryText="Tin tức" leftIcon={<FeedIcon />} />
          <MenuItemLink to="/categorys" primaryText="Danh mục" leftIcon={<CategoryIcon />} />
          <MenuItemLink to="/brands" primaryText="Thương hiệu" leftIcon={<DiamondIcon />} />
          {/* <MenuItemLink to="/comments" primaryText="Comments" leftIcon={<ChatBubbleIcon />} /> */}
          {/* <MenuItemLink to="/custom-route" primaryText="Miscellaneous" leftIcon={<LabelIcon />} /> */}
        </Menu>
      </>
    );
  };
  
const theme:ThemeOptions = ({
    palette: {
      mode: "dark",
      primary: {
        main: '#212121',
      },
    },
  });
const myLayout = (props) => (
  <>
  <ThemeProvider theme={theme}>
  <Layout {...props} appBar={MyAppBar} menu={MyMenu} />
    <ReactQueryDevtools
      initialIsOpen={false}
      toggleButtonProps={{ style: { width: 20, height: 30 } }}
    />
  </ThemeProvider>
    
  </>
);

export default myLayout
