import "../button/button";
import "../logo-full/logo-full";

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
