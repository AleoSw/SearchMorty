import { $ } from "../helpers/selector.js";
import { setDataCss } from "../getCss/getCssRules.js";

const nav = $(".navbar");
const btnToogle = $(".btnToggle");
let navbarBefore = setDataCss(".navbar::before");

export function navbar(data) {
  if (data === "open") {
    $(".btnToggle .overlay").dataset.status = "close";
    nav.classList.add("shownav");
    btnToogle.style.transform = "rotate(-90deg)";
    setTimeout(() => (navbarBefore.style.backgroundColor = "var(--bg-navbar-shadow)"), 600);
  } else if (data === "close") {
    navbarBefore.style.backgroundColor = "transparent";
    $(".btnToggle .overlay").dataset.status = "open";
    btnToogle.style.transform = "rotate(0deg)";
    setTimeout(() => nav.classList.remove("shownav"), 600);
  }
}
