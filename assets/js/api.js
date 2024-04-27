const charactersContainer = document.getElementById('characters');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
let currentPage = 1;

function getData(page) {
    const apiUrl = `https://apisimpsons.fly.dev/api/personajes?limit=8&page=${page}`;
    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => data.docs)
        .catch(error => {
            console.error('Erro ao obter dados da API:', error);
            return [];
        });
}

async function displayCharacters(page) {
    const characters = await getData(page);
    charactersContainer.innerHTML = '';
    characters.forEach(character => {
        const characterElement = document.createElement('div'); // Crie um novo elemento div para cada personagem
        characterElement.classList.add('card');
        characterElement.innerHTML = `
            <img src="${character.Imagen}" alt="${character.Imagen}">
            <h2>${character.Nombre}</h2>
        `;
        charactersContainer.appendChild(characterElement);
    });
}


nextButton.addEventListener('click', () => {
    currentPage++;
    displayCharacters(currentPage);
});

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayCharacters(currentPage);
    }
});

displayCharacters(currentPage);