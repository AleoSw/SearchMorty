const app = document.querySelector('#app')
const apiUrl = 'https://rickandmortyapi.com/api/character/'
const container = document.querySelector('#characters')
const containerPagination = document.querySelector('.pagination .buttons')
const fragment = document.createDocumentFragment()
const templateModal = document.querySelector('#teplateModal')
const templateCards = document.querySelector('#templateCard')
const form = document.querySelector('#form')
const inputSearch = document.querySelector('#searchInput')
const btnSubmit = document.querySelector('#btnSubmit')

const previewPage = async () => {
    const min = 1
    const max = 42
    const numRandom = Math.round(Math.random()*(max - min) + min)
    const API_URL = await fetch(apiUrl + '?page=' + numRandom)
    const data = await API_URL.json()
    const dataResults = data.results
    renderCharacters(dataResults)
}

window.addEventListener('load', () => {
    previewPage()
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const search = inputSearch.value
    if(inputSearch.value.length > 0) {
        getData(search)
    } else if (inputSearch.value === '') {
        createModal('noData')
	previewPage()
        containerPagination.innerHTML = ''
    }
})

const createModal = (status) => {
    fragment.innerHTML = ''
    document.querySelector('body').style.overflow = "hidden"
    const clone = templateModal.content.cloneNode(true)
    if (status === 'noData') {
        clone.querySelector('h5').textContent = `Escribe el nombre del personaje que quieres buscar`
    } else if (status === 404) {
        clone.querySelector('h5').textContent = `Personaje no encontrado :/`
    }
    fragment.appendChild(clone)

    app.appendChild(fragment)

    document.querySelector('.btnClose').addEventListener('click', () => {
        const modal = document.querySelector('.newModal')
        app.removeChild(modal)
        document.querySelector('body').style.overflow = "auto"
    })
}

const getData = async (search) => {
    try {
        container.innerHTML = `<div class="spinner-border text-warning m-auto" role="status"></div>`
        const API_URL = await fetch(apiUrl + '?name=' + search)
        if (API_URL.status === 404) {
            createModal(404)
            previewPage()
        } else if (API_URL.status === 200) {
            const data = await API_URL.json()
            loadCharacters(data, search)
        } else {
            let unknownError = '<h5 class="text-light text-center">Error no identificado</h5>'
            container.innerHTML = unknownError
        }
    } catch (error) {
        console.log(error)
    } finally {
        console.log("Finalizo");
    }
}

const loadCharacters = (data, search) => {
    const dataResults = data.results 
    renderPagination(data.info.pages, search)
    renderCharacters(dataResults)
}

const renderNewPage = async (urlPage) => {
    fragment.innerHTML = ''
    container.innerHTML = ''
    console.log(urlPage);
    const dataResults = urlPage.results 
    console.log(dataResults);
    dataResults.map(item => {
        const clone = templateCards.content.cloneNode(true)
        clone.querySelector('img').setAttribute('src', `${item.image}`)
        clone.querySelector('img').setAttribute('alt', `Imagen de: ${item.name}`)
        clone.querySelector('h5').textContent = item.name
        clone.querySelector('span').textContent = item.status
        fragment.appendChild(clone)
    })
    container.appendChild(fragment)
}

const renderPagination = (numPages, search) => {
    containerPagination.innerHTML = ''
    fragment.innerHTML = ''
    for (let i = 0; i < numPages; i++) {
        const btnPage = document.createElement('button')
        btnPage.setAttribute('class', 'btn btn-outline-warning')
        btnPage.textContent = (i + 1)
        btnPage.setAttribute('data-link', `${apiUrl}?page=` + (i + 1) + `&` + `name=${search}`)
        fragment.appendChild(btnPage)
    }
    containerPagination.appendChild(fragment)
    const btnAll = document.querySelectorAll('.buttons .btn')
    useBtns(btnAll)
}

const renderCharacters = (dataResults) => {
    container.innerHTML = ''
    fragment.innerHTML = ''
    dataResults.map(item => {
        const clone = templateCards.content.cloneNode(true)
        clone.querySelector('img').setAttribute('src', `${item.image}`)
        clone.querySelector('img').setAttribute('alt', `Imagen de: ${item.name}`)
        clone.querySelector('h5').textContent = item.name
        clone.querySelector('span').textContent = item.status
        fragment.appendChild(clone)
    })
    container.appendChild(fragment)
}

const useBtns = (btnAll) => { 
    btnAll[0].setAttribute('class', 'btn bg-warning')    
    for (let j = 0; j < btnAll.length; j++) {
        btnAll[j].addEventListener('click', (e) => {
            for (var item of btnAll) {
                item.classList.remove('bg-warning')
                item.classList.add('btn-outline-warning')
            }
            btnAll[j].classList.remove('btn-outline-warning')
            btnAll[j].classList.add('bg-warning')

            const urlPage = btnAll[j].getAttribute('data-link')
           fetch(urlPage)
            .then(response => response.json())
                .then(data => {
                    renderNewPage(data)
                })
        })
    }
}















