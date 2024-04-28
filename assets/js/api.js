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
        characterElement.addEventListener('click', () => {
            openModal(character);
        });
        charactersContainer.appendChild(characterElement);
    });
}

function openModal(character) {
    const modal = document.getElementById('myModal');
    const modalContent = document.getElementById('modal-characters');
    modalContent.innerHTML = `
        <div class="img-modal">
        <img src="${character.Imagen}" alt="${character.Imagen}">
        </div>
        <div class="info-modal">
        <h2>${character.Nombre}</h2>
        <p><strong>Genero:</strong> ${character.Genero}</p>
        <p><strong>Ocupación:</strong> ${character.Ocupacion}</p>
        <p><strong>História:</strong> ${character.Historia}</p>
        </div>
    `;
    modal.style.display = 'block';

    const closeButton = document.getElementsByClassName('close')[0];
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
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