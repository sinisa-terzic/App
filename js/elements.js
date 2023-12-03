/* function setSectionHeights() {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    // Visina headera
    const headerHeight = document.getElementById('header').offsetHeight;

    // Visina karusela
    const carouselHeight = document.getElementById('carousel').offsetHeight;

    // Izračun preostale visine za info sekciju
    const infoHeight = viewportHeight - headerHeight - carouselHeight;

    // Postavite visinu info sekcije
    document.getElementById('info').style.height = infoHeight + 'px';
}

// Pozovi funkciju kada se stranica učita
window.addEventListener('load', setSectionHeights);

// Dodaj događaj za ponovno postavljanje dimenzija kada se prozor promeni
window.addEventListener('resize', setSectionHeights); */


function setSectionHeights() {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const margin = 10;

    // Visina headera
    const headerHeight = document.getElementById('header').offsetHeight;

    // Visina karusela
    const carouselHeight = document.getElementById('carousel').offsetHeight;

    // Izračun preostale visine za info sekciju
    const infoHeight = viewportHeight - headerHeight - carouselHeight;

    // Visina data sekcije
    const dataHeight = viewportHeight - headerHeight - carouselHeight - 2 * margin;


    // Postavite visinu info sekcije
    document.getElementById('info').style.height = infoHeight + 'px';

    document.getElementById('data').style.height = dataHeight + 'px';
    document.getElementById('data').style.marginTop = margin + 'px';
    document.getElementById('data').style.marginBottom = margin + 'px';
}

// Pozovi funkciju kada se stranica učita
window.addEventListener('load', setSectionHeights);

// Dodaj događaj za ponovno postavljanje dimenzija kada se prozor promeni
window.addEventListener('resize', setSectionHeights);
