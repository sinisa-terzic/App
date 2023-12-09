let carousel = document.querySelector('.carousel');
const scene = document.querySelector('.scene');
const cells = carousel.querySelectorAll('.carousel__cell');
const cellElements = Array.from(cells);
const cellCount = cellElements.length;
let selectedIndex = 0;
let isPlaying = false;
let rotationInterval;
let cellSize = 190; // Širina ili visina pojedinačnog elementa
const gapSize = 6; // Razmak između elemenata
const isHorizontal = true;
const rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
let radius, theta;

// Prilagodi dimenzije prema visini prozora pomoću JavaScript-a
function setDimensions() {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if (viewportHeight <= 600) {
        cellSize = 150; // Prilagodite dimenzije prema potrebi
        scene.classList.remove('medium-screen', 'large-screen');
    } else if (viewportWidth > 400) {
        cellSize = 220; // Prilagodite dimenzije prema potrebi
        // scene.classList.remove('medium-screen');
        // scene.classList.add('large-screen');
    } else {
        cellSize = 190; // Vratite na osnovnu vrednost
    }

    changeCarousel(); // Ponovo postavite dimenzije karusela
}

document.addEventListener('DOMContentLoaded', function () {
    setDimensions(); // Postavi dimenzije kada se stranica učita
    startRotation();
});

window.addEventListener('resize', setDimensions);

function rotateCarousel() {
    var angle = theta * (selectedIndex + 0.01) * -1;
    carousel.style.transform = 'translateZ(' + -radius + 'px) ' +
        rotateFn + '(' + angle + 'deg)';
}

function changeCarousel() {
    theta = 360 / cellCount;
    radius = Math.round((cellSize / 2 + gapSize) / Math.tan(Math.PI / cellCount));
    for (var i = 0; i < cellElements.length; i++) {
        var cell = cellElements[i];
        if (i < cellCount) {
            var cellAngle = theta * i;
            cell.style.transform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
        }
    }
    rotateCarousel();
}

///////////////////////////////////////////////////////////////////
// pokreće automatsku rotaciju karusela
function startRotation() {
    isPlaying = true;
    // Odmah povećajte selectedIndex i ažurirajte karusel
    selectedIndex++;
    changeCarousel();
    stop.classList.remove('noneDisplay');
    play.classList.add('noneDisplay');
    rotationInterval = setInterval(function () {
        selectedIndex++;
        changeCarousel();
    }, 3000); // Rotacija svakih 3 sekunde
}

///////////////////////////////////////////////////////////////////
// zaustavlja automatsku rotaciju karusela
function stopRotation() {
    isPlaying = false;
    clearInterval(rotationInterval);
    stop.classList.add('noneDisplay');
    play.classList.remove('noneDisplay');
}

///////////////////////////////////////////////////
// Klik događaj za svaku ćeliju i dodela active Dodajte klik događaj za svaku ćeliju
cells.forEach(function (cell, index) {
    cell.addEventListener('click', function () {
        // Uklonite klasu "active" sa svih ćelija
        cells.forEach(function (cell) {
            cell.classList.remove('active');

        });

        // Dodelite klasu "active" kliknutoj ćeliji
        cell.classList.add('active');
        container.classList.remove('opacity');
        // Za animaciju
        container.classList.add('active-item');
        setTimeout(() => {
            container.classList.remove('active-item');
        }, 50);

        description.classList.remove('noneDisplay');
        category.classList.add('noneDisplay');
        info.classList.add('translateY');

        selectedIndex = index;
        // Rotirajte karusel kako biste postavili kliknutu ćeliju u centar
        rotateCarousel();

        stop.classList.add('noneDisplay');
        play.classList.remove('noneDisplay');
        stopRotation()

    });
});


///////////////////////////////////////////////////////
// Rotacija pokretom ruke
let animationFrame;
let isDragging = false;
const isTouchDevice = 'ontouchstart' in document.documentElement;
const startEvent = isTouchDevice ? 'touchstart' : 'mousedown';
const moveEvent = isTouchDevice ? 'touchmove' : 'mousemove';
const endEvent = isTouchDevice ? 'touchend' : 'mouseup';

