export const API_URL = 'https://rickandmortyapi.com/api/'

export async function getData(type) {
    try {
        const API = await fetch(`${API_URL}${type}`)
        const DATA = await API.json()
        return DATA
    } catch (error) {
        console.log(`Error: ${error} : ${type}`);
    }
}