import { $ } from "../helpers/selector.js";
import { getData } from "../getDataAPI/getData.js";
import { type } from "../main.js";
import { renderData } from "../render/renderData.js";
export async function search (data) {
    let result = await getData(`${type}/?name=${data}`)
    renderData(result.results);
}
