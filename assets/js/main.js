// Variaveis para as paginas
const menu = "menu";
const sinopse = "sinopse";
const personagens = "personagens";

// Função para carregar a página HTML
function carregarPaginaHTML(pagina) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById('main').innerHTML = this.responseText; // Alterado para 'main' em vez de 'content'
        }
    };
    xhttp.open('GET', pagina, true);
    xhttp.send();
}

// Função para carregar a página com base no parâmetro da URL
function carregarPagina(pagina) {
    // Carrega a página correspondente com base no parâmetro 'pagina'
    switch (pagina) {
        case `${menu}`:
            carregarPaginaHTML(`${menu}.html`);
            break;
        case `${sinopse}`:
            carregarPaginaHTML(`${sinopse}.html`);
            break;
        case `${personagens}`:
            carregarPaginaHTML(`${personagens}.html`);
            break;
        default:
            carregarPaginaHTML(`${menu}.html`);
    }
}

// Função para atualizar a URL sem recarregar a página
function atualizarURL(pagina) {
    const novaURL = `${window.location.pathname}?pagina=${pagina}`;
    history.pushState({pagina: pagina}, null, novaURL);
}

// Adiciona eventos de clique aos links do menu
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Evita o comportamento padrão de carregar a nova página

        const pagina = this.getAttribute('data-pagina');
        carregarPagina(pagina);
        atualizarURL(pagina);
    });
});

// Função para carregar a página ao carregar a página inicial
window.onload = function() {
    const parametros = new URLSearchParams(window.location.search);
    const pagina = parametros.get('pagina');
    carregarPagina(pagina);
};
