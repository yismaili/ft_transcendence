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

/***/ "(app-pages-browser)/./src/components/Sections/Section3/Section3.tsx":
/*!*******************************************************!*\
  !*** ./src/components/Sections/Section3/Section3.tsx ***!
  \*******************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Section3; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react-experimental/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react-experimental/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _AboutUs_AboutUs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AboutUs/AboutUs */ \"(app-pages-browser)/./src/components/Sections/Section3/AboutUs/AboutUs.tsx\");\n/* harmony import */ var _AboutUs_PopUp_PopUp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AboutUs/PopUp/PopUp */ \"(app-pages-browser)/./src/components/Sections/Section3/AboutUs/PopUp/PopUp.tsx\");\n/* harmony import */ var _Section3_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Section3.module.css */ \"(app-pages-browser)/./src/components/Sections/Section3/Section3.module.css\");\n/* harmony import */ var _Section3_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Section3_module_css__WEBPACK_IMPORTED_MODULE_4__);\n\nvar _s = $RefreshSig$();\n\n\n\n\nfunction Section3() {\n    _s();\n    //////////// handle smoth scroll //////////////////\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        var _document_getElementById;\n        const handleScroll = (e)=>{\n            const isDown = e.deltaY > 0;\n            if (isDown) {\n                if (window.scrollY > -1) {\n                    var _document_getElementById;\n                    (_document_getElementById = document.getElementById(\"link4\")) === null || _document_getElementById === void 0 ? void 0 : _document_getElementById.click();\n                }\n            } else {\n                var _document_getElementById1;\n                (_document_getElementById1 = document.getElementById(\"link2\")) === null || _document_getElementById1 === void 0 ? void 0 : _document_getElementById1.click();\n            }\n        };\n        (_document_getElementById = document.getElementById(\"section3\")) === null || _document_getElementById === void 0 ? void 0 : _document_getElementById.addEventListener(\"wheel\", handleScroll);\n        return ()=>{\n            var _document_getElementById;\n            return (_document_getElementById = document.getElementById(\"section3\")) === null || _document_getElementById === void 0 ? void 0 : _document_getElementById.removeEventListener(\"wheel\", handleScroll);\n        };\n    }, []);\n    ////////////////////////////////\n    ///////// handle Music /////////\n    const [isClick, setClick] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    function openPopUp(name) {\n        setClick(name);\n    }\n    function closePopUp() {\n        setClick(\"\");\n    }\n    ///////////////////////////////\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n        className: (_Section3_module_css__WEBPACK_IMPORTED_MODULE_4___default().container),\n        id: \"section3\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_AboutUs_AboutUs__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                src: \"/img/section3/amine_black.png\",\n                name: \"El Amine El Mountassir\",\n                title: \"Front End Dev\",\n                set: openPopUp\n            }, void 0, false, {\n                fileName: \"/app/src/components/Sections/Section3/Section3.tsx\",\n                lineNumber: 48,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_AboutUs_AboutUs__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                src: \"/img/section3/alouane04_black.png\",\n                name: \"Ali Achraf Riahi\",\n                title: \"Front End Dev\",\n                set: openPopUp\n            }, void 0, false, {\n                fileName: \"/app/src/components/Sections/Section3/Section3.tsx\",\n                lineNumber: 54,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_AboutUs_AboutUs__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                src: \"/img/section3/dexter.png\",\n                name: \"Younes Ismaili\",\n                title: \"Back End Dev\",\n                set: openPopUp\n            }, void 0, false, {\n                fileName: \"/app/src/components/Sections/Section3/Section3.tsx\",\n                lineNumber: 60,\n                columnNumber: 7\n            }, this),\n            isClick === \"El Amine El Mountassir\" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_AboutUs_PopUp_PopUp__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                src: \"/img/section3/amine_white.png\",\n                name: \"El Amine El Mountassir\",\n                title: \"Front End Dev\",\n                set: closePopUp,\n                about: \"I'm a passionate front-end developer with a strong IT foundation, dedicated to crafting impressive user experiences through creativity and technical expertise.\",\n                url: \"https://www.linkedin.com/in/eel-moun\",\n                music: \"img/section3/alouane04.mp3\"\n            }, void 0, false, {\n                fileName: \"/app/src/components/Sections/Section3/Section3.tsx\",\n                lineNumber: 67,\n                columnNumber: 9\n            }, this),\n            isClick === \"Ali Achraf Riahi\" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_AboutUs_PopUp_PopUp__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                src: \"/img/section3/alouane04_white.png\",\n                name: \"Ali Achraf Riahi\",\n                title: \"Front End Dev\",\n                set: closePopUp,\n                about: \"A passionate front-end dev, Currently a student at 1337, honing my skills in responsive design and exploring modern frameworks(React.js/Next.js).Staying updated\",\n                url: \"https://www.linkedin.com/in/alouane04\",\n                music: \"img/section3/alouane04.mp3\"\n            }, void 0, false, {\n                fileName: \"/app/src/components/Sections/Section3/Section3.tsx\",\n                lineNumber: 78,\n                columnNumber: 9\n            }, this),\n            isClick === \"Younes Ismaili\" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_AboutUs_PopUp_PopUp__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                src: \"/img/section3/dexter.png\",\n                name: \"Younes Ismaili\",\n                title: \"Back End Dev\",\n                set: closePopUp,\n                about: \"I'm a student at @1337FIL, and I'm really passionate about DevOps | Cybersecurity.\",\n                url: \"https://www.linkedin.com/in/yo-ismaili\",\n                music: \"img/section3/alouane04.mp3\"\n            }, void 0, false, {\n                fileName: \"/app/src/components/Sections/Section3/Section3.tsx\",\n                lineNumber: 89,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_Section3_module_css__WEBPACK_IMPORTED_MODULE_4___default().scrollElm)\n                    }, void 0, false, {\n                        fileName: \"/app/src/components/Sections/Section3/Section3.tsx\",\n                        lineNumber: 100,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_Section3_module_css__WEBPACK_IMPORTED_MODULE_4___default().scrollElm)\n                    }, void 0, false, {\n                        fileName: \"/app/src/components/Sections/Section3/Section3.tsx\",\n                        lineNumber: 101,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/app/src/components/Sections/Section3/Section3.tsx\",\n                lineNumber: 99,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/app/src/components/Sections/Section3/Section3.tsx\",\n        lineNumber: 47,\n        columnNumber: 5\n    }, this);\n}\n_s(Section3, \"qSA8mcF9nAsDn4Xwc0RrJWriMHU=\");\n_c = Section3;\nvar _c;\n$RefreshReg$(_c, \"Section3\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb25zL1NlY3Rpb24zL1NlY3Rpb24zLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQTRDO0FBQ0o7QUFDRTtBQUNBO0FBRTNCLFNBQVNLOztJQUN0QixtREFBbUQ7SUFDbkRMLGdEQUFTQSxDQUFDO1lBYVJNO1FBWkEsTUFBTUMsZUFBZSxDQUFDQztZQUNwQixNQUFNQyxTQUFTRCxFQUFFRSxNQUFNLEdBQUc7WUFFMUIsSUFBSUQsUUFBUTtnQkFDVixJQUFJRSxPQUFPQyxPQUFPLEdBQUcsQ0FBQyxHQUFHO3dCQUN2Qk47cUJBQUFBLDJCQUFBQSxTQUFTTyxjQUFjLENBQUMsc0JBQXhCUCwrQ0FBQUEseUJBQWtDUSxLQUFLO2dCQUN6QztZQUNGLE9BQU87b0JBQ0xSO2lCQUFBQSw0QkFBQUEsU0FBU08sY0FBYyxDQUFDLHNCQUF4QlAsZ0RBQUFBLDBCQUFrQ1EsS0FBSztZQUN6QztRQUNGO1NBRUFSLDJCQUFBQSxTQUNHTyxjQUFjLENBQUMseUJBRGxCUCwrQ0FBQUEseUJBRUlTLGdCQUFnQixDQUFDLFNBQVNSO1FBRTlCLE9BQU87Z0JBQ0xEO29CQUFBQSwyQkFBQUEsU0FDR08sY0FBYyxDQUFDLHlCQURsQlAsK0NBQUFBLHlCQUVJVSxtQkFBbUIsQ0FBQyxTQUFTVDs7SUFDckMsR0FBRyxFQUFFO0lBRUwsZ0NBQWdDO0lBRWhDLGdDQUFnQztJQUNoQyxNQUFNLENBQUNVLFNBQVNDLFNBQVMsR0FBR2pCLCtDQUFRQSxDQUFDO0lBRXJDLFNBQVNrQixVQUFVQyxJQUFZO1FBQzdCRixTQUFTRTtJQUNYO0lBRUEsU0FBU0M7UUFDUEgsU0FBUztJQUNYO0lBRUEsK0JBQStCO0lBRS9CLHFCQUNFLDhEQUFDSTtRQUFRQyxXQUFXbkIsdUVBQWU7UUFBRXFCLElBQUc7OzBCQUN0Qyw4REFBQ3ZCLHdEQUFPQTtnQkFDTndCLEtBQUk7Z0JBQ0pOLE1BQUs7Z0JBQ0xPLE9BQU07Z0JBQ05DLEtBQUtUOzs7Ozs7MEJBRVAsOERBQUNqQix3REFBT0E7Z0JBQ053QixLQUFJO2dCQUNKTixNQUFLO2dCQUNMTyxPQUFNO2dCQUNOQyxLQUFLVDs7Ozs7OzBCQUVQLDhEQUFDakIsd0RBQU9BO2dCQUNOd0IsS0FBSTtnQkFDSk4sTUFBSztnQkFDTE8sT0FBTTtnQkFDTkMsS0FBS1Q7Ozs7OztZQUVORixZQUFZLDBDQUNYLDhEQUFDZCw0REFBS0E7Z0JBQ0p1QixLQUFJO2dCQUNKTixNQUFLO2dCQUNMTyxPQUFNO2dCQUNOQyxLQUFLUDtnQkFDTFEsT0FBTTtnQkFDTkMsS0FBSTtnQkFDSkMsT0FBTzs7Ozs7O1lBR1ZkLFlBQVksb0NBQ1gsOERBQUNkLDREQUFLQTtnQkFDSnVCLEtBQUk7Z0JBQ0pOLE1BQUs7Z0JBQ0xPLE9BQU07Z0JBQ05DLEtBQUtQO2dCQUNMUSxPQUFNO2dCQUNOQyxLQUFJO2dCQUNKQyxPQUFPOzs7Ozs7WUFHVmQsWUFBWSxrQ0FDWCw4REFBQ2QsNERBQUtBO2dCQUNKdUIsS0FBSTtnQkFDSk4sTUFBSztnQkFDTE8sT0FBTTtnQkFDTkMsS0FBS1A7Z0JBQ0xRLE9BQU07Z0JBQ05DLEtBQUk7Z0JBQ0pDLE9BQU87Ozs7OzswQkFHWCw4REFBQ0M7O2tDQUNDLDhEQUFDQTt3QkFBSVQsV0FBV25CLHVFQUFlOzs7Ozs7a0NBQy9CLDhEQUFDNEI7d0JBQUlULFdBQVduQix1RUFBZTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSXZDO0dBbkd3QkM7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbnMvU2VjdGlvbjMvU2VjdGlvbjMudHN4Pzg0M2UiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEFib3V0VXMgZnJvbSBcIi4vQWJvdXRVcy9BYm91dFVzXCI7XG5pbXBvcnQgUG9wVXAgZnJvbSBcIi4vQWJvdXRVcy9Qb3BVcC9Qb3BVcFwiO1xuaW1wb3J0IFN0eWxlIGZyb20gXCIuL1NlY3Rpb24zLm1vZHVsZS5jc3NcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2VjdGlvbjMoKSB7XG4gIC8vLy8vLy8vLy8vLyBoYW5kbGUgc21vdGggc2Nyb2xsIC8vLy8vLy8vLy8vLy8vLy8vL1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZVNjcm9sbCA9IChlOiBXaGVlbEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBpc0Rvd24gPSBlLmRlbHRhWSA+IDA7XG5cbiAgICAgIGlmIChpc0Rvd24pIHtcbiAgICAgICAgaWYgKHdpbmRvdy5zY3JvbGxZID4gLTEpIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpbms0XCIpPy5jbGljaygpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpbmsyXCIpPy5jbGljaygpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBkb2N1bWVudFxuICAgICAgLmdldEVsZW1lbnRCeUlkKFwic2VjdGlvbjNcIilcbiAgICAgID8uYWRkRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsIGhhbmRsZVNjcm9sbCk7XG5cbiAgICByZXR1cm4gKCkgPT5cbiAgICAgIGRvY3VtZW50XG4gICAgICAgIC5nZXRFbGVtZW50QnlJZChcInNlY3Rpb24zXCIpXG4gICAgICAgID8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsIGhhbmRsZVNjcm9sbCk7XG4gIH0sIFtdKTtcblxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gIC8vLy8vLy8vLyBoYW5kbGUgTXVzaWMgLy8vLy8vLy8vXG4gIGNvbnN0IFtpc0NsaWNrLCBzZXRDbGlja10gPSB1c2VTdGF0ZShcIlwiKTtcblxuICBmdW5jdGlvbiBvcGVuUG9wVXAobmFtZTogc3RyaW5nKSB7XG4gICAgc2V0Q2xpY2sobmFtZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjbG9zZVBvcFVwKCkge1xuICAgIHNldENsaWNrKFwiXCIpO1xuICB9XG5cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPXtTdHlsZS5jb250YWluZXJ9IGlkPVwic2VjdGlvbjNcIj5cbiAgICAgIDxBYm91dFVzXG4gICAgICAgIHNyYz1cIi9pbWcvc2VjdGlvbjMvYW1pbmVfYmxhY2sucG5nXCJcbiAgICAgICAgbmFtZT1cIkVsIEFtaW5lIEVsIE1vdW50YXNzaXJcIlxuICAgICAgICB0aXRsZT1cIkZyb250IEVuZCBEZXZcIlxuICAgICAgICBzZXQ9e29wZW5Qb3BVcH1cbiAgICAgIC8+XG4gICAgICA8QWJvdXRVc1xuICAgICAgICBzcmM9XCIvaW1nL3NlY3Rpb24zL2Fsb3VhbmUwNF9ibGFjay5wbmdcIlxuICAgICAgICBuYW1lPVwiQWxpIEFjaHJhZiBSaWFoaVwiXG4gICAgICAgIHRpdGxlPVwiRnJvbnQgRW5kIERldlwiXG4gICAgICAgIHNldD17b3BlblBvcFVwfVxuICAgICAgLz5cbiAgICAgIDxBYm91dFVzXG4gICAgICAgIHNyYz1cIi9pbWcvc2VjdGlvbjMvZGV4dGVyLnBuZ1wiXG4gICAgICAgIG5hbWU9XCJZb3VuZXMgSXNtYWlsaVwiXG4gICAgICAgIHRpdGxlPVwiQmFjayBFbmQgRGV2XCJcbiAgICAgICAgc2V0PXtvcGVuUG9wVXB9XG4gICAgICAvPlxuICAgICAge2lzQ2xpY2sgPT09IFwiRWwgQW1pbmUgRWwgTW91bnRhc3NpclwiICYmIChcbiAgICAgICAgPFBvcFVwXG4gICAgICAgICAgc3JjPVwiL2ltZy9zZWN0aW9uMy9hbWluZV93aGl0ZS5wbmdcIlxuICAgICAgICAgIG5hbWU9XCJFbCBBbWluZSBFbCBNb3VudGFzc2lyXCJcbiAgICAgICAgICB0aXRsZT1cIkZyb250IEVuZCBEZXZcIlxuICAgICAgICAgIHNldD17Y2xvc2VQb3BVcH1cbiAgICAgICAgICBhYm91dD1cIkknbSBhIHBhc3Npb25hdGUgZnJvbnQtZW5kIGRldmVsb3BlciB3aXRoIGEgc3Ryb25nIElUIGZvdW5kYXRpb24sIGRlZGljYXRlZCB0byBjcmFmdGluZyBpbXByZXNzaXZlIHVzZXIgZXhwZXJpZW5jZXMgdGhyb3VnaCBjcmVhdGl2aXR5IGFuZCB0ZWNobmljYWwgZXhwZXJ0aXNlLlwiXG4gICAgICAgICAgdXJsPVwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2VlbC1tb3VuXCJcbiAgICAgICAgICBtdXNpYz17XCJpbWcvc2VjdGlvbjMvYWxvdWFuZTA0Lm1wM1wifVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICAgIHtpc0NsaWNrID09PSBcIkFsaSBBY2hyYWYgUmlhaGlcIiAmJiAoXG4gICAgICAgIDxQb3BVcFxuICAgICAgICAgIHNyYz1cIi9pbWcvc2VjdGlvbjMvYWxvdWFuZTA0X3doaXRlLnBuZ1wiXG4gICAgICAgICAgbmFtZT1cIkFsaSBBY2hyYWYgUmlhaGlcIlxuICAgICAgICAgIHRpdGxlPVwiRnJvbnQgRW5kIERldlwiXG4gICAgICAgICAgc2V0PXtjbG9zZVBvcFVwfVxuICAgICAgICAgIGFib3V0PVwiQSBwYXNzaW9uYXRlIGZyb250LWVuZCBkZXYsIEN1cnJlbnRseSBhIHN0dWRlbnQgYXQgMTMzNywgaG9uaW5nIG15IHNraWxscyBpbiByZXNwb25zaXZlIGRlc2lnbiBhbmQgZXhwbG9yaW5nIG1vZGVybiBmcmFtZXdvcmtzKFJlYWN0LmpzL05leHQuanMpLlN0YXlpbmcgdXBkYXRlZFwiXG4gICAgICAgICAgdXJsPVwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2Fsb3VhbmUwNFwiXG4gICAgICAgICAgbXVzaWM9e1wiaW1nL3NlY3Rpb24zL2Fsb3VhbmUwNC5tcDNcIn1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgICB7aXNDbGljayA9PT0gXCJZb3VuZXMgSXNtYWlsaVwiICYmIChcbiAgICAgICAgPFBvcFVwXG4gICAgICAgICAgc3JjPVwiL2ltZy9zZWN0aW9uMy9kZXh0ZXIucG5nXCJcbiAgICAgICAgICBuYW1lPVwiWW91bmVzIElzbWFpbGlcIlxuICAgICAgICAgIHRpdGxlPVwiQmFjayBFbmQgRGV2XCJcbiAgICAgICAgICBzZXQ9e2Nsb3NlUG9wVXB9XG4gICAgICAgICAgYWJvdXQ9XCJJJ20gYSBzdHVkZW50IGF0IEAxMzM3RklMLCBhbmQgSSdtIHJlYWxseSBwYXNzaW9uYXRlIGFib3V0IERldk9wcyB8IEN5YmVyc2VjdXJpdHkuXCJcbiAgICAgICAgICB1cmw9XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vaW4veW8taXNtYWlsaVwiXG4gICAgICAgICAgbXVzaWM9e1wiaW1nL3NlY3Rpb24zL2Fsb3VhbmUwNC5tcDNcIn1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17U3R5bGUuc2Nyb2xsRWxtfT48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e1N0eWxlLnNjcm9sbEVsbX0+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59XG4iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJBYm91dFVzIiwiUG9wVXAiLCJTdHlsZSIsIlNlY3Rpb24zIiwiZG9jdW1lbnQiLCJoYW5kbGVTY3JvbGwiLCJlIiwiaXNEb3duIiwiZGVsdGFZIiwid2luZG93Iiwic2Nyb2xsWSIsImdldEVsZW1lbnRCeUlkIiwiY2xpY2siLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImlzQ2xpY2siLCJzZXRDbGljayIsIm9wZW5Qb3BVcCIsIm5hbWUiLCJjbG9zZVBvcFVwIiwic2VjdGlvbiIsImNsYXNzTmFtZSIsImNvbnRhaW5lciIsImlkIiwic3JjIiwidGl0bGUiLCJzZXQiLCJhYm91dCIsInVybCIsIm11c2ljIiwiZGl2Iiwic2Nyb2xsRWxtIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/Sections/Section3/Section3.tsx\n"));

/***/ })

});