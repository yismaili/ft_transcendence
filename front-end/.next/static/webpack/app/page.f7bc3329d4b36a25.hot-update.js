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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ PhoneAboutUs; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react-experimental/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react-experimental/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _AboutUs_AboutUs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AboutUs/AboutUs */ \"(app-pages-browser)/./src/components/Sections/Section3/AboutUs/AboutUs.tsx\");\n/* harmony import */ var _PhoneAboutUs_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PhoneAboutUs.css */ \"(app-pages-browser)/./src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.css\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction PhoneAboutUs(prop) {\n    _s();\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);\n    let timer;\n    const Switch = ()=>{\n        setTimeout(()=>{\n            if (user == 1) setUser(2);\n            else if (user == 2) setUser(3);\n            else setUser(1);\n        }, 3500);\n    };\n    Switch();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"PhoneAboutUs\",\n        children: [\n            user == 1 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_AboutUs_AboutUs__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                src: \"/img/section3/amine_black.png\",\n                name: \"El Amine El Mountassir\",\n                title: \"Front End Dev\",\n                set: prop.set\n            }, void 0, false, {\n                fileName: \"/app/src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.tsx\",\n                lineNumber: 24,\n                columnNumber: 9\n            }, this),\n            user == 2 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_AboutUs_AboutUs__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                src: \"/img/section3/alouane04_black.png\",\n                name: \"Ali Achraf Riahi\",\n                title: \"Front End Dev\",\n                set: prop.set\n            }, void 0, false, {\n                fileName: \"/app/src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.tsx\",\n                lineNumber: 32,\n                columnNumber: 9\n            }, this),\n            user == 3 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_AboutUs_AboutUs__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                src: \"/img/section3/dexter.png\",\n                name: \"Younes Ismaili\",\n                title: \"Back End Dev\",\n                set: prop.set\n            }, void 0, false, {\n                fileName: \"/app/src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.tsx\",\n                lineNumber: 40,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        className: \"circle \".concat(user == 1 && \"white\"),\n                        onClick: ()=>{\n                            setUser(1);\n                        }\n                    }, void 0, false, {\n                        fileName: \"/app/src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.tsx\",\n                        lineNumber: 48,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        className: \"circle \".concat(user == 2 && \"white\"),\n                        onClick: ()=>{\n                            setUser(2);\n                        }\n                    }, void 0, false, {\n                        fileName: \"/app/src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.tsx\",\n                        lineNumber: 54,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        className: \"circle \".concat(user == 3 && \"white\"),\n                        onClick: ()=>{\n                            setUser(3);\n                        }\n                    }, void 0, false, {\n                        fileName: \"/app/src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.tsx\",\n                        lineNumber: 60,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/app/src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.tsx\",\n                lineNumber: 47,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/app/src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.tsx\",\n        lineNumber: 22,\n        columnNumber: 5\n    }, this);\n}\n_s(PhoneAboutUs, \"P/ljefyMhxLoekUiVgNYDlcLFu0=\");\n_c = PhoneAboutUs;\nvar _c;\n$RefreshReg$(_c, \"PhoneAboutUs\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb25zL1NlY3Rpb24zL1Bob25lQWJvdXRVcy9QaG9uZUFib3V0VXMudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQzRDO0FBQ0g7QUFDYjtBQU1iLFNBQVNFLGFBQWFDLElBQVc7O0lBQzVDLE1BQU0sQ0FBQ0MsTUFBTUMsUUFBUSxHQUFHTCwrQ0FBUUEsQ0FBQztJQUNqQyxJQUFJTTtJQUNOLE1BQU1DLFNBQVM7UUFDYkMsV0FBVztZQUNULElBQUlKLFFBQVEsR0FBR0MsUUFBUTtpQkFDbEIsSUFBSUQsUUFBUSxHQUFHQyxRQUFRO2lCQUN2QkEsUUFBUTtRQUNmLEdBQUc7SUFDTDtJQUNBRTtJQUNBLHFCQUNFLDhEQUFDRTtRQUFJQyxXQUFVOztZQUNaTixRQUFRLG1CQUNQLDhEQUFDSCx3REFBT0E7Z0JBQ05VLEtBQUk7Z0JBQ0pDLE1BQUs7Z0JBQ0xDLE9BQU07Z0JBQ05DLEtBQUtYLEtBQUtXLEdBQUc7Ozs7OztZQUdoQlYsUUFBUSxtQkFDUCw4REFBQ0gsd0RBQU9BO2dCQUNOVSxLQUFJO2dCQUNKQyxNQUFLO2dCQUNMQyxPQUFNO2dCQUNOQyxLQUFLWCxLQUFLVyxHQUFHOzs7Ozs7WUFHaEJWLFFBQVEsbUJBQ1AsOERBQUNILHdEQUFPQTtnQkFDTlUsS0FBSTtnQkFDSkMsTUFBSztnQkFDTEMsT0FBTTtnQkFDTkMsS0FBS1gsS0FBS1csR0FBRzs7Ozs7OzBCQUdqQiw4REFBQ0w7O2tDQUNDLDhEQUFDTTt3QkFDQ0wsV0FBVyxVQUErQixPQUFyQk4sUUFBUSxLQUFLO3dCQUNsQ1ksU0FBUzs0QkFDUFgsUUFBUTt3QkFDVjs7Ozs7O2tDQUVGLDhEQUFDVTt3QkFDQ0wsV0FBVyxVQUErQixPQUFyQk4sUUFBUSxLQUFLO3dCQUNsQ1ksU0FBUzs0QkFDUFgsUUFBUTt3QkFDVjs7Ozs7O2tDQUVGLDhEQUFDVTt3QkFDQ0wsV0FBVyxVQUErQixPQUFyQk4sUUFBUSxLQUFLO3dCQUNsQ1ksU0FBUzs0QkFDUFgsUUFBUTt3QkFDVjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS1Y7R0EzRHdCSDtLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9TZWN0aW9ucy9TZWN0aW9uMy9QaG9uZUFib3V0VXMvUGhvbmVBYm91dFVzLnRzeD84NGQ2Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEFib3V0VXMgZnJvbSBcIi4uL0Fib3V0VXMvQWJvdXRVc1wiO1xuaW1wb3J0IFwiLi9QaG9uZUFib3V0VXMuY3NzXCI7XG5cbnR5cGUgcHJvcHMgPSB7XG4gIHNldDogRnVuY3Rpb247XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQaG9uZUFib3V0VXMocHJvcDogcHJvcHMpIHtcbiAgICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZSgxKTtcbiAgICBsZXQgdGltZXI7XG4gIGNvbnN0IFN3aXRjaCA9ICgpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh1c2VyID09IDEpIHNldFVzZXIoMik7XG4gICAgICBlbHNlIGlmICh1c2VyID09IDIpIHNldFVzZXIoMyk7XG4gICAgICBlbHNlIHNldFVzZXIoMSk7XG4gICAgfSwgMzUwMCk7XG4gIH07XG4gIFN3aXRjaCgpO1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiUGhvbmVBYm91dFVzXCI+XG4gICAgICB7dXNlciA9PSAxICYmIChcbiAgICAgICAgPEFib3V0VXNcbiAgICAgICAgICBzcmM9XCIvaW1nL3NlY3Rpb24zL2FtaW5lX2JsYWNrLnBuZ1wiXG4gICAgICAgICAgbmFtZT1cIkVsIEFtaW5lIEVsIE1vdW50YXNzaXJcIlxuICAgICAgICAgIHRpdGxlPVwiRnJvbnQgRW5kIERldlwiXG4gICAgICAgICAgc2V0PXtwcm9wLnNldH1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgICB7dXNlciA9PSAyICYmIChcbiAgICAgICAgPEFib3V0VXNcbiAgICAgICAgICBzcmM9XCIvaW1nL3NlY3Rpb24zL2Fsb3VhbmUwNF9ibGFjay5wbmdcIlxuICAgICAgICAgIG5hbWU9XCJBbGkgQWNocmFmIFJpYWhpXCJcbiAgICAgICAgICB0aXRsZT1cIkZyb250IEVuZCBEZXZcIlxuICAgICAgICAgIHNldD17cHJvcC5zZXR9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgICAge3VzZXIgPT0gMyAmJiAoXG4gICAgICAgIDxBYm91dFVzXG4gICAgICAgICAgc3JjPVwiL2ltZy9zZWN0aW9uMy9kZXh0ZXIucG5nXCJcbiAgICAgICAgICBuYW1lPVwiWW91bmVzIElzbWFpbGlcIlxuICAgICAgICAgIHRpdGxlPVwiQmFjayBFbmQgRGV2XCJcbiAgICAgICAgICBzZXQ9e3Byb3Auc2V0fVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICAgIDxkaXY+XG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgY2xhc3NOYW1lPXtgY2lyY2xlICR7dXNlciA9PSAxICYmIFwid2hpdGVcIn1gfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgIHNldFVzZXIoMSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgPjwvc3Bhbj5cbiAgICAgICAgPHNwYW5cbiAgICAgICAgICBjbGFzc05hbWU9e2BjaXJjbGUgJHt1c2VyID09IDIgJiYgXCJ3aGl0ZVwifWB9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgc2V0VXNlcigyKTtcbiAgICAgICAgICB9fVxuICAgICAgICA+PC9zcGFuPlxuICAgICAgICA8c3BhblxuICAgICAgICAgIGNsYXNzTmFtZT17YGNpcmNsZSAke3VzZXIgPT0gMyAmJiBcIndoaXRlXCJ9YH1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICBzZXRVc2VyKDMpO1xuICAgICAgICAgIH19XG4gICAgICAgID48L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsIkFib3V0VXMiLCJQaG9uZUFib3V0VXMiLCJwcm9wIiwidXNlciIsInNldFVzZXIiLCJ0aW1lciIsIlN3aXRjaCIsInNldFRpbWVvdXQiLCJkaXYiLCJjbGFzc05hbWUiLCJzcmMiLCJuYW1lIiwidGl0bGUiLCJzZXQiLCJzcGFuIiwib25DbGljayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.tsx\n"));

/***/ })

});