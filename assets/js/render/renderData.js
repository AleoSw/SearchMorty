import { $ } from "../helpers/selector.js";
const containerResult = $('#resultsContainer .container .row')
const fragment = document.createDocumentFragment()
const templateCard = $('#cardTemplate')

export function renderData(data) {
    fragment.innerHTML = ''
    containerResult.innerHTML = ''
    data.map(item => {
        const clone = templateCard.content.cloneNode(true)
        clone.querySelector('.imgCard').setAttribute('src', `${item.image}`)
        clone.querySelector('.titleCard').textContent = `${item.name}`
        
        if (item.status === 'Alive') {
            clone.querySelector('#statusColor').classList.add('alive')
            clone.querySelector('.statusText').textContent = 'Alive'
        }
        else if (item.status === 'unknown') {
            clone.querySelector('#statusColor').classList.add('unknown')
            clone.querySelector('.statusText').textContent = 'Unknown'
        }
        else if (item.status === 'Dead') {
            clone.querySelector('#statusColor').classList.add('dead')
            clone.querySelector('.statusText').textContent = 'Dead'
        }
        clone.querySelector('.species').textContent = `${item.species}`
        
        fragment.appendChild(clone)
    })
    containerResult.appendChild(fragment)
}
