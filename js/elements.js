document.addEventListener("DOMContentLoaded", function () {
    function setSectionHeights() {
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const margin = 10;

        // Visina headera
        const headerHeight = document.getElementById('header').offsetHeight;

        // Visina karusela
        const carouselHeight = document.getElementById('carousel').offsetHeight;

        // Visina karusela
        const chooseBox = document.getElementById('chooseBox').offsetHeight;

        // Izračun preostale visine za info sekciju
        const infoHeight = viewportHeight - headerHeight - carouselHeight - chooseBox;
        // const infoHeight = 65.6;

        // Visina data sekcije
        const dataHeight = viewportHeight - headerHeight - carouselHeight - 2 * margin;
        // const dataHeight = 67.36;


        // Postavite visinu info sekcije
        document.getElementById('info').style.height = infoHeight + 'px';

        document.getElementById('data').style.height = dataHeight + 'px';
        document.getElementById('data').style.marginTop = margin + 'px';
        document.getElementById('data').style.marginBottom = margin + 'px';
    }

    // Disable pull-to-refresh if overscroll occurs
    window.addEventListener('touchmove', function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });

    // Restore normal touchmove behavior after pull-to-refresh completes
    window.addEventListener('touchend', function () {
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 0);
    });


    // Provjera horizontalnog ili uspravnog položaja ekrana
    function provjeriPoložajEkrana() {
        if (window.innerWidth > window.innerHeight) {
            console.log("Horizontalni položaj ekrana.");
        } else {
            console.log("Uspravni položaj ekrana.");
            window.addEventListener('load', setSectionHeights);
        }
    }
    // Poziv funkcije pri učitavanju stranice
    provjeriPoložajEkrana();
    // Sluša promjene veličine prozora
    window.addEventListener("resize", provjeriPoložajEkrana);
});




