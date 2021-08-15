/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _user_step__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-step */ \"./src/user-step.js\");\n\r\n\r\nwindow.addEventListener('DOMContentLoaded', (e) => {\r\n    App.init()\r\n})\r\n\r\nvar App = (function () {\r\n    let isInitialized = false\r\n    let config = null\r\n    let root = null\r\n    let main = null\r\n\r\n    let init = function () {\r\n        if (isInitialized) {\r\n            return\r\n        }\r\n\r\n        buildTree()\r\n\r\n        bindUiActions()\r\n\r\n        console.log('initialized')\r\n        isInitialized = true\r\n    };\r\n\r\n    function buildTree() {\r\n        main = document.getElementById('main')\r\n                \r\n        root = new _user_step__WEBPACK_IMPORTED_MODULE_0__.UserStep(null)\r\n        root.createIn('#main')\r\n    }    \r\n\r\n    function bindUiActions () {\r\n        const tpb = document.getElementById('toggle-preview')        \r\n        tpb.addEventListener('click', function(e) {\r\n            e.preventDefault()\r\n            let showPreview = tpb.getAttribute('data-preview')\r\n            if(showPreview === 'on') {\r\n                main.classList.add('no-preview')\r\n                tpb.innerHTML = 'Show  Preview'\r\n                tpb.setAttribute('data-preview', 'off')\r\n            } else {\r\n                main.classList.remove('no-preview')\r\n                tpb.innerHTML = 'Hide  Preview'\r\n                tpb.setAttribute('data-preview', 'on')\r\n            }\r\n        })\r\n    }\r\n\r\n    return { init }\r\n})()\n\n//# sourceURL=webpack://tree-graph/./src/index.js?");

/***/ }),

