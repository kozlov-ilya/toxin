/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/button/button.js":
/*!*************************************!*\
  !*** ./src/blocks/button/button.js ***!
  \*************************************/
/***/ (() => {




/***/ }),

/***/ "./src/blocks/card-sign-in/card-sign-in.js":
/*!*************************************************!*\
  !*** ./src/blocks/card-sign-in/card-sign-in.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _button_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../button/button */ "./src/blocks/button/button.js");
/* harmony import */ var _button_button__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_button_button__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _field_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../field/field */ "./src/blocks/field/field.js");
/* harmony import */ var _field_field__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_field_field__WEBPACK_IMPORTED_MODULE_1__);



const signinCards = document.querySelectorAll(".card-sign-in");

function handleSubmit(event) {
  event.preventDefault();
  window.location.href = "../index.html";
}

signinCards.forEach((signinCard) => {
  const signinForm = signinCard.querySelector(".card-sign-in__form");
  signinForm.addEventListener("submit", handleSubmit);
});


/***/ }),

/***/ "./src/blocks/field/field.js":
/*!***********************************!*\
  !*** ./src/blocks/field/field.js ***!
  \***********************************/
/***/ (() => {

const fields = document.querySelectorAll('.field');

// Hover handlers
function handleFieldHovered(e) {
  e.target.classList.add('field_hovered');
}

function handleFieldUnhovered(e) {
  e.target.classList.remove('field_hovered');
}

// Focus handlers
function handleFieldFocused(e) {
  e.target.classList.add('field_focused');
}

function handleFieldUnfocused(e) {
  e.target.classList.remove('field_focused');
}

// Add handlers to events
fields.forEach((e) => {
  // Add hover event handlers
  e.addEventListener('mouseover', handleFieldHovered);
  e.addEventListener('mouseout', handleFieldUnhovered);
  // Add focus event handlers
  e.addEventListener('focus', handleFieldFocused);
  e.addEventListener('blur', handleFieldUnfocused);
});


/***/ }),

/***/ "./src/blocks/footer/footer.js":
/*!*************************************!*\
  !*** ./src/blocks/footer/footer.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _logo_full_logo_full__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../logo-full/logo-full */ "./src/blocks/logo-full/logo-full.js");
/* harmony import */ var _logo_full_logo_full__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_logo_full_logo_full__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _subscription_text_field_subscription_text_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../subscription-text-field/subscription-text-field */ "./src/blocks/subscription-text-field/subscription-text-field.js");



const footers = document.querySelectorAll(".footer");

footers.forEach((footer) => {});


/***/ }),

/***/ "./src/blocks/header/header.js":
/*!*************************************!*\
  !*** ./src/blocks/header/header.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _button_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../button/button */ "./src/blocks/button/button.js");
/* harmony import */ var _button_button__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_button_button__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _logo_full_logo_full__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../logo-full/logo-full */ "./src/blocks/logo-full/logo-full.js");
/* harmony import */ var _logo_full_logo_full__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_logo_full_logo_full__WEBPACK_IMPORTED_MODULE_1__);



const headers = document.querySelectorAll(".header");

function removeHoverEvents(navItem) {
  navItem.removeEventListener("mouseover", handleNavItemHover);
  navItem.removeEventListener("mouseleave", handleNavItemUnhover);
}

function addHoverEvents(navItem) {
  navItem.addEventListener("mouseover", handleNavItemHover);
  navItem.addEventListener("mouseleave", handleNavItemUnhover);
}

function updateExpandableNavItemsEvents(navItem) {
  if (navItem.classList.contains("nav-item_expandable_yes")) {
    const match = window.matchMedia("(max-width: 1024px)");
    if (match.matches) {
      navItem.addEventListener("click", handleNavItemClick);
      removeHoverEvents(navItem);
    } else {
      navItem.removeEventListener("click", handleNavItemClick);
      addHoverEvents(navItem);
    }
  }
}

function handleNavItemHover(event) {
  const navItem = event.currentTarget;
  navItem.classList.add("nav-item_active_yes");
}

function handleNavItemUnhover(event) {
  const navItem = event.currentTarget;
  navItem.classList.remove("nav-item_active_yes");
}

