export let type = "character";
import { $ } from "./helpers/selector.js";
import { $$ } from "./helpers/selector.js";
import { navbar } from "./navbar/navbar.js";
import { navLinks } from "./navbar/navbar.js";
import { getDataPreview } from "./getDataAPI/preContent.js";
import { search } from './search/search.js'
const app = $(".app");
const inputSearch = $("#searchInput");

app.addEventListener("click", (e) => {
  let target = e.target;
  let targetDataset = e.target.dataset;
  // console.log(target);

  if (e.target.dataset.status === "open") navbar(targetDataset.status);
  else if (targetDataset.status === "close") navbar(targetDataset.status);
  else if (targetDataset.type === "character") {
    navLinks(targetDataset.type);
    type = targetDataset.type;
    getDataPreview(type);
  } else if (targetDataset.type === "location") {
    navLinks(targetDataset.type);
    type = targetDataset.type;
    getDataPreview(type);
  } else if (targetDataset.type === "episode") {
    navLinks(targetDataset.type);
    type = targetDataset.type;
    getDataPreview(type);
  }

  console.log(type);
});

inputSearch.addEventListener("keydown", (e) => {
  search(inputSearch.value);
});

document.addEventListener("DOMContentLoaded", (e) => {
  getDataPreview();
});
