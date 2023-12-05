let carousel = document.querySelector('.carousel');
const cells = carousel.querySelectorAll('.carousel__cell');
const cellElements = Array.from(cells);
const cellCount = cellElements.length;
let selectedIndex = 0;
let isPlaying = false;
let rotationInterval;
let cellSize = 200; // Širina ili visina pojedinačnog elementa
const gapSize = 5; // Razmak između elemenata
const isHorizontal = true;
const rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
let radius, theta;

// Prilagodi dimenzije prema visini prozora pomoću JavaScript-a
function setDimensions() {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    if (viewportHeight <= 570) {
        cellSize = 150; // Prilagodite dimenzije prema potrebi
    } else if (viewportHeight <= 680) {
        cellSize = 180; // Prilagodite dimenzije prema potrebi
    } else {
        cellSize = 200; // Vratite na osnovnu vrednost
    }
}

document.addEventListener('DOMContentLoaded', function () {
    setDimensions(); // Postavi dimenzije kada se stranica učita

    changeCarousel();
});


window.addEventListener('resize', setDimensions); // Pratite promene u veličini prozora

function rotateCarousel() {
    var angle = theta * selectedIndex * -1;
    carousel.style.transform = 'translateZ(' + -radius + 'px) ' +
        rotateFn + '(' + angle + 'deg)';
}


/* const radioButtons = document.querySelectorAll('.carousel_item_radio');

radioButtons.forEach(function (radio, index) {
    radio.addEventListener('click', function () {
        // Ažuriraj selectedIndex i promeni karausel
        selectedIndex = index;
        changeCarousel();
    });
}); */


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

function startRotation() {
    isPlaying = true;
    // Odmah povećajte selectedIndex i ažurirajte karusel
    selectedIndex++;
    changeCarousel();
    rotationInterval = setInterval(function () {
        selectedIndex++;
        changeCarousel();
    }, 3000); // Rotacija svakih 3 sekunde
}

const radioButtons = document.querySelectorAll('.carousel_item_radio');
const prevButton = document.querySelector('.previous-button');
const nextButton = document.querySelector('.next-button');

// Ažurirana logika za radio dugmad
radioButtons.forEach(function (radio, index) {
    radio.addEventListener('click', function () {
        // Ažuriraj selectedIndex i promeni karausel
        // selectedIndex = index;
        changeCarousel();
        checkRadioAtIndex(selectedIndex);
        console.log('klik')
    });
});

// Ažurirana logika za dugmad "prethodno" i "sledeće"
prevButton.addEventListener('click', function () {
    selectedIndex = (selectedIndex - 1 + cellCount) % cellCount;
    changeCarousel();
    checkRadioAtIndex(selectedIndex);
});

nextButton.addEventListener('click', function () {
    selectedIndex = (selectedIndex + 1) % cellCount;
    changeCarousel();
    checkRadioAtIndex(selectedIndex);
});

// Funkcija za proveru radio dugmeta na određenom indeksu
function checkRadioAtIndex(index) {
    radioButtons[index].checked = true;
}


let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
});

carousel.addEventListener('touchmove', function (e) {
    touchEndX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', function () {
    const touchDiff = touchEndX - touchStartX;

    if (touchDiff > 0) {
        // Povlačenje u desno, simuliraj klik na prethodno dugme
        prevButton.click();
    } else if (touchDiff < 0) {
        // Povlačenje u levo, simuliraj klik na sledeće dugme
        nextButton.click();
    }

    // Resetuj vrednosti za sledeći put
    touchStartX = 0;
    touchEndX = 0;
});

