import "../button/button";
import "../logo-full/logo-full";

const headers = document.querySelectorAll(".header");

function handleNavLinkClick(event) {}

headers.forEach((header) => {
  header.addEventListener("click", handleNavLinkClick);
});
