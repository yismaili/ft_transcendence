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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _css_files_components_auth_page_css_auth_page_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../css_files/components/auth-page-css/auth-page.css */ \"(app-pages-browser)/./src/app/css_files/components/auth-page-css/auth-page.css\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_3__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction AuthSection() {\n    _s();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    const redir_page = async (url)=>{\n        let auth_window = window.open(url, \"\", \"width=600,height=400,top=200,left=300\");\n        if (auth_window != null) {\n            auth_window.postMessage(\"\");\n            setInterval(()=>{\n                console.log(10);\n            }, 1000);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n            className: \"auth__card\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"auth__credentials\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        className: \"auth__msg\",\n                        children: \" begin your journey\"\n                    }, void 0, false, {\n                        fileName: \"/app/src/app/react_components/auth-page/auth_page.tsx\",\n                        lineNumber: 26,\n                        columnNumber: 21\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        type: \"submit\",\n                        className: \"auth__btn\",\n                        onClick: ()=>redir_page(\"http://localhost:3001/auth/google/callback\"),\n                        children: \" login with google\"\n                    }, void 0, false, {\n                        fileName: \"/app/src/app/react_components/auth-page/auth_page.tsx\",\n                        lineNumber: 27,\n                        columnNumber: 21\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"auth__btn\",\n                        onClick: ()=>redir_page(\"http://localhost:3001/auth/intra/callback\"),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"strong\", {\n                                children: \"42\"\n                            }, void 0, false, {\n                                fileName: \"/app/src/app/react_components/auth-page/auth_page.tsx\",\n                                lineNumber: 28,\n                                columnNumber: 123\n                            }, this),\n                            \" login with intra \"\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/app/src/app/react_components/auth-page/auth_page.tsx\",\n                        lineNumber: 28,\n                        columnNumber: 21\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/app/src/app/react_components/auth-page/auth_page.tsx\",\n                lineNumber: 25,\n                columnNumber: 13\n            }, this)\n        }, void 0, false, {\n            fileName: \"/app/src/app/react_components/auth-page/auth_page.tsx\",\n            lineNumber: 24,\n            columnNumber: 9\n        }, this)\n    }, void 0, false);\n}\n_s(AuthSection, \"fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter\n    ];\n});\n_c = AuthSection;\n/* harmony default export */ __webpack_exports__[\"default\"] = (AuthSection);\nvar _c;\n$RefreshReg$(_c, \"AuthSection\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcmVhY3RfY29tcG9uZW50cy9hdXRoLXBhZ2UvYXV0aF9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDMEI7QUFDcUM7QUFDbkI7QUFLNUMsU0FBU0U7O0lBQ0wsTUFBTUMsU0FBU0YsMERBQVNBO0lBRXhCLE1BQU1HLGFBQWEsT0FBT0M7UUFDdEIsSUFBSUMsY0FBY0MsT0FBT0MsSUFBSSxDQUFDSCxLQUFLLElBQUk7UUFDdkMsSUFBR0MsZUFBZSxNQUNsQjtZQUNJQSxZQUFZRyxXQUFXLENBQUM7WUFDeEJDLFlBQVk7Z0JBQ1pDLFFBQVFDLEdBQUcsQ0FBQztZQUNaLEdBQUc7UUFDUDtJQUNKO0lBRUEscUJBQVE7a0JBQ0osNEVBQUNDO1lBQUtDLFdBQVU7c0JBQ1osNEVBQUNDO2dCQUFJRCxXQUFVOztrQ0FDUCw4REFBQ0U7d0JBQUdGLFdBQVU7a0NBQVk7Ozs7OztrQ0FDMUIsOERBQUNHO3dCQUFPQyxNQUFLO3dCQUFTSixXQUFVO3dCQUFZSyxTQUFTLElBQU1mLFdBQVc7a0NBQStDOzs7Ozs7a0NBQ3JILDhEQUFDYTt3QkFBT0gsV0FBVTt3QkFBWUssU0FBUyxJQUFNZixXQUFXOzswQ0FBOEMsOERBQUNnQjswQ0FBTzs7Ozs7OzRCQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSTdJO0dBdkJTbEI7O1FBQ1VELHNEQUFTQTs7O0tBRG5CQztBQXdCVCwrREFBZUEsV0FBV0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL3JlYWN0X2NvbXBvbmVudHMvYXV0aC1wYWdlL2F1dGhfcGFnZS50c3g/YWM3OSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCdcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBcIi4uLy4uL2Nzc19maWxlcy9jb21wb25lbnRzL2F1dGgtcGFnZS1jc3MvYXV0aC1wYWdlLmNzc1wiXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9uYXZpZ2F0aW9uXCI7XG5cblxuXG5cbmZ1bmN0aW9uIEF1dGhTZWN0aW9uKCl7XG4gICAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbiAgICBjb25zdCByZWRpcl9wYWdlID0gYXN5bmMgKHVybDpzdHJpbmcpID0+IHtcbiAgICAgICAgbGV0IGF1dGhfd2luZG93ID0gd2luZG93Lm9wZW4odXJsLCBcIlwiLCBcIndpZHRoPTYwMCxoZWlnaHQ9NDAwLHRvcD0yMDAsbGVmdD0zMDBcIik7XG4gICAgICAgIGlmKGF1dGhfd2luZG93ICE9IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGF1dGhfd2luZG93LnBvc3RNZXNzYWdlKFwiXCIpXG4gICAgICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygxMCk7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoPD5cbiAgICAgICAgPG1haW4gY2xhc3NOYW1lPVwiYXV0aF9fY2FyZFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdXRoX19jcmVkZW50aWFsc1wiPlxuICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwiYXV0aF9fbXNnXCI+IGJlZ2luIHlvdXIgam91cm5leTwvaDE+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT1cImF1dGhfX2J0blwiIG9uQ2xpY2s9eygpID0+IHJlZGlyX3BhZ2UoXCJodHRwOi8vbG9jYWxob3N0OjMwMDEvYXV0aC9nb29nbGUvY2FsbGJhY2tcIil9PiBsb2dpbiB3aXRoIGdvb2dsZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImF1dGhfX2J0blwiIG9uQ2xpY2s9eygpID0+IHJlZGlyX3BhZ2UoXCJodHRwOi8vbG9jYWxob3N0OjMwMDEvYXV0aC9pbnRyYS9jYWxsYmFja1wiKX0+PHN0cm9uZz40Mjwvc3Ryb25nPiBsb2dpbiB3aXRoIGludHJhIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbWFpbj5cbiAgICA8Lz4pO1xufVxuZXhwb3J0IGRlZmF1bHQgQXV0aFNlY3Rpb247Il0sIm5hbWVzIjpbIlJlYWN0IiwidXNlUm91dGVyIiwiQXV0aFNlY3Rpb24iLCJyb3V0ZXIiLCJyZWRpcl9wYWdlIiwidXJsIiwiYXV0aF93aW5kb3ciLCJ3aW5kb3ciLCJvcGVuIiwicG9zdE1lc3NhZ2UiLCJzZXRJbnRlcnZhbCIsImNvbnNvbGUiLCJsb2ciLCJtYWluIiwiY2xhc3NOYW1lIiwiZGl2IiwiaDEiLCJidXR0b24iLCJ0eXBlIiwib25DbGljayIsInN0cm9uZyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/react_components/auth-page/auth_page.tsx\n"));

/***/ })

});