

const searchForm = document.getElementById('search-form');
const input = document.getElementById('searchInput'); // Corrigido o ID

const getDadosAPI = async function () {
    let url = `https://apisimpsons.fly.dev/api/personajes?limit=680&page=1`

    const response = await fetch(url)
    const dados = await response.json()
    const objDados = dados.docs
    return objDados
}

const searchCard = async (dados) => {
const dadosSearch = [];

dados.forEach(async function (card) {
if (card.Nombre.toLowerCase().includes(input.value.toLowerCase())) {
    dadosSearch.push(card);
}
});

criarCards(dadosSearch);
};

// Adicione um event listener para o input que executa a busca automaticamente
input.addEventListener('input', async () => {
    const dados = await getDadosAPI();
    if (input.value.trim() !== "") {
        searchCard(dados);
    } else {
        criarCards(dados);
    }
});


const criarCards = function (dadosAPI) {
    while (charactersContainer.firstChild) {
        charactersContainer.removeChild(charactersContainer.firstChild);
    }

    dadosAPI.forEach(function (card) {
        let cardHTML = `
            <div class="card">
                <img src="${card.Imagen}" alt="${card.Imagen}">
                <h2>${card.Nombre}</h2>
            </div>
        `;
        const cardElement = document.createElement('div');
        cardElement.innerHTML = cardHTML;
        cardElement.addEventListener('click', () => {
            openModal(card);
        });
        charactersContainer.appendChild(cardElement);
    });
};

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const dados = await getDadosAPI();
    searchCard(dados);
});

searchButton.addEventListener('click', async () => {
    const dados = await getDadosAPI();
    searchCard(dados);
});