import { $ } from "./helpers/selector.js"
import { navbar } from './navbar/navbar.js'
import { getDataPreview } from "./getDataAPI/preContent.js"
const app = $('.app')

app.addEventListener('click', e => {
    let target = e.target
    let targetDataset = e.target.dataset
    console.log(target);

    if (e.target.dataset.status === 'open') navbar(targetDataset.status)
    else if (targetDataset.status === 'close') navbar(targetDataset.status)
})

document.addEventListener('DOMContentLoaded', getDataPreview())







