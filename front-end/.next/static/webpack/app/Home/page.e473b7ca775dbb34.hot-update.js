"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/Home/page",{

/***/ "(app-pages-browser)/./src/app/Home/App_header.tsx":
/*!*************************************!*\
  !*** ./src/app/Home/App_header.tsx ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _global_css_resets_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../global_css/resets.css */ \"(app-pages-browser)/./src/app/global_css/resets.css\");\n/* harmony import */ var _global_css_utilityClasses_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../global_css/utilityClasses.css */ \"(app-pages-browser)/./src/app/global_css/utilityClasses.css\");\n/* harmony import */ var _home_css_App_header_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./home-css/App-header.css */ \"(app-pages-browser)/./src/app/Home/home-css/App-header.css\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nconst Profile_side = (props)=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                className: \"app__header__chat opac\",\n                onClick: ()=>{\n                    props.nav_side(false);\n                    props.state(false);\n                },\n                children: \"chat room\"\n            }, void 0, false, {\n                fileName: \"/app/src/app/Home/App_header.tsx\",\n                lineNumber: 14,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                className: \"app__header__profile\",\n                children: \"profile\"\n            }, void 0, false, {\n                fileName: \"/app/src/app/Home/App_header.tsx\",\n                lineNumber: 18,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true);\n};\n_c = Profile_side;\nconst Chat_side = (props)=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                className: \"app__header__chat \",\n                children: \"chat room\"\n            }, void 0, false, {\n                fileName: \"/app/src/app/Home/App_header.tsx\",\n                lineNumber: 24,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                className: \"app__header__profile opac\",\n                onClick: ()=>{\n                    props.nav_side(true);\n                    props.state(true);\n                },\n                children: \"profile\"\n            }, void 0, false, {\n                fileName: \"/app/src/app/Home/App_header.tsx\",\n                lineNumber: 25,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true);\n};\n_c1 = Chat_side;\nconst Navig = (props)=>{};\n_c2 = Navig;\nfunction AppHeader(props) {\n    _s();\n    const [side, setSide] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"header\", {\n            className: \"app__header\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                children: [\n                    side && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Profile_side, {\n                        state: props.state,\n                        side: setSide\n                    }, void 0, false, {\n                        fileName: \"/app/src/app/Home/App_header.tsx\",\n                        lineNumber: 42,\n                        columnNumber: 18\n                    }, this),\n                    !side && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Chat_side, {\n                        state: props.state,\n                        side: setSide\n                    }, void 0, false, {\n                        fileName: \"/app/src/app/Home/App_header.tsx\",\n                        lineNumber: 43,\n                        columnNumber: 19\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/app/src/app/Home/App_header.tsx\",\n                lineNumber: 41,\n                columnNumber: 7\n            }, this)\n        }, void 0, false, {\n            fileName: \"/app/src/app/Home/App_header.tsx\",\n            lineNumber: 40,\n            columnNumber: 5\n        }, this)\n    }, void 0, false);\n}\n_s(AppHeader, \"x/BBRmMgr2oucn/tw/MoDRDu0DE=\");\n_c3 = AppHeader;\n/* harmony default export */ __webpack_exports__[\"default\"] = (AppHeader);\nvar _c, _c1, _c2, _c3;\n$RefreshReg$(_c, \"Profile_side\");\n$RefreshReg$(_c1, \"Chat_side\");\n$RefreshReg$(_c2, \"Navig\");\n$RefreshReg$(_c3, \"AppHeader\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvSG9tZS9BcHBfaGVhZGVyLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDd0M7QUFDTjtBQUNRO0FBQ1A7QUFPbkMsTUFBTUUsZUFBZSxDQUFDQztJQUNwQixxQkFBUTs7MEJBQ0osOERBQUNDO2dCQUFFQyxXQUFVO2dCQUF5QkMsU0FBUztvQkFDN0NILE1BQU1JLFFBQVEsQ0FBQztvQkFDZkosTUFBTUssS0FBSyxDQUFDO2dCQUFPOzBCQUNqQjs7Ozs7OzBCQUNKLDhEQUFDSjtnQkFBRUMsV0FBVTswQkFBd0I7Ozs7Ozs7O0FBRTNDO0tBUk1IO0FBVU4sTUFBTU8sWUFBWSxDQUFDTjtJQUNqQixxQkFBUTs7MEJBQ0osOERBQUNDO2dCQUFFQyxXQUFVOzBCQUFxQjs7Ozs7OzBCQUNsQyw4REFBQ0Q7Z0JBQUVDLFdBQVU7Z0JBQTRCQyxTQUFTO29CQUNoREgsTUFBTUksUUFBUSxDQUFDO29CQUNmSixNQUFNSyxLQUFLLENBQUM7Z0JBQU07MEJBQ2hCOzs7Ozs7OztBQUVWO01BUk1DO0FBVU4sTUFBTUMsUUFBUSxDQUFDUCxTQUVmO01BRk1PO0FBSU4sU0FBU0MsVUFBVVIsS0FBYzs7SUFDL0IsTUFBTSxDQUFDUyxNQUFNQyxRQUFRLEdBQUdaLCtDQUFRQSxDQUFDO0lBRWpDLHFCQUFRO2tCQUNOLDRFQUFDYTtZQUFPVCxXQUFVO3NCQUNoQiw0RUFBQ1U7O29CQUNFSCxzQkFBUSw4REFBQ1Y7d0JBQWFNLE9BQU9MLE1BQU1LLEtBQUs7d0JBQUVJLE1BQU1DOzs7Ozs7b0JBQ2hELENBQUNELHNCQUFRLDhEQUFDSDt3QkFBVUQsT0FBT0wsTUFBTUssS0FBSzt3QkFBRUksTUFBTUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUl2RDtHQVhTRjtNQUFBQTtBQWFULCtEQUFlQSxTQUFTQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvSG9tZS9BcHBfaGVhZGVyLnRzeD82NzlhIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50J1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgXCIuLi9nbG9iYWxfY3NzL3Jlc2V0cy5jc3NcIjtcbmltcG9ydCBcIi4uL2dsb2JhbF9jc3MvdXRpbGl0eUNsYXNzZXMuY3NzXCI7XG5pbXBvcnQgXCIuL2hvbWUtY3NzL0FwcC1oZWFkZXIuY3NzXCI7XG5cbmludGVyZmFjZSBoZWFkZXJ7XG4gIHN0YXRlOkZ1bmN0aW9uO1xuICBuYXZfc2lkZTpGdW5jdGlvbjtcbn1cblxuY29uc3QgUHJvZmlsZV9zaWRlID0gKHByb3BzIDogaGVhZGVyKSA9PiB7XG4gIHJldHVybiAoPD5cbiAgICAgIDxhIGNsYXNzTmFtZT1cImFwcF9faGVhZGVyX19jaGF0IG9wYWNcIiBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgIHByb3BzLm5hdl9zaWRlKGZhbHNlKTtcbiAgICAgICAgcHJvcHMuc3RhdGUoZmFsc2UpO31cbiAgICAgICAgfT5jaGF0IHJvb208L2E+XG4gICAgICA8YSBjbGFzc05hbWU9XCJhcHBfX2hlYWRlcl9fcHJvZmlsZVwiID5wcm9maWxlPC9hPiAgXG4gIDwvPik7XG59XG5cbmNvbnN0IENoYXRfc2lkZSA9IChwcm9wcyA6IGhlYWRlcikgPT4ge1xuICByZXR1cm4gKDw+XG4gICAgICA8YSBjbGFzc05hbWU9XCJhcHBfX2hlYWRlcl9fY2hhdCBcIj5jaGF0IHJvb208L2E+XG4gICAgICA8YSBjbGFzc05hbWU9XCJhcHBfX2hlYWRlcl9fcHJvZmlsZSBvcGFjXCIgb25DbGljaz17KCkgPT4ge1xuICAgICAgICBwcm9wcy5uYXZfc2lkZSh0cnVlKTtcbiAgICAgICAgcHJvcHMuc3RhdGUodHJ1ZSk7fVxuICAgICAgICB9PnByb2ZpbGU8L2E+ICBcbiAgPC8+KTtcbn1cblxuY29uc3QgTmF2aWcgPSAocHJvcHMgOiBoZWFkZXIpID0+IHtcbiAgXG59XG5cbmZ1bmN0aW9uIEFwcEhlYWRlcihwcm9wcyA6IGhlYWRlcikge1xuICBjb25zdCBbc2lkZSwgc2V0U2lkZV0gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICByZXR1cm4gKDw+XG4gICAgPGhlYWRlciBjbGFzc05hbWU9XCJhcHBfX2hlYWRlclwiPlxuICAgICAgPG5hdj5cbiAgICAgICAge3NpZGUgJiYgPFByb2ZpbGVfc2lkZSBzdGF0ZT17cHJvcHMuc3RhdGV9IHNpZGU9e3NldFNpZGV9IC8+fVxuICAgICAgICB7IXNpZGUgJiYgPENoYXRfc2lkZSBzdGF0ZT17cHJvcHMuc3RhdGV9IHNpZGU9e3NldFNpZGV9IC8+fVxuICAgICAgPC9uYXY+XG4gICAgPC9oZWFkZXI+XG4gIDwvPik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcEhlYWRlcjtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwiUHJvZmlsZV9zaWRlIiwicHJvcHMiLCJhIiwiY2xhc3NOYW1lIiwib25DbGljayIsIm5hdl9zaWRlIiwic3RhdGUiLCJDaGF0X3NpZGUiLCJOYXZpZyIsIkFwcEhlYWRlciIsInNpZGUiLCJzZXRTaWRlIiwiaGVhZGVyIiwibmF2Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/Home/App_header.tsx\n"));

/***/ })

});