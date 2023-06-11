"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
/* eslint react/jsx-key: off */
var React = require("react");
var react_admin_1 = require("react-admin"); // eslint-disable-line import/no-unresolved
var react_dom_1 = require("react-dom");
var comments_1 = require("./comments");
// import dataProvider from "./dataProvider";
var Layout_1 = require("./Layout");
var posts_1 = require("./posts");
var users_1 = require("./users");
var tags_1 = require("./tags");
var watchs_1 = require("./watchs");
var dataProvider_1 = require("./dataProvider");
react_dom_1.render(React.createElement(React.StrictMode, null,
    React.createElement(react_admin_1.Admin
    // authProvider={authProvider}
    , { 
        // authProvider={authProvider}
        dataProvider: dataProvider_1["default"], title: "Example Admin", layout: Layout_1["default"] },
        React.createElement(React.Fragment, null,
            React.createElement(react_admin_1.Resource, __assign({ name: "posts" }, posts_1["default"])),
            React.createElement(react_admin_1.Resource, __assign({ name: "comments" }, comments_1["default"])),
            React.createElement(react_admin_1.Resource, __assign({ name: "tags" }, tags_1["default"])),
            React.createElement(react_admin_1.Resource, __assign({ name: "users" }, users_1["default"])),
            React.createElement(react_admin_1.Resource, __assign({ name: "watchs" }, watchs_1["default"]))))), document.getElementById("root"));
