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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _global_css_resets_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../global_css/resets.css */ \"(app-pages-browser)/./src/app/global_css/resets.css\");\n/* harmony import */ var _global_css_utilityClasses_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../global_css/utilityClasses.css */ \"(app-pages-browser)/./src/app/global_css/utilityClasses.css\");\n/* harmony import */ var _home_css_App_header_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./home-css/App-header.css */ \"(app-pages-browser)/./src/app/Home/home-css/App-header.css\");\n\n\n\n\n\nfunction AppHeader(props) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"header\", {\n            className: \"app__header\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                        className: \"app__header__chat\",\n                        onClick: props.stat(),\n                        children: \"chat room\"\n                    }, void 0, false, {\n                        fileName: \"/app/src/app/Home/App_header.tsx\",\n                        lineNumber: 14,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                        className: \"app__header__profile\",\n                        children: \"profile\"\n                    }, void 0, false, {\n                        fileName: \"/app/src/app/Home/App_header.tsx\",\n                        lineNumber: 15,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/app/src/app/Home/App_header.tsx\",\n                lineNumber: 13,\n                columnNumber: 7\n            }, this)\n        }, void 0, false, {\n            fileName: \"/app/src/app/Home/App_header.tsx\",\n            lineNumber: 12,\n            columnNumber: 5\n        }, this)\n    }, void 0, false);\n}\n_c = AppHeader;\n/* harmony default export */ __webpack_exports__[\"default\"] = (AppHeader);\nvar _c;\n$RefreshReg$(_c, \"AppHeader\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvSG9tZS9BcHBfaGVhZGVyLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUEwQjtBQUNRO0FBQ1E7QUFDUDtBQU1uQyxTQUFTQyxVQUFVQyxLQUFjO0lBQy9CLHFCQUFRO2tCQUNOLDRFQUFDQztZQUFPQyxXQUFVO3NCQUNoQiw0RUFBQ0M7O2tDQUNDLDhEQUFDQzt3QkFBRUYsV0FBVTt3QkFBb0JHLFNBQVNMLE1BQU1NLElBQUk7a0NBQUk7Ozs7OztrQ0FDeEQsOERBQUNGO3dCQUFFRixXQUFVO2tDQUF1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSTVDO0tBVFNIO0FBV1QsK0RBQWVBLFNBQVNBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9Ib21lL0FwcF9oZWFkZXIudHN4PzY3OWEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFwiLi4vZ2xvYmFsX2Nzcy9yZXNldHMuY3NzXCI7XG5pbXBvcnQgXCIuLi9nbG9iYWxfY3NzL3V0aWxpdHlDbGFzc2VzLmNzc1wiO1xuaW1wb3J0IFwiLi9ob21lLWNzcy9BcHAtaGVhZGVyLmNzc1wiO1xuXG5pbnRlcmZhY2UgaGVhZGVye1xuICBzdGF0ZTpGdW5jdGlvbjtcbn1cblxuZnVuY3Rpb24gQXBwSGVhZGVyKHByb3BzIDogaGVhZGVyKSB7XG4gIHJldHVybiAoPD5cbiAgICA8aGVhZGVyIGNsYXNzTmFtZT1cImFwcF9faGVhZGVyXCI+XG4gICAgICA8bmF2PlxuICAgICAgICA8YSBjbGFzc05hbWU9XCJhcHBfX2hlYWRlcl9fY2hhdFwiIG9uQ2xpY2s9e3Byb3BzLnN0YXQoKX0+Y2hhdCByb29tPC9hPlxuICAgICAgICA8YSBjbGFzc05hbWU9XCJhcHBfX2hlYWRlcl9fcHJvZmlsZVwiPnByb2ZpbGU8L2E+XG4gICAgICA8L25hdj5cbiAgICA8L2hlYWRlcj5cbiAgPC8+KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwSGVhZGVyO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwiQXBwSGVhZGVyIiwicHJvcHMiLCJoZWFkZXIiLCJjbGFzc05hbWUiLCJuYXYiLCJhIiwib25DbGljayIsInN0YXQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/Home/App_header.tsx\n"));

/***/ })

});