carousel.addEventListener('touchstart', function (e) {
    isDragging = true;
    startX = e.touches[0].clientX;
    previousX = startX;
    cancelAnimationFrame(animationFrame);
    isAnimating = false;
});

document.addEventListener('touchmove', function (e) {
    if (isDragging) {
        const clientX = e.touches[0].clientX;
        diffX = clientX - startX;

        // Postavljanje maksimalne brzine rotacije
        const maxSpeed = 0;

        if (Math.abs(diffX) > cellSize / 2) {
            // Prilagodba na maksimalnu brzinu
            const adjustedDiffX = Math.min(Math.abs(diffX), maxSpeed) * Math.sign(diffX);
            selectedIndex += adjustedDiffX;
            startX = clientX;
            changeCarousel();
        }

        // Dodatna provjera za horizontalni swipe
        const threshold = 50;

        if (Math.abs(diffX) > threshold) {
            // Promijenite selectedIndex na temelju pomaka miša
            if (diffX < 0) {
                selectedIndex++;
                console.log('Swipe left');
            } else {
                selectedIndex--;
                console.log('Swipe right');
            }

            startX = clientX;
            changeCarousel();
            stop.classList.add('noneDisplay');
            play.classList.remove('noneDisplay');
            stopRotation();
        }
    }
});

carousel.addEventListener('touchend', function () {
    isDragging = false;
});


function animateCarousel(targetIndex) {
    // Interpolacija prema ciljnom indeksu
    selectedIndex += (targetIndex - selectedIndex) * 0.1;

    // Pozivanje funkcije za promjenu carousel-a
    changeCarousel();

    // Provjera uvjeta za završetak animacije
    if (Math.abs(targetIndex - selectedIndex) > 0.01) {
        animationFrame = requestAnimationFrame(() => animateCarousel(targetIndex));
    } else {
        isAnimating = false;
    }
}


//////////////////////////////////////////////////////
// Pokreni rotaciju
const play = document.querySelector('.play');
play.addEventListener('click', function () {
    startRotation();
    play.classList.add('noneDisplay');
    // var stop = document.querySelector('.stop');
    stop.classList.remove('noneDisplay');
});

//////////////////////////////////////////////////////
// Stopiraj rotaciju
const stop = document.querySelector('.stop');
stop.addEventListener('click', function () {
    stopRotation();
    stop.classList.add('noneDisplay');
    // var play = document.querySelector('.play');
    play.classList.remove('noneDisplay');
});


//////////////////////////////////////////////////////
// Dodajte klik događaj za dugme za prethodnu ćeliju
const prevButton = document.querySelector('.previous-button');
prevButton.addEventListener('click', function () {
    selectedIndex--;
    changeCarousel();
});

// Dodajte event listenere za touchstart i touchend događaje
prevButton.addEventListener('touchstart', function () {
    // Funkcija koja se poziva kada se touchstart događa
    touchInterval = setInterval(function () {
        selectedIndex--;
        changeCarousel();
        stopRotation();
    }, 1000); // Promenite vreme intervala prema vašim potrebama
});

prevButton.addEventListener('touchend', function () {
    // Funkcija koja se poziva kada se touchend događa
    clearInterval(touchInterval);
});

//////////////////////////////////////////////////////
// Dodajte klik događaj za dugme za sledeću ćeliju
const nextButton = document.querySelector('.next-button');
nextButton.addEventListener('click', function () {
    selectedIndex++;
    changeCarousel();
});

// Dodajte event listenere za touchstart i touchend događaje
nextButton.addEventListener('touchstart', function () {
    // Funkcija koja se poziva kada se touchstart događa
    touchInterval = setInterval(function () {
        selectedIndex++;
        changeCarousel();
        stopRotation();
    }, 1000); // Promenite vreme intervala prema vašim potrebama
});

nextButton.addEventListener('touchend', function () {
    // Funkcija koja se poziva kada se touchend događa
    clearInterval(touchInterval);
});


// changeCarousel();