function handleNavItemClick(event) {
  const navItem = event.currentTarget;
  navItem.classList.toggle("nav-item_active_yes");
}

function updateButtons(header) {
  const buttons = header.querySelectorAll(".button");
  const match = window.matchMedia("(max-width: 1024px)");
  buttons.forEach((button) => {
    if (match.matches) {
      button.classList.remove("button_size_shrinked");
      button.classList.add("button_size_expanded");
    } else {
      button.classList.add("button_size_shrinked");
      button.classList.remove("button_size_expanded");
    }
  });
}

function handleBurgerButtonClick(event) {
  const burgerButton = event.currentTarget;
  const header = burgerButton.closest(".header");
  const menu = header.querySelector(".header__menu");
  burgerButton.classList.toggle("burger-button_expanded_yes");
  menu.classList.toggle("header__menu_expanded_yes");
}

function handleWindowClick(event) {
  if (
    !(
      event.target.closest(".header__menu-content") ||
      event.target.closest(".burger-button")
    )
  ) {
    const burgerButton = document.querySelector(".burger-button");
    const menu = document.querySelector(".header__menu");
    burgerButton.classList.remove("burger-button_expanded_yes");
    menu.classList.remove("header__menu_expanded_yes");
  }
}

headers.forEach((header) => {
  const navItems = header.querySelectorAll(".nav-item");
  const burgerButton = header.querySelector(".burger-button");

  navItems.forEach((navItem) => {
    addHoverEvents(navItem);
    updateExpandableNavItemsEvents(navItem);
  });

  burgerButton.addEventListener("click", handleBurgerButtonClick);

  updateButtons(header);
});

window.addEventListener("resize", (event) => {
  headers.forEach((header) => {
    const navItems = header.querySelectorAll(".nav-item");
    navItems.forEach((navItem) => {
      updateExpandableNavItemsEvents(navItem);
    });
    updateButtons(header);
  });
});


/***/ }),

/***/ "./src/blocks/logo-full/logo-full.js":
/*!*******************************************!*\
  !*** ./src/blocks/logo-full/logo-full.js ***!
  \*******************************************/
/***/ (() => {



/***/ }),

/***/ "./src/blocks/subscription-text-field/subscription-text-field.js":
/*!***********************************************************************!*\
  !*** ./src/blocks/subscription-text-field/subscription-text-field.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _field_field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../field/field */ "./src/blocks/field/field.js");
/* harmony import */ var _field_field__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_field_field__WEBPACK_IMPORTED_MODULE_0__);



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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************************************!*\
  !*** ./src/pages/signin-page/signin-page.js ***!
  \**********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _blocks_header_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../blocks/header/header */ "./src/blocks/header/header.js");
/* harmony import */ var _blocks_footer_footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../blocks/footer/footer */ "./src/blocks/footer/footer.js");
/* harmony import */ var _blocks_card_sign_in_card_sign_in__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../blocks/card-sign-in/card-sign-in */ "./src/blocks/card-sign-in/card-sign-in.js");




const page = document.querySelector(".page");
const header = document.querySelector(".header");
const burgerButton = header.querySelector(".burger-button");

burgerButton.addEventListener("click", handleBurgerButtonClick);

function handleBurgerButtonClick(event) {
  /* Prevent page scrolling */
  page.classList.toggle("page_scroll_lock");
}

updateSigninCard();

window.addEventListener("resize", (event) => {
  updateSigninCard();
});

function updateSigninCard() {
  const match = window.matchMedia("(max-width: 599px)");
  const signinCard = page.querySelector(".card-sign-in");

  if (match.matches) {
    makeSigninCardResponsive(signinCard);
  } else {
    makeSigninCardStatic(signinCard);
  }

  function makeSigninCardResponsive(signinCard) {
    signinCard.classList.add("card-sign-in_responsive");
    signinCard
      .querySelector(".card-sign-in__sign-in-btn")
      .classList.add("button_size_expanded");
  }

  function makeSigninCardStatic(signinCard) {
    signinCard.classList.remove("card-sign-in_responsive");
    signinCard
      .querySelector(".card-sign-in__sign-in-btn")
      .classList.remove("button_size_expanded");
  }
}

})();

/******/ })()
;
//# sourceMappingURL=signin-page.js.map