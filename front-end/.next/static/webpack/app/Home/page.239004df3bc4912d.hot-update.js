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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _global_css_resets_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../global_css/resets.css */ \"(app-pages-browser)/./src/app/global_css/resets.css\");\n/* harmony import */ var _global_css_utilityClasses_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../global_css/utilityClasses.css */ \"(app-pages-browser)/./src/app/global_css/utilityClasses.css\");\n/* harmony import */ var _home_css_App_header_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./home-css/App-header.css */ \"(app-pages-browser)/./src/app/Home/home-css/App-header.css\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nconst Profile_side = (props)=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                    className: \"app__header__chat opac\",\n                    onClick: ()=>{\n                        props.side(false);\n                        props.state(false);\n                    },\n                    children: \"chat room\"\n                }, void 0, false, {\n                    fileName: \"/app/src/app/Home/App_header.tsx\",\n                    lineNumber: 15,\n                    columnNumber: 7\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                    className: \"app__header__profile\",\n                    children: \"profile\"\n                }, void 0, false, {\n                    fileName: \"/app/src/app/Home/App_header.tsx\",\n                    lineNumber: 19,\n                    columnNumber: 7\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"/app/src/app/Home/App_header.tsx\",\n            lineNumber: 14,\n            columnNumber: 5\n        }, undefined)\n    }, void 0, false);\n};\n_c = Profile_side;\nconst Chat_side = (props)=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                className: \"app__header__chat \",\n                children: \"chat room\"\n            }, void 0, false, {\n                fileName: \"/app/src/app/Home/App_header.tsx\",\n                lineNumber: 26,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                className: \"app__header__profile opac\",\n                onClick: ()=>{\n                    props.side(true);\n                    props.state(true);\n                },\n                children: \"profile\"\n            }, void 0, false, {\n                fileName: \"/app/src/app/Home/App_header.tsx\",\n                lineNumber: 27,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true);\n};\n_c1 = Chat_side;\nconst Navig = (props)=>{};\n_c2 = Navig;\nfunction AppHeader(props) {\n    _s();\n    const [side, setSide] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    if (side) {\n        nav = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Profile_side, {\n            state: props.state,\n            side: setSide\n        }, void 0, false, {\n            fileName: \"/app/src/app/Home/App_header.tsx\",\n            lineNumber: 42,\n            columnNumber: 12\n        }, this);\n    } else {\n        nav = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Chat_side, {\n            state: props.state,\n            side: setSide\n        }, void 0, false, {\n            fileName: \"/app/src/app/Home/App_header.tsx\",\n            lineNumber: 44,\n            columnNumber: 12\n        }, this);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"header\", {\n            className: \"app__header\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                        className: \"app__header__chat\",\n                        onClick: ()=>{\n                            setSide(false);\n                            props.state(false);\n                        },\n                        children: \"chat room\"\n                    }, void 0, false, {\n                        fileName: \"/app/src/app/Home/App_header.tsx\",\n                        lineNumber: 50,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                        className: \"app__header__profile\",\n                        onClick: props.state(true),\n                        children: \"profile\"\n                    }, void 0, false, {\n                        fileName: \"/app/src/app/Home/App_header.tsx\",\n                        lineNumber: 53,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/app/src/app/Home/App_header.tsx\",\n                lineNumber: 49,\n                columnNumber: 7\n            }, this)\n        }, void 0, false, {\n            fileName: \"/app/src/app/Home/App_header.tsx\",\n            lineNumber: 48,\n            columnNumber: 5\n        }, this)\n    }, void 0, false);\n}\n_s(AppHeader, \"x/BBRmMgr2oucn/tw/MoDRDu0DE=\");\n_c3 = AppHeader;\n/* harmony default export */ __webpack_exports__[\"default\"] = (AppHeader);\nvar _c, _c1, _c2, _c3;\n$RefreshReg$(_c, \"Profile_side\");\n$RefreshReg$(_c1, \"Chat_side\");\n$RefreshReg$(_c2, \"Navig\");\n$RefreshReg$(_c3, \"AppHeader\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvSG9tZS9BcHBfaGVhZGVyLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDd0M7QUFDTjtBQUNRO0FBQ1A7QUFPbkMsTUFBTUUsZUFBZSxDQUFDQztJQUNwQixxQkFBUTtrQkFDTiw0RUFBQ0M7OzhCQUNDLDhEQUFDQztvQkFBRUMsV0FBVTtvQkFBeUJDLFNBQVM7d0JBQzdDSixNQUFNSyxJQUFJLENBQUM7d0JBQ1hMLE1BQU1NLEtBQUssQ0FBQztvQkFBTzs4QkFDakI7Ozs7Ozs4QkFDSiw4REFBQ0o7b0JBQUVDLFdBQVU7OEJBQXdCOzs7Ozs7Ozs7Ozs7O0FBRzNDO0tBVk1KO0FBWU4sTUFBTVEsWUFBWSxDQUFDUDtJQUNqQixxQkFBUTs7MEJBQ0osOERBQUNFO2dCQUFFQyxXQUFVOzBCQUFxQjs7Ozs7OzBCQUNsQyw4REFBQ0Q7Z0JBQUVDLFdBQVU7Z0JBQTRCQyxTQUFTO29CQUNoREosTUFBTUssSUFBSSxDQUFDO29CQUNYTCxNQUFNTSxLQUFLLENBQUM7Z0JBQU07MEJBQ2hCOzs7Ozs7OztBQUVWO01BUk1DO0FBVU4sTUFBTUMsUUFBUSxDQUFDUixTQUVmO01BRk1RO0FBSU4sU0FBU0MsVUFBVVQsS0FBYzs7SUFDL0IsTUFBTSxDQUFDSyxNQUFNSyxRQUFRLEdBQUdaLCtDQUFRQSxDQUFDO0lBQ2pDLElBQUdPLE1BQ0g7UUFDRUosb0JBQU8sOERBQUNGO1lBQWFPLE9BQU9OLE1BQU1NLEtBQUs7WUFBRUQsTUFBTUs7Ozs7OztJQUNqRCxPQUFLO1FBQ0hULG9CQUFPLDhEQUFDTTtZQUFVRCxPQUFPTixNQUFNTSxLQUFLO1lBQUVELE1BQU1LOzs7Ozs7SUFDOUM7SUFFQSxxQkFBUTtrQkFDTiw0RUFBQ0M7WUFBT1IsV0FBVTtzQkFDaEIsNEVBQUNGOztrQ0FDQyw4REFBQ0M7d0JBQUVDLFdBQVU7d0JBQW9CQyxTQUFTOzRCQUN4Q00sUUFBUTs0QkFDUlYsTUFBTU0sS0FBSyxDQUFDO3dCQUFPO2tDQUFHOzs7Ozs7a0NBQ3RCLDhEQUFDSjt3QkFBRUMsV0FBVTt3QkFBdUJDLFNBQVNKLE1BQU1NLEtBQUssQ0FBQztrQ0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSTFFO0dBbkJTRztNQUFBQTtBQXFCVCwrREFBZUEsU0FBU0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL0hvbWUvQXBwX2hlYWRlci50c3g/Njc5YSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCdcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFwiLi4vZ2xvYmFsX2Nzcy9yZXNldHMuY3NzXCI7XG5pbXBvcnQgXCIuLi9nbG9iYWxfY3NzL3V0aWxpdHlDbGFzc2VzLmNzc1wiO1xuaW1wb3J0IFwiLi9ob21lLWNzcy9BcHAtaGVhZGVyLmNzc1wiO1xuXG5pbnRlcmZhY2UgaGVhZGVye1xuICBzdGF0ZTpGdW5jdGlvbjtcbiAgc2lkZTpGdW5jdGlvbjtcbn1cblxuY29uc3QgUHJvZmlsZV9zaWRlID0gKHByb3BzIDogaGVhZGVyKSA9PiB7XG4gIHJldHVybiAoPD5cbiAgICA8bmF2PlxuICAgICAgPGEgY2xhc3NOYW1lPVwiYXBwX19oZWFkZXJfX2NoYXQgb3BhY1wiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgcHJvcHMuc2lkZShmYWxzZSk7XG4gICAgICAgIHByb3BzLnN0YXRlKGZhbHNlKTt9XG4gICAgICAgIH0+Y2hhdCByb29tPC9hPlxuICAgICAgPGEgY2xhc3NOYW1lPVwiYXBwX19oZWFkZXJfX3Byb2ZpbGVcIiA+cHJvZmlsZTwvYT4gIFxuICAgIDwvbmF2PlxuICA8Lz4pO1xufVxuXG5jb25zdCBDaGF0X3NpZGUgPSAocHJvcHMgOiBoZWFkZXIpID0+IHtcbiAgcmV0dXJuICg8PlxuICAgICAgPGEgY2xhc3NOYW1lPVwiYXBwX19oZWFkZXJfX2NoYXQgXCI+Y2hhdCByb29tPC9hPlxuICAgICAgPGEgY2xhc3NOYW1lPVwiYXBwX19oZWFkZXJfX3Byb2ZpbGUgb3BhY1wiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgcHJvcHMuc2lkZSh0cnVlKTtcbiAgICAgICAgcHJvcHMuc3RhdGUodHJ1ZSk7fVxuICAgICAgICB9PnByb2ZpbGU8L2E+ICBcbiAgPC8+KTtcbn1cblxuY29uc3QgTmF2aWcgPSAocHJvcHMgOiBoZWFkZXIpID0+IHtcbiAgXG59XG5cbmZ1bmN0aW9uIEFwcEhlYWRlcihwcm9wcyA6IGhlYWRlcikge1xuICBjb25zdCBbc2lkZSwgc2V0U2lkZV0gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgaWYoc2lkZSlcbiAge1xuICAgIG5hdiA9ICA8UHJvZmlsZV9zaWRlIHN0YXRlPXtwcm9wcy5zdGF0ZX0gc2lkZT17c2V0U2lkZX0vPlxuICB9ZWxzZXtcbiAgICBuYXYgPSAgPENoYXRfc2lkZSBzdGF0ZT17cHJvcHMuc3RhdGV9IHNpZGU9e3NldFNpZGV9Lz5cbiAgfVxuXG4gIHJldHVybiAoPD5cbiAgICA8aGVhZGVyIGNsYXNzTmFtZT1cImFwcF9faGVhZGVyXCI+XG4gICAgICA8bmF2PlxuICAgICAgICA8YSBjbGFzc05hbWU9XCJhcHBfX2hlYWRlcl9fY2hhdFwiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICBzZXRTaWRlKGZhbHNlKTtcbiAgICAgICAgICBwcm9wcy5zdGF0ZShmYWxzZSk7fX0+Y2hhdCByb29tPC9hPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cImFwcF9faGVhZGVyX19wcm9maWxlXCIgb25DbGljaz17cHJvcHMuc3RhdGUodHJ1ZSl9PnByb2ZpbGU8L2E+ICBcbiAgICAgIDwvbmF2PlxuICAgIDwvaGVhZGVyPlxuICA8Lz4pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBIZWFkZXI7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsIlByb2ZpbGVfc2lkZSIsInByb3BzIiwibmF2IiwiYSIsImNsYXNzTmFtZSIsIm9uQ2xpY2siLCJzaWRlIiwic3RhdGUiLCJDaGF0X3NpZGUiLCJOYXZpZyIsIkFwcEhlYWRlciIsInNldFNpZGUiLCJoZWFkZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/Home/App_header.tsx\n"));

/***/ })

});