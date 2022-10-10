import { API_URL } from "./getData.js";
import { getData } from "./getData.js";
import { renderData } from "../render/renderData.js";
import { type } from '../main.js'

export async function getDataPreview() {
    let allData = await getData(type);
    const min = 1;
    const max = allData.info.pages;
    const numRandom = Math.round(Math.random() * (max - min) + min);
    let data = await getData(`${type}/?page=${numRandom}`)
    renderData(data.results)
}
