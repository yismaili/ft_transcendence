"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.tsx":
/*!************************************************************************!*\
  !*** ./src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.tsx ***!
  \************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ PhoneAboutUs; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react-experimental/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react-experimental/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _AboutUs_AboutUs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AboutUs/AboutUs */ \"(app-pages-browser)/./src/components/Sections/Section3/AboutUs/AboutUs.tsx\");\n/* harmony import */ var _PhoneAboutUs_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PhoneAboutUs.css */ \"(app-pages-browser)/./src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.css\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction PhoneAboutUs(prop) {\n    _s();\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);\n    let timer;\n    const Switch = ()=>{\n        timer = setTimeout(()=>{\n            if (user == 1) setUser(2);\n            else if (user == 2) setUser(3);\n            else setUser(1);\n        }, 3500);\n        clearTimeout(timer);\n    };\n    Switch();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"PhoneAboutUs\",\n        children: [\n            user == 1 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_AboutUs_AboutUs__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                src: \"/img/section3/amine_black.png\",\n                name: \"El Amine El Mountassir\",\n                title: \"Front End Dev\",\n                set: prop.set\n            }, void 0, false, {\n                fileName: \"/app/src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.tsx\",\n                lineNumber: 26,\n                columnNumber: 9\n            }, this),\n            user == 2 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_AboutUs_AboutUs__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                src: \"/img/section3/alouane04_black.png\",\n                name: \"Ali Achraf Riahi\",\n                title: \"Front End Dev\",\n                set: prop.set\n            }, void 0, false, {\n                fileName: \"/app/src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.tsx\",\n                lineNumber: 34,\n                columnNumber: 9\n            }, this),\n            user == 3 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_AboutUs_AboutUs__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                src: \"/img/section3/dexter.png\",\n                name: \"Younes Ismaili\",\n                title: \"Back End Dev\",\n                set: prop.set\n            }, void 0, false, {\n                fileName: \"/app/src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.tsx\",\n                lineNumber: 42,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        className: \"circle \".concat(user == 1 && \"white\"),\n                        onClick: ()=>{\n                            setUser(1);\n                        }\n                    }, void 0, false, {\n                        fileName: \"/app/src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.tsx\",\n                        lineNumber: 50,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        className: \"circle \".concat(user == 2 && \"white\"),\n                        onClick: ()=>{\n                            setUser(2);\n                        }\n                    }, void 0, false, {\n                        fileName: \"/app/src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.tsx\",\n                        lineNumber: 57,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        className: \"circle \".concat(user == 3 && \"white\"),\n                        onClick: ()=>{\n                            setUser(3);\n                        }\n                    }, void 0, false, {\n                        fileName: \"/app/src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.tsx\",\n                        lineNumber: 63,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/app/src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.tsx\",\n                lineNumber: 49,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/app/src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.tsx\",\n        lineNumber: 24,\n        columnNumber: 5\n    }, this);\n}\n_s(PhoneAboutUs, \"P/ljefyMhxLoekUiVgNYDlcLFu0=\");\n_c = PhoneAboutUs;\nvar _c;\n$RefreshReg$(_c, \"PhoneAboutUs\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb25zL1NlY3Rpb24zL1Bob25lQWJvdXRVcy9QaG9uZUFib3V0VXMudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQzRDO0FBQ0g7QUFDYjtBQU1iLFNBQVNFLGFBQWFDLElBQVc7O0lBQzVDLE1BQU0sQ0FBQ0MsTUFBTUMsUUFBUSxHQUFHTCwrQ0FBUUEsQ0FBQztJQUNqQyxJQUFJTTtJQUNOLE1BQU1DLFNBQVM7UUFDYkQsUUFBUUUsV0FBVztZQUNqQixJQUFJSixRQUFRLEdBQUdDLFFBQVE7aUJBQ2xCLElBQUlELFFBQVEsR0FBR0MsUUFBUTtpQkFDdkJBLFFBQVE7UUFDZixHQUFHO1FBQ0hJLGFBQWFIO0lBQ2Y7SUFFQUM7SUFDQSxxQkFDRSw4REFBQ0c7UUFBSUMsV0FBVTs7WUFDWlAsUUFBUSxtQkFDUCw4REFBQ0gsd0RBQU9BO2dCQUNOVyxLQUFJO2dCQUNKQyxNQUFLO2dCQUNMQyxPQUFNO2dCQUNOQyxLQUFLWixLQUFLWSxHQUFHOzs7Ozs7WUFHaEJYLFFBQVEsbUJBQ1AsOERBQUNILHdEQUFPQTtnQkFDTlcsS0FBSTtnQkFDSkMsTUFBSztnQkFDTEMsT0FBTTtnQkFDTkMsS0FBS1osS0FBS1ksR0FBRzs7Ozs7O1lBR2hCWCxRQUFRLG1CQUNQLDhEQUFDSCx3REFBT0E7Z0JBQ05XLEtBQUk7Z0JBQ0pDLE1BQUs7Z0JBQ0xDLE9BQU07Z0JBQ05DLEtBQUtaLEtBQUtZLEdBQUc7Ozs7OzswQkFHakIsOERBQUNMOztrQ0FDQyw4REFBQ007d0JBQ0NMLFdBQVcsVUFBK0IsT0FBckJQLFFBQVEsS0FBSzt3QkFDbENhLFNBQVM7NEJBQ0xaLFFBQVE7d0JBRVo7Ozs7OztrQ0FFRiw4REFBQ1c7d0JBQ0NMLFdBQVcsVUFBK0IsT0FBckJQLFFBQVEsS0FBSzt3QkFDbENhLFNBQVM7NEJBQ1BaLFFBQVE7d0JBQ1Y7Ozs7OztrQ0FFRiw4REFBQ1c7d0JBQ0NMLFdBQVcsVUFBK0IsT0FBckJQLFFBQVEsS0FBSzt3QkFDbENhLFNBQVM7NEJBQ1BaLFFBQVE7d0JBQ1Y7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtWO0dBOUR3Qkg7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbnMvU2VjdGlvbjMvUGhvbmVBYm91dFVzL1Bob25lQWJvdXRVcy50c3g/ODRkNiJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBBYm91dFVzIGZyb20gXCIuLi9BYm91dFVzL0Fib3V0VXNcIjtcbmltcG9ydCBcIi4vUGhvbmVBYm91dFVzLmNzc1wiO1xuXG50eXBlIHByb3BzID0ge1xuICBzZXQ6IEZ1bmN0aW9uO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGhvbmVBYm91dFVzKHByb3A6IHByb3BzKSB7XG4gICAgY29uc3QgW3VzZXIsIHNldFVzZXJdID0gdXNlU3RhdGUoMSk7XG4gICAgbGV0IHRpbWVyO1xuICBjb25zdCBTd2l0Y2ggPSAoKSA9PiB7XG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh1c2VyID09IDEpIHNldFVzZXIoMik7XG4gICAgICBlbHNlIGlmICh1c2VyID09IDIpIHNldFVzZXIoMyk7XG4gICAgICBlbHNlIHNldFVzZXIoMSk7XG4gICAgfSwgMzUwMCk7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgfTtcbiAgICBcbiAgU3dpdGNoKCk7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJQaG9uZUFib3V0VXNcIj5cbiAgICAgIHt1c2VyID09IDEgJiYgKFxuICAgICAgICA8QWJvdXRVc1xuICAgICAgICAgIHNyYz1cIi9pbWcvc2VjdGlvbjMvYW1pbmVfYmxhY2sucG5nXCJcbiAgICAgICAgICBuYW1lPVwiRWwgQW1pbmUgRWwgTW91bnRhc3NpclwiXG4gICAgICAgICAgdGl0bGU9XCJGcm9udCBFbmQgRGV2XCJcbiAgICAgICAgICBzZXQ9e3Byb3Auc2V0fVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICAgIHt1c2VyID09IDIgJiYgKFxuICAgICAgICA8QWJvdXRVc1xuICAgICAgICAgIHNyYz1cIi9pbWcvc2VjdGlvbjMvYWxvdWFuZTA0X2JsYWNrLnBuZ1wiXG4gICAgICAgICAgbmFtZT1cIkFsaSBBY2hyYWYgUmlhaGlcIlxuICAgICAgICAgIHRpdGxlPVwiRnJvbnQgRW5kIERldlwiXG4gICAgICAgICAgc2V0PXtwcm9wLnNldH1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgICB7dXNlciA9PSAzICYmIChcbiAgICAgICAgPEFib3V0VXNcbiAgICAgICAgICBzcmM9XCIvaW1nL3NlY3Rpb24zL2RleHRlci5wbmdcIlxuICAgICAgICAgIG5hbWU9XCJZb3VuZXMgSXNtYWlsaVwiXG4gICAgICAgICAgdGl0bGU9XCJCYWNrIEVuZCBEZXZcIlxuICAgICAgICAgIHNldD17cHJvcC5zZXR9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgICAgPGRpdj5cbiAgICAgICAgPHNwYW5cbiAgICAgICAgICBjbGFzc05hbWU9e2BjaXJjbGUgJHt1c2VyID09IDEgJiYgXCJ3aGl0ZVwifWB9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICBzZXRVc2VyKDEpO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICB9fVxuICAgICAgICA+PC9zcGFuPlxuICAgICAgICA8c3BhblxuICAgICAgICAgIGNsYXNzTmFtZT17YGNpcmNsZSAke3VzZXIgPT0gMiAmJiBcIndoaXRlXCJ9YH1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICBzZXRVc2VyKDIpO1xuICAgICAgICAgIH19XG4gICAgICAgID48L3NwYW4+XG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgY2xhc3NOYW1lPXtgY2lyY2xlICR7dXNlciA9PSAzICYmIFwid2hpdGVcIn1gfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgIHNldFVzZXIoMyk7XG4gICAgICAgICAgfX1cbiAgICAgICAgPjwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwiQWJvdXRVcyIsIlBob25lQWJvdXRVcyIsInByb3AiLCJ1c2VyIiwic2V0VXNlciIsInRpbWVyIiwiU3dpdGNoIiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsImRpdiIsImNsYXNzTmFtZSIsInNyYyIsIm5hbWUiLCJ0aXRsZSIsInNldCIsInNwYW4iLCJvbkNsaWNrIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.tsx\n"));

/***/ })

});