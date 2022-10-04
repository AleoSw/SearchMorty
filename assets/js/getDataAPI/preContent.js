import { API_URL } from "./getData.js";
import { getData } from "./getData.js";
import { renderData } from "../render/renderData.js";

let allData = await getData(`character`);

export async function getDataPreview() {
    const min = 1;
    const max = allData.info.pages;
    const numRandom = Math.round(Math.random() * (max - min) + min);
    let data = await getData(`character/?page=${numRandom}`)
    renderData(data.results)
}
