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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ PhoneAboutUs; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react-experimental/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react-experimental/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _AboutUs_AboutUs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AboutUs/AboutUs */ \"(app-pages-browser)/./src/components/Sections/Section3/AboutUs/AboutUs.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nfunction PhoneAboutUs(prop) {\n    _s();\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);\n    const Switch = ()=>{\n        //   setInterval(() => {\n        //   setUser(1);\n        //   setTimeout(() => {\n        //     setUser(2);\n        //   }, 3000);\n        //   setTimeout(() => {\n        //     setUser(3);\n        //   }, 6000);\n        // }, 9000);\n        if (user == 1) setTimeout(()=>{\n            setUser(2);\n        }, 3000);\n        e;\n    };\n    Switch();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            user == 1 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_AboutUs_AboutUs__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                src: \"/img/section3/amine_black.png\",\n                name: \"El Amine El Mountassir\",\n                title: \"Front End Dev\",\n                set: prop.set\n            }, void 0, false, {\n                fileName: \"/app/src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.tsx\",\n                lineNumber: 32,\n                columnNumber: 9\n            }, this),\n            user == 2 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_AboutUs_AboutUs__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                src: \"/img/section3/alouane04_black.png\",\n                name: \"Ali Achraf Riahi\",\n                title: \"Front End Dev\",\n                set: prop.set\n            }, void 0, false, {\n                fileName: \"/app/src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.tsx\",\n                lineNumber: 40,\n                columnNumber: 9\n            }, this),\n            user == 3 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_AboutUs_AboutUs__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                src: \"/img/section3/dexter.png\",\n                name: \"Younes Ismaili\",\n                title: \"Back End Dev\",\n                set: prop.set\n            }, void 0, false, {\n                fileName: \"/app/src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.tsx\",\n                lineNumber: 48,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true);\n}\n_s(PhoneAboutUs, \"P/ljefyMhxLoekUiVgNYDlcLFu0=\");\n_c = PhoneAboutUs;\nvar _c;\n$RefreshReg$(_c, \"PhoneAboutUs\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb25zL1NlY3Rpb24zL1Bob25lQWJvdXRVcy9QaG9uZUFib3V0VXMudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDNEM7QUFDSDtBQU0xQixTQUFTRSxhQUFhQyxJQUFXOztJQUM5QyxNQUFNLENBQUNDLE1BQU1DLFFBQVEsR0FBR0wsK0NBQVFBLENBQUM7SUFDakMsTUFBTU0sU0FBUztRQUNiLHdCQUF3QjtRQUV4QixnQkFBZ0I7UUFDaEIsdUJBQXVCO1FBQ3ZCLGtCQUFrQjtRQUNsQixjQUFjO1FBQ2QsdUJBQXVCO1FBQ3ZCLGtCQUFrQjtRQUNsQixjQUFjO1FBQ1osWUFBWTtRQUNaLElBQUlGLFFBQVEsR0FDWkcsV0FBVztZQUNMRixRQUFRO1FBQ2QsR0FBRztRQUNIRztJQUNKO0lBQ0VGO0lBQ0YscUJBQ0U7O1lBQ0dGLFFBQVEsbUJBQ1AsOERBQUNILHdEQUFPQTtnQkFDTlEsS0FBSTtnQkFDSkMsTUFBSztnQkFDTEMsT0FBTTtnQkFDTkMsS0FBS1QsS0FBS1MsR0FBRzs7Ozs7O1lBR2hCUixRQUFRLG1CQUNQLDhEQUFDSCx3REFBT0E7Z0JBQ05RLEtBQUk7Z0JBQ0pDLE1BQUs7Z0JBQ0xDLE9BQU07Z0JBQ05DLEtBQUtULEtBQUtTLEdBQUc7Ozs7OztZQUdoQlIsUUFBUSxtQkFDUCw4REFBQ0gsd0RBQU9BO2dCQUNOUSxLQUFJO2dCQUNKQyxNQUFLO2dCQUNMQyxPQUFNO2dCQUNOQyxLQUFLVCxLQUFLUyxHQUFHOzs7Ozs7OztBQUt2QjtHQWhEd0JWO0tBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb25zL1NlY3Rpb24zL1Bob25lQWJvdXRVcy9QaG9uZUFib3V0VXMudHN4Pzg0ZDYiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQWJvdXRVcyBmcm9tIFwiLi4vQWJvdXRVcy9BYm91dFVzXCI7XG5cbnR5cGUgcHJvcHMgPSB7XG4gIHNldDogRnVuY3Rpb247XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQaG9uZUFib3V0VXMocHJvcDogcHJvcHMpIHtcbiAgY29uc3QgW3VzZXIsIHNldFVzZXJdID0gdXNlU3RhdGUoMSk7XG4gIGNvbnN0IFN3aXRjaCA9ICgpID0+IHtcbiAgICAvLyAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgXG4gICAgLy8gICBzZXRVc2VyKDEpO1xuICAgIC8vICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgLy8gICAgIHNldFVzZXIoMik7XG4gICAgLy8gICB9LCAzMDAwKTtcbiAgICAvLyAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIC8vICAgICBzZXRVc2VyKDMpO1xuICAgIC8vICAgfSwgNjAwMCk7XG4gICAgICAvLyB9LCA5MDAwKTtcbiAgICAgIGlmICh1c2VyID09IDEpXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHNldFVzZXIoMik7XG4gICAgICB9LCAzMDAwKTtcbiAgICAgIGVcbiAgfTtcbiAgICBTd2l0Y2goKTtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge3VzZXIgPT0gMSAmJiAoXG4gICAgICAgIDxBYm91dFVzXG4gICAgICAgICAgc3JjPVwiL2ltZy9zZWN0aW9uMy9hbWluZV9ibGFjay5wbmdcIlxuICAgICAgICAgIG5hbWU9XCJFbCBBbWluZSBFbCBNb3VudGFzc2lyXCJcbiAgICAgICAgICB0aXRsZT1cIkZyb250IEVuZCBEZXZcIlxuICAgICAgICAgIHNldD17cHJvcC5zZXR9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgICAge3VzZXIgPT0gMiAmJiAoXG4gICAgICAgIDxBYm91dFVzXG4gICAgICAgICAgc3JjPVwiL2ltZy9zZWN0aW9uMy9hbG91YW5lMDRfYmxhY2sucG5nXCJcbiAgICAgICAgICBuYW1lPVwiQWxpIEFjaHJhZiBSaWFoaVwiXG4gICAgICAgICAgdGl0bGU9XCJGcm9udCBFbmQgRGV2XCJcbiAgICAgICAgICBzZXQ9e3Byb3Auc2V0fVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICAgIHt1c2VyID09IDMgJiYgKFxuICAgICAgICA8QWJvdXRVc1xuICAgICAgICAgIHNyYz1cIi9pbWcvc2VjdGlvbjMvZGV4dGVyLnBuZ1wiXG4gICAgICAgICAgbmFtZT1cIllvdW5lcyBJc21haWxpXCJcbiAgICAgICAgICB0aXRsZT1cIkJhY2sgRW5kIERldlwiXG4gICAgICAgICAgc2V0PXtwcm9wLnNldH1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC8+XG4gICk7XG59XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJBYm91dFVzIiwiUGhvbmVBYm91dFVzIiwicHJvcCIsInVzZXIiLCJzZXRVc2VyIiwiU3dpdGNoIiwic2V0VGltZW91dCIsImUiLCJzcmMiLCJuYW1lIiwidGl0bGUiLCJzZXQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/Sections/Section3/PhoneAboutUs/PhoneAboutUs.tsx\n"));

/***/ })

});