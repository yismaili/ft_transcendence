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

/***/ "(app-pages-browser)/./src/components/nav/Nav.tsx":
/*!************************************!*\
  !*** ./src/components/nav/Nav.tsx ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Nav; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react-experimental/jsx-dev-runtime.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_scroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-scroll */ \"(app-pages-browser)/./node_modules/react-scroll/modules/index.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _Nav_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Nav.module.css */ \"(app-pages-browser)/./src/components/nav/Nav.module.css\");\n/* harmony import */ var _Nav_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Nav_module_css__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react-experimental/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction Nav() {\n    _s();\n    const [section, setSection] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(0);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_Nav_module_css__WEBPACK_IMPORTED_MODULE_5___default().container),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_scroll__WEBPACK_IMPORTED_MODULE_2__.Link, {\n                to: \"section1\",\n                style: {\n                    cursor: \"pointer\"\n                },\n                smooth: true,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_Nav_module_css__WEBPACK_IMPORTED_MODULE_5___default().imageRes),\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {\n                            quality: 100,\n                            className: (_Nav_module_css__WEBPACK_IMPORTED_MODULE_5___default().imageRes),\n                            width: 75,\n                            height: 75,\n                            src: \"/logo.png\",\n                            alt: \"logo for pong game\",\n                            priority: true\n                        }, void 0, false, {\n                            fileName: \"/app/src/components/nav/Nav.tsx\",\n                            lineNumber: 14,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                            className: (_Nav_module_css__WEBPACK_IMPORTED_MODULE_5___default().title),\n                            children: \"PONG\"\n                        }, void 0, false, {\n                            fileName: \"/app/src/components/nav/Nav.tsx\",\n                            lineNumber: 23,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/app/src/components/nav/Nav.tsx\",\n                    lineNumber: 13,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/app/src/components/nav/Nav.tsx\",\n                lineNumber: 12,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_Nav_module_css__WEBPACK_IMPORTED_MODULE_5___default().links),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_scroll__WEBPACK_IMPORTED_MODULE_2__.Link, {\n                        id: \"link1\",\n                        to: \"section1\",\n                        style: {\n                            cursor: \"pointer\"\n                        },\n                        smooth: true,\n                        children: \"home\"\n                    }, void 0, false, {\n                        fileName: \"/app/src/components/nav/Nav.tsx\",\n                        lineNumber: 27,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_scroll__WEBPACK_IMPORTED_MODULE_2__.Link, {\n                        id: \"link2\",\n                        to: \"section2\",\n                        style: {\n                            cursor: \"pointer\"\n                        },\n                        smooth: true,\n                        children: \"about us\"\n                    }, void 0, false, {\n                        fileName: \"/app/src/components/nav/Nav.tsx\",\n                        lineNumber: 35,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_scroll__WEBPACK_IMPORTED_MODULE_2__.Link, {\n                        id: \"link4\",\n                        to: \"section4\",\n                        style: {\n                            cursor: \"pointer\"\n                        },\n                        smooth: true,\n                        children: \"faq\"\n                    }, void 0, false, {\n                        fileName: \"/app/src/components/nav/Nav.tsx\",\n                        lineNumber: 43,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {\n                        href: \"/login\",\n                        style: {\n                            cursor: \"pointer\"\n                        },\n                        children: \"Sign up\"\n                    }, void 0, false, {\n                        fileName: \"/app/src/components/nav/Nav.tsx\",\n                        lineNumber: 51,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/app/src/components/nav/Nav.tsx\",\n                lineNumber: 26,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_Nav_module_css__WEBPACK_IMPORTED_MODULE_5___default().bar)\n            }, void 0, false, {\n                fileName: \"/app/src/components/nav/Nav.tsx\",\n                lineNumber: 55,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/app/src/components/nav/Nav.tsx\",\n        lineNumber: 11,\n        columnNumber: 5\n    }, this);\n}\n_s(Nav, \"gym+FJt+OM1nX8DREq/8gIHatgM=\");\n_c = Nav;\nvar _c;\n$RefreshReg$(_c, \"Nav\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL25hdi9OYXYudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDK0I7QUFDb0I7QUFDdEI7QUFDUTtBQUNKO0FBRWxCLFNBQVNLOztJQUN0QixNQUFNLENBQUNDLFNBQVNDLFdBQVcsR0FBR0gsK0NBQVFBLENBQUM7SUFDdkMscUJBQ0UsOERBQUNJO1FBQUlDLFdBQVdOLGtFQUFlOzswQkFDN0IsOERBQUNELDhDQUFXQTtnQkFBQ1MsSUFBRztnQkFBV0MsT0FBTztvQkFBRUMsUUFBUTtnQkFBVTtnQkFBR0MsUUFBUTswQkFDL0QsNEVBQUNOO29CQUFJQyxXQUFXTixpRUFBYzs7c0NBQzVCLDhEQUFDSCxtREFBS0E7NEJBQ0pnQixTQUFTOzRCQUNUUCxXQUFXTixpRUFBYzs0QkFDekJjLE9BQU87NEJBQ1BDLFFBQVE7NEJBQ1JDLEtBQUk7NEJBQ0pDLEtBQUk7NEJBQ0pDLFVBQVU7Ozs7OztzQ0FFWiw4REFBQ0M7NEJBQUdiLFdBQVdOLDhEQUFXO3NDQUFFOzs7Ozs7Ozs7Ozs7Ozs7OzswQkFHaEMsOERBQUNLO2dCQUFJQyxXQUFXTiw4REFBVzs7a0NBQ3pCLDhEQUFDRCw4Q0FBV0E7d0JBQ1Z1QixJQUFHO3dCQUNIZCxJQUFHO3dCQUNIQyxPQUFPOzRCQUFFQyxRQUFRO3dCQUFVO3dCQUMzQkMsUUFBUTtrQ0FDVDs7Ozs7O2tDQUdELDhEQUFDWiw4Q0FBV0E7d0JBQ1Z1QixJQUFHO3dCQUNIZCxJQUFHO3dCQUNIQyxPQUFPOzRCQUFFQyxRQUFRO3dCQUFVO3dCQUMzQkMsUUFBUTtrQ0FDVDs7Ozs7O2tDQUdELDhEQUFDWiw4Q0FBV0E7d0JBQ1Z1QixJQUFHO3dCQUNIZCxJQUFHO3dCQUNIQyxPQUFPOzRCQUFFQyxRQUFRO3dCQUFVO3dCQUMzQkMsUUFBUTtrQ0FDVDs7Ozs7O2tDQUdELDhEQUFDYixrREFBSUE7d0JBQUN5QixNQUFLO3dCQUFTZCxPQUFPOzRCQUFFQyxRQUFRO3dCQUFVO2tDQUFHOzs7Ozs7Ozs7Ozs7MEJBSXBELDhEQUFDTDtnQkFBSUMsV0FBV04sNERBQVM7Ozs7Ozs7Ozs7OztBQUcvQjtHQWxEd0JFO0tBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL25hdi9OYXYudHN4P2Q5NDUiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG5pbXBvcnQgSW1hZ2UgZnJvbSBcIm5leHQvaW1hZ2VcIjtcbmltcG9ydCB7IExpbmsgYXMgU2Nyb2xsX2xpbmsgfSBmcm9tIFwicmVhY3Qtc2Nyb2xsXCI7XG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5pbXBvcnQgU3R5bGUgZnJvbSBcIi4vTmF2Lm1vZHVsZS5jc3NcIjtcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE5hdigpIHtcbiAgY29uc3QgW3NlY3Rpb24sIHNldFNlY3Rpb25dID0gdXNlU3RhdGUoMClcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17U3R5bGUuY29udGFpbmVyfT5cbiAgICAgIDxTY3JvbGxfbGluayB0bz1cInNlY3Rpb24xXCIgc3R5bGU9e3sgY3Vyc29yOiBcInBvaW50ZXJcIiB9fSBzbW9vdGg9e3RydWV9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17U3R5bGUuaW1hZ2VSZXN9PlxuICAgICAgICAgIDxJbWFnZVxuICAgICAgICAgICAgcXVhbGl0eT17MTAwfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtTdHlsZS5pbWFnZVJlc31cbiAgICAgICAgICAgIHdpZHRoPXs3NX1cbiAgICAgICAgICAgIGhlaWdodD17NzV9XG4gICAgICAgICAgICBzcmM9XCIvbG9nby5wbmdcIlxuICAgICAgICAgICAgYWx0PVwibG9nbyBmb3IgcG9uZyBnYW1lXCJcbiAgICAgICAgICAgIHByaW9yaXR5PXt0cnVlfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT17U3R5bGUudGl0bGV9PlBPTkc8L2gxPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvU2Nyb2xsX2xpbms+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17U3R5bGUubGlua3N9PlxuICAgICAgICA8U2Nyb2xsX2xpbmtcbiAgICAgICAgICBpZD1cImxpbmsxXCJcbiAgICAgICAgICB0bz1cInNlY3Rpb24xXCJcbiAgICAgICAgICBzdHlsZT17eyBjdXJzb3I6IFwicG9pbnRlclwiIH19XG4gICAgICAgICAgc21vb3RoPXt0cnVlfVxuICAgICAgICA+XG4gICAgICAgICAgaG9tZVxuICAgICAgICA8L1Njcm9sbF9saW5rPlxuICAgICAgICA8U2Nyb2xsX2xpbmtcbiAgICAgICAgICBpZD1cImxpbmsyXCJcbiAgICAgICAgICB0bz1cInNlY3Rpb24yXCJcbiAgICAgICAgICBzdHlsZT17eyBjdXJzb3I6IFwicG9pbnRlclwiIH19XG4gICAgICAgICAgc21vb3RoPXt0cnVlfVxuICAgICAgICA+XG4gICAgICAgICAgYWJvdXQgdXNcbiAgICAgICAgPC9TY3JvbGxfbGluaz5cbiAgICAgICAgPFNjcm9sbF9saW5rXG4gICAgICAgICAgaWQ9XCJsaW5rNFwiXG4gICAgICAgICAgdG89XCJzZWN0aW9uNFwiXG4gICAgICAgICAgc3R5bGU9e3sgY3Vyc29yOiBcInBvaW50ZXJcIiB9fVxuICAgICAgICAgIHNtb290aD17dHJ1ZX1cbiAgICAgICAgPlxuICAgICAgICAgIGZhcVxuICAgICAgICA8L1Njcm9sbF9saW5rPlxuICAgICAgICA8TGluayBocmVmPVwiL2xvZ2luXCIgc3R5bGU9e3sgY3Vyc29yOiBcInBvaW50ZXJcIiB9fT5cbiAgICAgICAgICBTaWduIHVwXG4gICAgICAgIDwvTGluaz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlLmJhcn0+PC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwibmFtZXMiOlsiSW1hZ2UiLCJMaW5rIiwiU2Nyb2xsX2xpbmsiLCJTdHlsZSIsInVzZVN0YXRlIiwiTmF2Iiwic2VjdGlvbiIsInNldFNlY3Rpb24iLCJkaXYiLCJjbGFzc05hbWUiLCJjb250YWluZXIiLCJ0byIsInN0eWxlIiwiY3Vyc29yIiwic21vb3RoIiwiaW1hZ2VSZXMiLCJxdWFsaXR5Iiwid2lkdGgiLCJoZWlnaHQiLCJzcmMiLCJhbHQiLCJwcmlvcml0eSIsImgxIiwidGl0bGUiLCJsaW5rcyIsImlkIiwiaHJlZiIsImJhciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/nav/Nav.tsx\n"));

/***/ })

});