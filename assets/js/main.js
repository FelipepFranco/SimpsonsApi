// CONFIGURAÇÕES DA PAGINA
    const links = document.querySelectorAll('.nav-item');

    links.forEach(link => {
        link.addEventListener('click', function() {
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });