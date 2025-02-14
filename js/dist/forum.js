/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/forum/index.ts":
/*!****************************!*\
  !*** ./src/forum/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/TextEditor */ "flarum/common/components/TextEditor");
/* harmony import */ var flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_TextEditorButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/TextEditorButton */ "flarum/common/components/TextEditorButton");
/* harmony import */ var flarum_common_components_TextEditorButton__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_TextEditorButton__WEBPACK_IMPORTED_MODULE_4__);





var translationPrefix = 'clarkwinkelmann-emojionearea.forum.';
var emojioneAreaLoaded = false;
function loadEmojioneArea() {
  if (emojioneAreaLoaded) {
    return Promise.resolve();
  }
  emojioneAreaLoaded = true;
  return new Promise(function (resolve) {
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.crossOrigin = 'anonymous';
    style.integrity = 'sha256-LKawN9UgfpZuYSE2HiCxxDxDgLOVDx2R4ogilBI52oc=';
    style.href = 'https://cdn.jsdelivr.net/npm/emojionearea@3.4.2/dist/emojionearea.min.css';
    document.head.appendChild(style);
    var script = document.createElement('script');
    script.crossOrigin = 'anonymous';
    script.integrity = 'sha256-ImIFrmJd7ymGlVw2MbtI96BNPW4NfcKqM3d1Go665Ig=';
    script.src = 'https://cdn.jsdelivr.net/npm/emojionearea@3.4.2/dist/emojionearea.min.js';
    script.onload = resolve;
    document.body.appendChild(script);
  });
}
flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().initializers.add('clarkwinkelmann-emojionearea', function () {
  (flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_3___default().prototype).emojioneAreaClickedOutside = function (event) {
    // If a click is triggered before the picker is ready, do not do anything
    if (!this.emojioneArea || !this.emojioneArea.isReady) {
      return;
    }
    var $target = $(event.target);

    // If we clicked on the popup or the editor button we don't do anything
    if ($target.is('.emojionearea') || $target.parents('.emojionearea').length || $target.parents('.Button-emojionearea').length) {
      return;
    }
    this.emojioneArea.hidePicker();
  };
  (flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_3___default().prototype).configureEmojioneArea = function () {
    var _this = this;
    if (this.emojioneArea) {
      return Promise.resolve();
    }
    var $container = $('<div class="ComposerBody-emojioneareaContainer"/>');
    this.$('.TextEditor-controls').before($container);
    return new Promise(function (resolve) {
      var filters = {};
      Object.keys($().emojioneArea.defaults.filters).forEach(function (filter) {
        var key = translationPrefix + 'filters.' + filter;
        if (key in (flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator).translations) {
          filters[filter] = {
            title: flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans(key)
          };
        }
      });
      var area = $('<div />').emojioneArea((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        standalone: true,
        // Popup only mode
        sprite: false,
        // Undocumented setting, but disabling it removes an unnecessary CSS file load
        hidePickerOnBlur: false,
        // We do our own "click outside" detection since we have a custom opening button
        searchPlaceholder: flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans(translationPrefix + 'search_placeholder'),
        buttonTitle: flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans(translationPrefix + 'picker_button'),
        container: $container,
        filters: filters,
        events: {
          // Listen for clicks to sync with Flarum editor
          emojibtn_click: function emojibtn_click() {
            // To get the Unicode value, we need to pull it from the invisible insert area
            _this.attrs.composer.editor.insertAtCursor(_this.emojioneArea.getText());
            if (flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().forum.attribute('emojioneAreaCloseOnPick')) {
              _this.emojioneArea.hidePicker();
            }
          },
          ready: resolve
        }
      }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().forum.attribute('emojioneAreaConfig')));
      _this.emojioneArea = area.data('emojioneArea');
    });
  };
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_3___default().prototype), 'oncreate', function () {
    this.emojioneArea = null;
    this.emojioneAreaLoading = false;
    document.addEventListener('click', this.emojioneAreaClickedOutside.bind(this));
  });
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_3___default().prototype), 'onremove', function () {
    document.removeEventListener('click', this.emojioneAreaClickedOutside);
  });
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_3___default().prototype), 'toolbarItems', function (items) {
    var _this2 = this;
    items.add('clarkwinkelmann-emojionearea', flarum_common_components_TextEditorButton__WEBPACK_IMPORTED_MODULE_4___default().component({
      onclick: function onclick() {
        // Prevent double-clicks while the library is loading
        if (_this2.emojioneAreaLoading) {
          return;
        }
        if (_this2.emojioneArea && _this2.emojioneArea.button.is('.active')) {
          _this2.emojioneArea.hidePicker();
        } else {
          _this2.emojioneAreaLoading = true;
          loadEmojioneArea().then(function () {
            _this2.configureEmojioneArea().then(function () {
              var position = _this2.$('.Button-emojionearea').position();
              _this2.$('.emojionearea-picker').css('left', position.left - 290);
              _this2.emojioneArea.showPicker();

              // Focus EmojiOneArea search bar after opening
              $('.emojionearea-search input').focus();
              _this2.emojioneAreaLoading = false;
              m.redraw();
            });
          });
        }
      },
      className: 'Button Button--icon Button--link Button-emojionearea',
      icon: this.emojioneAreaLoading ? 'fas fa-spinner fa-pulse' : 'far fa-smile-beam',
      title: flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().translator.trans(translationPrefix + 'picker_button')
    }));
  });
});
flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().initializers.add('clarkwinkelmann-emojionearea-after', function () {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_3___default().prototype), 'toolbarItems', function (items) {
    if (flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default().forum.attribute('emojioneAreaHideFlarumButton') && items.has('emoji')) {
      items.remove('emoji');
    }
  });
}, -100); // Since flarum/emoji does not run with any special priority, any negative value should work

/***/ }),

/***/ "flarum/common/components/TextEditor":
/*!*********************************************************************!*\
  !*** external "flarum.core.compat['common/components/TextEditor']" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/TextEditor'];

/***/ }),

/***/ "flarum/common/components/TextEditorButton":
/*!***************************************************************************!*\
  !*** external "flarum.core.compat['common/components/TextEditorButton']" ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/TextEditorButton'];

/***/ }),

/***/ "flarum/common/extend":
/*!******************************************************!*\
  !*** external "flarum.core.compat['common/extend']" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/extend'];

/***/ }),

/***/ "flarum/forum/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['forum/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/app'];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}


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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./forum.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.ts");

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=forum.js.map