/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("window.addEventListener('DOMContentLoaded', (e) => {\r\n    App.init()\r\n})\r\n\r\nvar App = (function () {\r\n    let isInitialized = false\r\n    let config = null\r\n    let root = null\r\n    let main = null\r\n    let activeMobileWindow = null;\r\n    let userStepTemplate = null\r\n\r\n    let init = function () {\r\n        if (isInitialized) {\r\n            return\r\n        }\r\n\r\n        userStepTemplate = document.getElementById('user-step')\r\n            .content.firstElementChild;\r\n\r\n        buildTree()\r\n\r\n        bindUiActions()\r\n\r\n        console.log('initialized')\r\n        isInitialized = true\r\n    };\r\n\r\n\r\n    function buildTree() {\r\n        main = document.getElementById('main')\r\n\r\n        const children = document.createElement('div')\r\n        children.className = 'children'\r\n        main.appendChild(children)\r\n\r\n        root = createNode()\r\n\r\n        children.appendChild(root)\r\n    }\r\n\r\n    function on(name, selector, callback) {\r\n        main.addEventListener(name, (e) => {\r\n            const element = e.target\r\n            if (element.matches(selector)) {\r\n                return callback(e, element)\r\n            }\r\n\r\n            const ancestorElement = element.closest(selector)\r\n            if(ancestorElement !== null) {\r\n                return callback(e, ancestorElement)\r\n            }\r\n        })\r\n    }\r\n\r\n    function bindUiActions() {\r\n        on('click', '.mobile-button.add-action', (event, target) => {            \r\n            const thisNode = target.closest('.node')\r\n            createChildNodeTo(thisNode)\r\n        })     \r\n        \r\n        on('click', '.mobile-window', (event, target) => {\r\n            if (activeMobileWindow) {\r\n                activeMobileWindow.classList.remove('active')\r\n            }\r\n            \r\n            target.classList.add('active')\r\n            activeMobileWindow = target\r\n        })\r\n    }\r\n\r\n    function createNode() {\r\n        return userStepTemplate.cloneNode(true)\r\n    }    \r\n\r\n    function createChildNodeTo(thisNode) {\r\n        const childNode = createNode()\r\n        childNode.querySelector('.vertical-bar.to-parent')\r\n            .classList.add('active')\r\n\r\n        const children = thisNode\r\n            .querySelector('.children')\r\n        children.appendChild(childNode)\r\n\r\n        thisNode.querySelector('.vertical-bar.to-children')\r\n            .classList.add('active')\r\n\r\n        updateHorizontalBarWidths(thisNode)\r\n    }\r\n\r\n    function updateHorizontalBarWidths(node) {\r\n        const horizontalBar = node.querySelector('.horizontal-bar')\r\n        const children = node.querySelector('.children')\r\n        const numChildren = children.children.length\r\n        let width = children.offsetWidth\r\n        const firstChildWidth = children.children[0].offsetWidth\r\n        const lastChildWidth = children.children[numChildren - 1].offsetWidth\r\n        const verticalBarWidth = node.querySelector('.vertical-bar').offsetWidth\r\n        width -= ((firstChildWidth / 2) + (lastChildWidth / 2))\r\n        width += verticalBarWidth\r\n\r\n        horizontalBar.style.width = width + 'px'\r\n        horizontalBar.style.left = ((firstChildWidth - verticalBarWidth) / 2) + 'px'\r\n        horizontalBar.classList.add('active')\r\n\r\n        const parentNode = node.parentNode.closest('.node')\r\n        if (parentNode) {\r\n            updateHorizontalBarWidths(parentNode)\r\n        }\r\n    }\r\n\r\n    return { init }\r\n})()\n\n//# sourceURL=webpack://tree-graph/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;