/***/ "./src/user-step.js":
/*!**************************!*\
  !*** ./src/user-step.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"UserStep\": () => (/* binding */ UserStep)\n/* harmony export */ });\n\r\nclass UIObject {\r\n    /** @param {UserStep} [_parent] */\r\n    constructor(_parent) {\r\n        /** @type UserStep */\r\n        this.parent = _parent\r\n\r\n        /** @type {HTMLElement?} */\r\n        this.element = null\r\n\r\n        /** @type {Object?} */\r\n        this.data = null\r\n\r\n        /** @private @type {bool} */\r\n        this._isHidden = false\r\n    }\r\n\r\n    /** @param {HTMLElement} [element] */\r\n    setElement(element) {\r\n        this.element = element\r\n    }\r\n\r\n    hide() {\r\n        this.element.classList.remove('show')\r\n        this.element.classList.add('hide')\r\n        this._isHidden = true\r\n    }\r\n\r\n    show() {\r\n        this.element.classList.remove('hide')\r\n        this.element.classList.add('show')\r\n        this._isHidden = false\r\n    }\r\n\r\n    isHidden() {\r\n        return this._isHidden\r\n    }\r\n\r\n    on(eventName, callback) {\r\n        this.element.addEventListener(eventName, callback)\r\n    }\r\n\r\n    activate() {\r\n        this.element.classList.add('active')\r\n    }\r\n\r\n    deActivate() {\r\n        this.element.classList.remove('active')\r\n    }\r\n\r\n    focus() {\r\n        this.element.focus()\r\n        this.element.scrollIntoView()\r\n    }\r\n\r\n    destroy() {\r\n        this.parent = null\r\n        this.element = null\r\n        this.data = null\r\n    }\r\n}\r\n\r\nclass VerticalBar extends UIObject {\r\n    /** @param {UserStep} [_parent] */\r\n    constructor(_parent) {\r\n        super(_parent)\r\n    }\r\n\r\n    getWidth() {\r\n        return 4\r\n    }\r\n}\r\n\r\nclass VerticalBarToPrevious extends VerticalBar {\r\n    /** @param {UserStep} [_parent] */\r\n    constructor(_parent) {\r\n        super(_parent)\r\n\r\n        this.element = _parent.element.\r\n            querySelector('.vertical-bar.to-previous')\r\n    }\r\n}\r\n\r\nclass VerticalBarToNext extends VerticalBar {\r\n    /** @param {UserStep} [_parent] */\r\n    constructor(_parent) {\r\n        super(_parent)\r\n\r\n        this.element = _parent.element.\r\n            querySelector('.vertical-bar.to-next')\r\n    }\r\n}\r\n\r\nclass HorizontalBar extends UIObject {\r\n    /** @param {UserStep} [_parent] */\r\n    constructor(_parent) {\r\n        super(_parent)\r\n\r\n        this.element = _parent.element.\r\n            querySelector('.horizontal-bar')\r\n    }\r\n\r\n    place(left, width) {\r\n        this.element.style.left = left + 'px'\r\n        this.element.style.width = width + 'px'\r\n    }\r\n}\r\n\r\nclass Explanation extends UIObject {\r\n    static tabIndex = 1\r\n\r\n    /** @param {UserStep} [_parent] */\r\n    constructor(_parent) {\r\n        super(_parent)\r\n\r\n        this.element = _parent.element.\r\n            querySelector('.explanation')\r\n\r\n        this.element.tabIndex = Explanation.tabIndex\r\n        Explanation.tabIndex++\r\n    }\r\n}\r\n\r\nclass Preview extends UIObject {\r\n    /** @param {UserStep} [_parent] */\r\n    constructor(_parent) {\r\n        super(_parent)\r\n\r\n        this.element = _parent.element.\r\n            querySelector('.preview')\r\n    }\r\n}\r\n\r\nclass StepToolbarButton extends UIObject {\r\n    /** @param {UserStep} [_parent] */\r\n    constructor(_parent) {\r\n        super(_parent)\r\n    }\r\n}\r\n\r\nclass STBAddNextStep extends StepToolbarButton {\r\n    /** @param {UserStep} [_parent] */\r\n    constructor(_parent) {\r\n        super(_parent)\r\n\r\n        this.element = _parent.element.\r\n            querySelector('.add-next-step')\r\n\r\n        this.element.addEventListener('click', (e) => {\r\n            this.parent.addNextStep()\r\n        })\r\n    }\r\n}\r\n\r\nclass STBShowNextSteps extends StepToolbarButton {\r\n    /** @param {UserStep} [_parent] */\r\n    constructor(_parent) {\r\n        super(_parent)\r\n\r\n        this.element = _parent.element.\r\n            querySelector('.show-next-steps')\r\n\r\n\r\n        this.element.addEventListener('click', (e) => {\r\n            this.parent.showNextSteps()\r\n        })\r\n    }\r\n}\r\n\r\nclass STBHideNextSteps extends StepToolbarButton {\r\n    /** @param {UserStep} [_parent] */\r\n    constructor(_parent) {\r\n        super(_parent)\r\n\r\n        this.element = _parent.element.\r\n            querySelector('.hide-next-steps')\r\n\r\n        this.element.addEventListener('click', (e) => {\r\n            this.parent.hideNextSteps()\r\n        })\r\n    }\r\n}\r\n\r\nclass STBRemoveSelf extends StepToolbarButton {\r\n    /** @param {UserStep} [_parent] */\r\n    constructor(_parent) {\r\n        super(_parent)\r\n\r\n        this.element = _parent.element.\r\n            querySelector('.remove-self')\r\n\r\n        this.element.addEventListener('click', (e) => {\r\n            const step = this.parent\r\n            if (!step.parent) {\r\n                alert('cannot remove this')\r\n                return\r\n            }\r\n\r\n            if (confirm(\"Removing this will remove all next steps also. You can not get them back. Are you sure?\")) {\r\n                step.parent.removeNextStep(e)\r\n            }\r\n        })\r\n    }\r\n}\r\n\r\nclass StepToolbar extends UIObject {\r\n    /** @param {UserStep} [_parent] */\r\n    constructor(_parent) {\r\n        super(_parent)\r\n\r\n        this.element = _parent.element.\r\n            querySelector('.step-toolbar')\r\n\r\n        this.addNextStep = new STBAddNextStep(_parent)\r\n        this.showNextSteps = new STBShowNextSteps(_parent)\r\n        this.hideNextSteps = new STBHideNextSteps(_parent)\r\n        this.removeSelf = new STBRemoveSelf(_parent)\r\n    }\r\n\r\n    destroy() {\r\n        this.addNextStep.destroy()\r\n        this.showNextSteps.destroy()\r\n        this.hideNextSteps.destroy()\r\n        this.removeSelf.destroy()\r\n        super.destroy()\r\n    }\r\n}\r\nclass Visual extends UIObject {\r\n    /** @param {UserStep} [_parent] */\r\n    constructor(_parent) {\r\n        super(_parent)\r\n\r\n        this.element = _parent.element.\r\n            querySelector('.visual')\r\n\r\n        this.preview = new Preview(_parent)\r\n        this.stepToolbar = new StepToolbar(_parent)\r\n    }\r\n\r\n    destroy() {\r\n        this.preview.destroy()\r\n        this.stepToolbar.destroy()\r\n        super.destroy()\r\n    }\r\n}\r\n\r\nclass NextSteps extends UIObject {\r\n    /** @param {UserStep} [_parent] */\r\n    constructor(_parent) {\r\n        super(_parent)\r\n\r\n        this.element = _parent.element.\r\n            querySelector('.next-steps')\r\n\r\n        this.userSteps = []\r\n    }\r\n\r\n    getUserStepIndex(element) {\r\n        let stepElement = element.closest('.step')\r\n        for (let i = 0; i < this.userSteps.length; i++) {\r\n            if (this.userSteps[i].element === stepElement) {\r\n                return i\r\n            }\r\n        }\r\n        return -1\r\n    }\r\n\r\n    getUserStepWidth(index) {\r\n        return this.userSteps[index].width\r\n    }\r\n\r\n    getFirstStepWidth() {\r\n        if (this.userSteps.length === 0) {\r\n            return 0\r\n        }\r\n\r\n        return this.userSteps[0].width\r\n    }\r\n\r\n    getLastStepWidth() {\r\n        if (this.userSteps.length === 0) {\r\n            return 0\r\n        }\r\n\r\n        return this.userSteps[this.userSteps.length - 1].width\r\n    }\r\n\r\n    getCount() {\r\n        return this.userSteps.length\r\n    }\r\n\r\n    getWidth() {\r\n        let width = 0\r\n        this.userSteps.forEach((step, index) => {\r\n            width += step.width\r\n        })\r\n\r\n        return width\r\n    }\r\n\r\n    add(userStep) {\r\n        this.element.appendChild(userStep.element)\r\n        this.userSteps.push(userStep)\r\n    }\r\n\r\n    remove(indexToRemove) {\r\n        UserStep.stepHighlighter.unHighlight(this.userSteps[indexToRemove])\r\n        this.userSteps[indexToRemove].destroy()\r\n        this.userSteps.splice(indexToRemove, 1)\r\n    }\r\n\r\n    destroy() {\r\n        this.userSteps = []\r\n        super.destroy()\r\n    }\r\n}\r\n\r\n\r\nclass UserStep extends UIObject {\r\n    /** @type {HTMLElement} template */\r\n    static template = document.getElementById('user-step')\r\n        .content.firstElementChild\r\n\r\n    static paddingX = 4\r\n    static initialWidth = 208\r\n\r\n    static stepHighlighter = (function () {\r\n        /** @type {UserStep} [highlighted] */\r\n        let highlighted = null\r\n\r\n        let highlight = (step) => {\r\n            if (highlighted) {\r\n                remove(highlighted)\r\n            }\r\n            add(step)\r\n        }\r\n\r\n        let unHighlight = (step) => {\r\n            if(highlighted === step) {\r\n                remove(highlighted)                \r\n            }\r\n        }\r\n\r\n        let remove = (step) => {\r\n            step.element.classList.remove('highlight')\r\n            highlighted = null\r\n        }\r\n\r\n        let add = (step) => {\r\n            step.element.classList.add('highlight')\r\n            highlighted = step\r\n        }\r\n\r\n        return { highlight, unHighlight }\r\n    })()\r\n\r\n    /** @param {UserStep} [_parent] */\r\n    constructor(_parent) {\r\n        super(_parent)\r\n\r\n        const stepElement = UserStep.template.cloneNode(true)\r\n        this.element = stepElement\r\n\r\n        this.verticalBarToParent = new VerticalBarToPrevious(this)\r\n        this.explanation = new Explanation(this)\r\n        this.visual = new Visual(this)\r\n        this.verticalbarToNext = new VerticalBarToNext(this)\r\n        this.horizontalBar = new HorizontalBar(this)\r\n        this.nextSteps = new NextSteps(this)\r\n\r\n        this.width = UserStep.initialWidth\r\n\r\n        this.element.addEventListener('click', (e) => {\r\n            if (this.element) {\r\n                UserStep.stepHighlighter.highlight(this)\r\n            }\r\n            e.stopPropagation()\r\n        })\r\n    }\r\n\r\n    setParent(parent) {\r\n        throw 'not implemented'\r\n    }\r\n\r\n    createIn(selector) {\r\n        const el = document.querySelector(selector)\r\n        if (el) {\r\n            el.appendChild(this.element)\r\n        }\r\n    }\r\n\r\n    addNextStep() {\r\n        const userStep = new UserStep(this)\r\n        this.nextSteps.add(userStep)\r\n\r\n        this.showNextSteps()\r\n\r\n        this.verticalbarToNext.show()\r\n        this.horizontalBar.show()\r\n        userStep.verticalBarToParent.show()\r\n\r\n        // resize at the end\r\n        this.resize()\r\n\r\n        this.explanation.focus()\r\n    }\r\n\r\n    showNextSteps() {\r\n        this.nextSteps.show()\r\n        this.verticalbarToNext.show()\r\n        this.horizontalBar.show()\r\n        this.resize()\r\n        this.visual.stepToolbar.showNextSteps.deActivate()\r\n        this.visual.stepToolbar.hideNextSteps.activate()\r\n    }\r\n\r\n    hideNextSteps() {\r\n        this.nextSteps.hide()\r\n        this.verticalbarToNext.hide()\r\n        this.horizontalBar.hide()\r\n        this.resize()\r\n        this.visual.stepToolbar.showNextSteps.activate()\r\n        this.visual.stepToolbar.hideNextSteps.deActivate()\r\n    }\r\n\r\n    removeNextStep(e) {\r\n        let element = e.target\r\n        let indexToRemove = this.nextSteps.getUserStepIndex(element)\r\n        if (indexToRemove === -1) {\r\n            return\r\n        }\r\n        // make sure you are done with \r\n        // getting everything you need from this step\r\n        // before removing it.\r\n        // once gone, it's gone forever\r\n        this.nextSteps.remove(indexToRemove)        \r\n\r\n        // resize at the end\r\n        this.resize()\r\n    }\r\n\r\n    resize() {\r\n\r\n        const nextStepsWidth = this.nextSteps.getWidth()\r\n        const nextStepsCount = this.nextSteps.getCount()\r\n\r\n        this.width = nextStepsWidth\r\n\r\n        if ((nextStepsCount === 0) || (this.nextSteps.isHidden())) {\r\n            this.width = UserStep.initialWidth\r\n            this.horizontalBar.place(0, 0)\r\n            this.verticalbarToNext.hide()\r\n            this.horizontalBar.hide()\r\n        } else {\r\n            const firstStepWidth = this.nextSteps.getFirstStepWidth()\r\n            const lastStepWidth = this.nextSteps.getLastStepWidth()\r\n            const vbWidth = this.verticalBarToParent.getWidth()\r\n            const hbWidth = nextStepsWidth - (firstStepWidth / 2) - (lastStepWidth / 2) + vbWidth\r\n            const left = (firstStepWidth / 2) - (vbWidth / 2) - UserStep.paddingX\r\n\r\n            this.horizontalBar.place(left, hbWidth)\r\n        }\r\n\r\n        if (!this.parent) {\r\n            return\r\n        }\r\n\r\n        this.parent.resize()\r\n    }\r\n\r\n    destroy() {\r\n        this.verticalBarToParent.destroy()\r\n        this.explanation.destroy()\r\n        this.visual.destroy()\r\n        this.verticalbarToNext.destroy()\r\n        this.horizontalBar.destroy()\r\n        this.nextSteps.destroy()\r\n\r\n        this.element.remove()\r\n\r\n        super.destroy()\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://tree-graph/./src/user-step.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;