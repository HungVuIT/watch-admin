"use strict";
// import fakeRestProvider from 'ra-data-fakerest';
// import { DataProvider, withLifecycleCallbacks } from 'react-admin';
// import get from 'lodash/get';
// import data from './data';
// import addUploadFeature from './addUploadFeature';
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
// const dataProvider = withLifecycleCallbacks(fakeRestProvider(data, true), [
//     {
//         resource: 'posts',
//         beforeDelete: async ({ id }, dp) => {
//             // delete related comments
//             const { data: comments } = await dp.getList('comments', {
//                 filter: { post_id: id },
//                 pagination: { page: 1, perPage: 100 },
//                 sort: { field: 'id', order: 'DESC' },
//             });
//             await dp.deleteMany('comments', {
//                 ids: comments.map(comment => comment.id),
//             });
//             return { id };
//         },
//     },
// ]);
// const addTagsSearchSupport = (dataProvider: DataProvider) => ({
//     ...dataProvider,
//     getList: (resource, params) => {
//         if (resource === 'comments') {
//             // partial pagination
//             return dataProvider
//                 .getList(resource, params)
//                 .then(({ data, total }) => ({
//                     data,
//                     pageInfo: {
//                         hasNextPage:
//                             params.pagination.perPage * params.pagination.page <
//                             total,
//                         hasPreviousPage: params.pagination.page > 1,
//                     },
//                 }));
//         }
//         if (resource === 'tags') {
//             const matchSearchFilter = Object.keys(params.filter).find(key =>
//                 key.endsWith('_q')
//             );
//             if (matchSearchFilter) {
//                 const searchRegExp = new RegExp(
//                     params.filter[matchSearchFilter],
//                     'i'
//                 );
//                 return dataProvider.getList(resource, {
//                     ...params,
//                     filter: item => {
//                         const matchPublished =
//                             item.published == params.filter.published; // eslint-disable-line eqeqeq
//                         const fieldName = matchSearchFilter.replace(
//                             /(_q)$/,
//                             ''
//                         );
//                         return (
//                             matchPublished &&
//                             get(item, fieldName).match(searchRegExp) !== null
//                         );
//                     },
//                 });
//             }
//         }
//         return dataProvider.getList(resource, params);
//     },
// });
// const uploadCapableDataProvider = addUploadFeature(
//     addTagsSearchSupport(dataProvider)
// );
// const sometimesFailsDataProvider = new Proxy(uploadCapableDataProvider, {
//     get: (target, name) => (resource, params) => {
//         if (typeof name === 'symbol' || name === 'then') {
//             return;
//         }
//         // set session_ended=true in localStorage to trigger an API auth error
//         if (localStorage.getItem('session_ended')) {
//             const error = new Error('Session ended') as ResponseError;
//             error.status = 403;
//             return Promise.reject(error);
//         }
//         // add rejection by type or resource here for tests, e.g.
//         // if (name === 'delete' && resource === 'posts') {
//         //     return Promise.reject(new Error('deletion error'));
//         // }
//         if (
//             resource === 'posts' &&
//             params.data &&
//             params.data.title === 'f00bar'
//         ) {
//             return Promise.reject(new Error('this title cannot be used'));
//         }
//         return uploadCapableDataProvider[name](resource, params);
//     },
// });
// const delayedDataProvider = new Proxy(sometimesFailsDataProvider, {
//     get: (target, name) => (resource, params) => {
//         if (typeof name === 'symbol' || name === 'then') {
//             return;
//         }
//         return new Promise(resolve =>
//             setTimeout(
//                 () =>
//                     resolve(sometimesFailsDataProvider[name](resource, params)),
//                 300
//             )
//         );
//     },
// });
// interface ResponseError extends Error {
//     status?: number;
// }
// export default delayedDataProvider;
var react_admin_1 = require("react-admin");
var query_string_1 = require("query-string");
var apiUrl = 'https://dhwatch.onrender.com/api';
var httpClient = react_admin_1.fetchUtils.fetchJson;
exports["default"] = {
    getList: function (resource, params) {
        var skip = params.skip, take = params.take;
        // const { field, order } = params.sort;
        var query = {
            // sort: JSON.stringify([field, order]),
            // range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            // filter: JSON.stringify(params.filter),
            skip: skip,
            take: take
        };
        var url = apiUrl + "/" + resource + "/list?" + query_string_1.stringify(query);
        return httpClient(url).then(function (_a) {
            var headers = _a.headers, json = _a.json;
            return ({
                data: json.data,
                total: 10
            });
        });
    },
    getOne: function (resource, params) {
        return httpClient(apiUrl + "/" + resource + "/" + params.id).then(function (_a) {
            var json = _a.json;
            return ({
                data: json
            });
        });
    },
    getMany: function (resource, params) {
        var query = {
            filter: JSON.stringify({ ids: params.ids })
        };
        var url = apiUrl + "/" + resource + "?" + query_string_1.stringify(query);
        return httpClient(url).then(function (_a) {
            var json = _a.json;
            return ({ data: json });
        });
    },
    getManyReference: function (resource, params) {
        var _a;
        var _b = params.pagination, page = _b.page, perPage = _b.perPage;
        var _c = params.sort, field = _c.field, order = _c.order;
        var query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(__assign(__assign({}, params.filter), (_a = {}, _a[params.target] = params.id, _a)))
        };
        var url = apiUrl + "/" + resource + "?" + query_string_1.stringify(query);
        return httpClient(url).then(function (_a) {
            var headers = _a.headers, json = _a.json;
            return ({
                data: json,
                total: parseInt(headers.get('content-range').split('/').pop(), 10)
            });
        });
    },
    create: function (resource, params) {
        return httpClient(apiUrl + "/" + resource, {
            method: 'POST',
            body: JSON.stringify(params.data)
        }).then(function (_a) {
            var json = _a.json;
            return ({
                data: __assign(__assign({}, params.data), { id: json.id })
            });
        });
    },
    update: function (resource, params) {
        return httpClient(apiUrl + "/" + resource + "/" + params.id, {
            method: 'PUT',
            body: JSON.stringify(params.data)
        }).then(function (_a) {
            var json = _a.json;
            return ({ data: json });
        });
    },
    updateMany: function (resource, params) {
        var query = {
            filter: JSON.stringify({ id: params.ids })
        };
        return httpClient(apiUrl + "/" + resource + "?" + query_string_1.stringify(query), {
            method: 'PUT',
            body: JSON.stringify(params.data)
        }).then(function (_a) {
            var json = _a.json;
            return ({ data: json });
        });
    },
    "delete": function (resource, params) {
        return httpClient(apiUrl + "/" + resource + "/" + params.id, {
            method: 'DELETE'
        }).then(function (_a) {
            var json = _a.json;
            return ({ data: json });
        });
    },
    deleteMany: function (resource, params) {
        var query = {
            filter: JSON.stringify({ id: params.ids })
        };
        return httpClient(apiUrl + "/" + resource + "?" + query_string_1.stringify(query), {
            method: 'DELETE',
            body: JSON.stringify(params.data)
        }).then(function (_a) {
            var json = _a.json;
            return ({ data: json });
        });
    }
};
