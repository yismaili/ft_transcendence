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

/***/ "(app-pages-browser)/./src/app/react_components/auth-page/auth_page.tsx":
/*!**********************************************************!*\
  !*** ./src/app/react_components/auth-page/auth_page.tsx ***!
  \**********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _css_files_components_auth_page_css_auth_page_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../css_files/components/auth-page-css/auth-page.css */ \"(app-pages-browser)/./src/app/css_files/components/auth-page-css/auth-page.css\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_3__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction AuthSection() {\n    _s();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    const redir_page = async (url)=>{\n        let auth_window = window.open(url, \"\", \"width=600,height=400,top=200,left=300\");\n        if (auth_window != null) {\n            setInterval(()=>{\n                console.log(10);\n            }, 1000);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n            className: \"auth__card\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"auth__credentials\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        className: \"auth__msg\",\n                        children: \" begin your journey\"\n                    }, void 0, false, {\n                        fileName: \"/app/src/app/react_components/auth-page/auth_page.tsx\",\n                        lineNumber: 26,\n                        columnNumber: 21\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        type: \"submit\",\n                        className: \"auth__btn\",\n                        onClick: ()=>redir_page(\"http://localhost:3001/auth/google/callback\"),\n                        children: \" login with google\"\n                    }, void 0, false, {\n                        fileName: \"/app/src/app/react_components/auth-page/auth_page.tsx\",\n                        lineNumber: 27,\n                        columnNumber: 21\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"auth__btn\",\n                        onClick: ()=>redir_page(\"http://localhost:3001/auth/intra/callback\"),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"strong\", {\n                                children: \"42\"\n                            }, void 0, false, {\n                                fileName: \"/app/src/app/react_components/auth-page/auth_page.tsx\",\n                                lineNumber: 28,\n                                columnNumber: 123\n                            }, this),\n                            \" login with intra \"\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/app/src/app/react_components/auth-page/auth_page.tsx\",\n                        lineNumber: 28,\n                        columnNumber: 21\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/app/src/app/react_components/auth-page/auth_page.tsx\",\n                lineNumber: 25,\n                columnNumber: 13\n            }, this)\n        }, void 0, false, {\n            fileName: \"/app/src/app/react_components/auth-page/auth_page.tsx\",\n            lineNumber: 24,\n            columnNumber: 9\n        }, this)\n    }, void 0, false);\n}\n_s(AuthSection, \"fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter\n    ];\n});\n_c = AuthSection;\n/* harmony default export */ __webpack_exports__[\"default\"] = (AuthSection);\nvar _c;\n$RefreshReg$(_c, \"AuthSection\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcmVhY3RfY29tcG9uZW50cy9hdXRoLXBhZ2UvYXV0aF9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDMEI7QUFDcUM7QUFDbkI7QUFLNUMsU0FBU0U7O0lBQ0wsTUFBTUMsU0FBU0YsMERBQVNBO0lBRXhCLE1BQU1HLGFBQWEsT0FBT0M7UUFDdEIsSUFBSUMsY0FBY0MsT0FBT0MsSUFBSSxDQUFDSCxLQUFLLElBQUk7UUFFdkMsSUFBR0MsZUFBZSxNQUNsQjtZQUNJRyxZQUFZO2dCQUNaQyxRQUFRQyxHQUFHLENBQUM7WUFDWixHQUFHO1FBQ1A7SUFDSjtJQUVBLHFCQUFRO2tCQUNKLDRFQUFDQztZQUFLQyxXQUFVO3NCQUNaLDRFQUFDQztnQkFBSUQsV0FBVTs7a0NBQ1AsOERBQUNFO3dCQUFHRixXQUFVO2tDQUFZOzs7Ozs7a0NBQzFCLDhEQUFDRzt3QkFBT0MsTUFBSzt3QkFBU0osV0FBVTt3QkFBWUssU0FBUyxJQUFNZCxXQUFXO2tDQUErQzs7Ozs7O2tDQUNySCw4REFBQ1k7d0JBQU9ILFdBQVU7d0JBQVlLLFNBQVMsSUFBTWQsV0FBVzs7MENBQThDLDhEQUFDZTswQ0FBTzs7Ozs7OzRCQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSTdJO0dBdkJTakI7O1FBQ1VELHNEQUFTQTs7O0tBRG5CQztBQXdCVCwrREFBZUEsV0FBV0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL3JlYWN0X2NvbXBvbmVudHMvYXV0aC1wYWdlL2F1dGhfcGFnZS50c3g/YWM3OSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCdcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBcIi4uLy4uL2Nzc19maWxlcy9jb21wb25lbnRzL2F1dGgtcGFnZS1jc3MvYXV0aC1wYWdlLmNzc1wiXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9uYXZpZ2F0aW9uXCI7XG5cblxuXG5cbmZ1bmN0aW9uIEF1dGhTZWN0aW9uKCl7XG4gICAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbiAgICBjb25zdCByZWRpcl9wYWdlID0gYXN5bmMgKHVybDpzdHJpbmcpID0+IHtcbiAgICAgICAgbGV0IGF1dGhfd2luZG93ID0gd2luZG93Lm9wZW4odXJsLCBcIlwiLCBcIndpZHRoPTYwMCxoZWlnaHQ9NDAwLHRvcD0yMDAsbGVmdD0zMDBcIik7XG5cbiAgICAgICAgaWYoYXV0aF93aW5kb3cgIT0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coMTApO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKDw+XG4gICAgICAgIDxtYWluIGNsYXNzTmFtZT1cImF1dGhfX2NhcmRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXV0aF9fY3JlZGVudGlhbHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cImF1dGhfX21zZ1wiPiBiZWdpbiB5b3VyIGpvdXJuZXk8L2gxPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJhdXRoX19idG5cIiBvbkNsaWNrPXsoKSA9PiByZWRpcl9wYWdlKFwiaHR0cDovL2xvY2FsaG9zdDozMDAxL2F1dGgvZ29vZ2xlL2NhbGxiYWNrXCIpfT4gbG9naW4gd2l0aCBnb29nbGU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJhdXRoX19idG5cIiBvbkNsaWNrPXsoKSA9PiByZWRpcl9wYWdlKFwiaHR0cDovL2xvY2FsaG9zdDozMDAxL2F1dGgvaW50cmEvY2FsbGJhY2tcIil9PjxzdHJvbmc+NDI8L3N0cm9uZz4gbG9naW4gd2l0aCBpbnRyYSA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L21haW4+XG4gICAgPC8+KTtcbn1cbmV4cG9ydCBkZWZhdWx0IEF1dGhTZWN0aW9uOyJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVJvdXRlciIsIkF1dGhTZWN0aW9uIiwicm91dGVyIiwicmVkaXJfcGFnZSIsInVybCIsImF1dGhfd2luZG93Iiwid2luZG93Iiwib3BlbiIsInNldEludGVydmFsIiwiY29uc29sZSIsImxvZyIsIm1haW4iLCJjbGFzc05hbWUiLCJkaXYiLCJoMSIsImJ1dHRvbiIsInR5cGUiLCJvbkNsaWNrIiwic3Ryb25nIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/react_components/auth-page/auth_page.tsx\n"));

/***/ })

});