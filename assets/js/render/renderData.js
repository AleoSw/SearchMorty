import { $ } from "../helpers/selector.js";
import { $$ } from "../helpers/selector.js";
import { type } from "../main.js";
const containerResult = $("#resultsContainer .container .row");
const fragment = document.createDocumentFragment();
const templateCard = $("#cardTemplate");
const templateEpisode = $("#templateEpisode");
const templateLocation = $("#templateLocation");

export function renderData(data) {
  console.log(data);
  fragment.innerHTML = "";
  containerResult.innerHTML = "";

  if (type === "character") {
    data.map((item) => {
      const clone = templateCard.content.cloneNode(true);
      clone.querySelector(".imgCard").setAttribute("src", `${item.image}`);
      clone.querySelector(".titleCard").textContent = `${item.name}`;

      if (item.status === "Alive") {
        clone.querySelector("#statusColor").classList.add("alive");
        clone.querySelector(".statusText").textContent = "Alive";
      } else if (item.status === "unknown") {
        clone.querySelector("#statusColor").classList.add("unknown");
        clone.querySelector(".statusText").textContent = "Unknown";
      } else if (item.status === "Dead") {
        clone.querySelector("#statusColor").classList.add("dead");
        clone.querySelector(".statusText").textContent = "Dead";
      }
      clone.querySelector(".species").textContent = `${item.species}`;

      fragment.appendChild(clone);
    });
    containerResult.appendChild(fragment);
  } else if (type === "location") {
    data.map((item) => {
      const clone = templateLocation.content.cloneNode(true);
      clone.querySelector(".titleLocation").textContent = `${item.name}`;
      clone.querySelector("#typeLocation").textContent = `${item.type}`;
      clone.querySelector("#dimension").textContent = `${item.dimension}`;
      fragment.appendChild(clone);
    });
    containerResult.appendChild(fragment);

    let dataImg = [];
    for (let i = 0; i < data.length; i++) {
      let temp = [];
      if (data[i].residents.length === 0) {
        temp.push(...[""]);
        temp.push(...[`<span class="subtitleLocation">No residents</span>`]);
        temp.push(...[""]);
        dataImg.push(temp);
      } else {
        if (data[i].residents.at(-1) === undefined) {
          temp.push("<img src='./assets/images/undefined.png'>");
        } else {
          temp.push(
            "<img src='https://rickandmortyapi.com/api/character/avatar/" +
              `${data[i].residents.at(-1)}`.replace(/[^0-9+]/g, "") +
              ".jpeg'>"
          );
        }

        if (data[i].residents.at(-2) === undefined) {
          temp.push("<img src='./assets/images/undefined.png'>");
        } else {
          temp.push(
            "<img src='https://rickandmortyapi.com/api/character/avatar/" +
              `${data[i].residents.at(-2)}`.replace(/[^0-9+]/g, "") +
              ".jpeg'>"
          );
        }

        if (data[i].residents.at(-3) === undefined) {
          temp.push("<img src='./assets/images/undefined.png'>");
        } else {
          temp.push(
            "<img src='https://rickandmortyapi.com/api/character/avatar/" +
              `${data[i].residents.at(-3)}`.replace(/[^0-9+]/g, "") +
              ".jpeg'>"
          );
        }

        dataImg.push(temp);
      }
    }

    const imgLocation = $$(".imgLocation");
    for (let x = 0; x < imgLocation.length; x++) {
      for (let o = 0; o < 3; o++) {
        imgLocation[x].innerHTML += dataImg[x][o];
      }
    }
  } else if (type === "episode") {
    data.map((item) => {
      const clone = templateEpisode.content.cloneNode(true);
      clone.querySelector(".titleEpisode").textContent = `${item.name}`;
      clone.querySelector(".episode").textContent = `${item.episode}`;
      clone.querySelector(".dateEpisode").textContent = `${item.air_date}`;
      fragment.appendChild(clone);
    });
    containerResult.appendChild(fragment);

    let dataImg = [];
    for (let i = 0; i < data.length; i++) {
      dataImg.push(data[i].characters.at(-3).replace(/[^0-9]+/g, ""));
      dataImg.push(data[i].characters.at(-2).replace(/[^0-9]+/g, ""));
      dataImg.push(data[i].characters.at(-1).replace(/[^0-9]+/g, ""));
    }

    const divs = $$(".cardEpisode .imgEpisodes img");
    for (let j = 0; j < divs.length; j++) {
      divs[j].src = `https://rickandmortyapi.com/api/character/avatar/${dataImg[j]}.jpeg`;
    }
  }
}

//character/avatar/1.jpeg
