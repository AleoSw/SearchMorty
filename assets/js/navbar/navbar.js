import { $ } from "../helpers/selector.js";
import { $$ } from "../helpers/selector.js";
import { setDataCss } from "../getCss/getCssRules.js";

const nav = $(".navbar");
const btnToogle = $(".btnToggle");
let navbarBefore = setDataCss(".navbar::before");

export function navbar(data) {
  if (data === "open") {
    $(".btnToggle .overlay").dataset.status = "close";
    nav.classList.add("shownav");
    btnToogle.style.transform = "rotate(-90deg)";
    setTimeout(
      () => (navbarBefore.style.backgroundColor = "var(--bg-navbar-shadow)"),
      600
    );
  } else if (data === "close") {
    navbarBefore.style.backgroundColor = "transparent";
    $(".btnToggle .overlay").dataset.status = "open";
    btnToogle.style.transform = "rotate(0deg)";
    setTimeout(() => nav.classList.remove("shownav"), 600);
  }
}
const linksNav = $$('.nav-link p')

export function navLinks(data) {
  if (data === "character") {
    linksNav[0].classList.add('active-link')
    linksNav[1].classList.remove('active-link')
    linksNav[2].classList.remove('active-link')
  } else if (data === "location") {
    linksNav[1].classList.add('active-link')
    linksNav[0].classList.remove('active-link')
    linksNav[2].classList.remove('active-link')

  } else if (data === "episode") {
    linksNav[2].classList.add('active-link')
    linksNav[1].classList.remove('active-link')
    linksNav[0].classList.remove('active-link')
  }
  navbarBefore.style.backgroundColor = "transparent";
  $(".btnToggle .overlay").dataset.status = "open";
  btnToogle.style.transform = "rotate(0deg)";
  setTimeout(() => nav.classList.remove("shownav"), 600);
}
