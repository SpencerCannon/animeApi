const url = 'http://localhost:3000'
const characterContainer = document.querySelector('.characterContainer'); 

let firstCreate = document.querySelector('.firstCreate'); 
let lastCreate = document.querySelector('.lastCreate'); 
let showCreate = document.querySelector('.showCreate');
let firstUpdate = document.querySelector('.firstUpdate'); 
let lastUpdate = document.querySelector('.lastUpdate'); 
let showUpdate = document.querySelector('.showUpdate');
let idUpdate = document.querySelector('.idUpdate'); 
let idDelete = document.querySelector('.idDelete'); 

const create = document.querySelector('.create'); 
const update = document.querySelector('.update'); 
const del = document.querySelector('.delete'); 
const form = document.querySelectorAll('form'); 


const getCharacters = () => {
    characterContainer.innerHTML = ""; 
    fetch(`${url}/characters`, {
        method: 'GET', 
    })
    .then((res) => res.json())
    .then((res) => res.forEach(el => {
        let row = document.createElement('h1'); 
  
        row.textContent = `${el.first} ${el.last} ${el.show} ${el.id}`

        characterContainer.prepend(row)
    }))
    .catch((err) => console.log(err))   
} 

const createCharacters = (first, last, show) => {
    console.log(first, last, show)
    let character = {
        first : firstCreate.value,  
        last: lastCreate.value,
        show: showCreate.value,
    }
  
    fetch(`${url}/characters`, {
        method: 'POST', 
        headers: {
            'Content-Type' : 'application/json', 
        }, 
        body: JSON.stringify(character) 
    })
    .catch((err) => console.log(err))

    getCharacters(); 
}

const updateCharacters = (first, last, show, id) => {
    let name = {
        first: firstUpdate.value, 
        last: lastUpdate.value,
        show: showUpdate.value,
    }
    
    fetch(`${url}/characters/${id}`, {
        method: 'PUT', 
        headers: {
            'Content-Type' : 'application/json', 
        }, 
        body: JSON.stringify(name) 
    })
    .catch((err) => console.log(err))

    getCharacters(); 
}

const deleteCharacters = (id) => {

    fetch(`${url}/characters/${id}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type' : 'application/json', 
        }
    })
    .catch((err) => console.log(err))

    getCharacters(); 
}

create.addEventListener('click', (e) => {
    e.preventDefault(); 
    createCharacters(firstCreate.value, lastCreate.value, showCreate.value);
})

update.addEventListener('click', (e) => {
    e.preventDefault(); 
    updateCharacters(firstUpdate.value, lastUpdate.value, showUpdate.value, idUpdate.value);
})

del.addEventListener('click', (e) => {
    e.preventDefault(); 
    deleteCharacters(idDelete.value);
})

getCharacters();