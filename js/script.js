let carousel = document.querySelector('.carousel');
const cells = carousel.querySelectorAll('.carousel__cell');
const dataContainer = document.querySelector('.data-container');
const headerLogo = document.querySelector('.headerLogo');
const cellElements = Array.from(cells); // Pretvorite NodeList u niz
const cellCount = cellElements.length; // Broj ćelija
let selectedIndex = 0;
let isPlaying = false; // Da biste pratili stanje animacije
let rotationInterval;
const cellWidth = carousel.offsetWidth;
const cellHeight = carousel.offsetHeight;
const isHorizontal = true;
const rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
let radius, theta;



///////////////////////////////////////////////////////////////////
// Pokreni rotaciju karusela po učitavanju stranice
document.addEventListener('DOMContentLoaded', function () {
  startRotation();
});


///////////////////////////////////////////////////////////////////
//
/* Kratko objašnjenje funkcije:
Ova funkcija se poziva kako bi se izvršila rotacija karusela. Varijabla theta predstavlja ugao izražen u stepenima, a selectedIndex je indeks trenutno izabranog elementa u karuselu. Funkcija izračunava željeni ugao rotacije (angle) i postavlja CSS transformaciju translateZ i rotateFn (verovatno rotateY ili rotateX u zavisnosti od postavki) kako bi izvršila rotaciju karusela.
*/
function rotateCarousel() {
  var angle = theta * selectedIndex * -1;
  carousel.style.transform = 'translateZ(' + -radius + 'px) ' +
    rotateFn + '(' + angle + 'deg)';
}


///////////////////////////////////////////////////////////////////
//
/* Kratko objašnjenje funkcije:
Ova funkcija postavlja početne postavke karusela i primenjuje transformacije na svaki od elemenata u karuselu. Ona izračunava vrednosti kao što su theta (ugao između svaka dva uzastopna elementa), cellSize (širina ili visina pojedinačnog elementa, zavisno od orijentacije), i radius (udaljenost između središta karusela i svakog od elemenata). Zatim prolazi kroz sve elemente karusela i postavlja njihove transformacije tako da se pravilno rasporede u 3D prostoru. Na kraju poziva rotateCarousel() kako bi izvršila rotaciju karusela.
*/
function changeCarousel() {
  theta = 360 / cellCount;
  var cellSize = isHorizontal ? cellWidth : cellHeight;
  radius = Math.round((cellSize / 2) / Math.tan(Math.PI / cellCount));
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
/* Kratko objašnjenje funkcije: 
Postavlja promenljivu isPlaying na true. Ova promenljiva se često koristi da bi se pratilo da li se karusel trenutno automatski rotira.
Povećava vrednost selectedIndex za 1. Ova vrednost se verovatno koristi da označi koji element u karuselu trenutno treba biti u centru ili u fokusu.
Poziva funkciju changeCarousel() kako bi ažurirala transformacije karusela na osnovu promenjenog selectedIndex.
Postavlja intervalnu funkciju koja će svakih 3000 milisekundi (3 sekunde) povećavati selectedIndex i ažurirati karusel, čime se postiže efekat rotacije. Intervalna funkcija se čuva u promenljivoj rotationInterval.
 */
function startRotation() {
  isPlaying = true;
  // Odmah povećajte selectedIndex i ažurirajte karusel
  selectedIndex++;
  changeCarousel();
  rotationInterval = setInterval(function () {
    selectedIndex++;
    changeCarousel();
  }, 3000); // Rotacija svakih 3 sekunde
  stop.classList.remove('noneDisplay');
  play.classList.add('noneDisplay');
}


///////////////////////////////////////////////////////////////////
// zaustavlja automatsku rotaciju karusela
/* Kratko objašnjenje funkcije: 
Postavlja promenljivu isPlaying na false. Ovo signalizira da karusel trenutno ne rotira automatski.
Koristi funkciju clearInterval() da bi prekinula intervalnu funkciju koja je pokrenuta sa setInterval(). Ova funkcija prima kao argument identifikator intervalne funkcije (rotationInterval), čime se prekida automatska rotacija karusela koja je bila pokrenuta startRotation() funkcijom.
 */
function stopRotation() {
  isPlaying = false;
  clearInterval(rotationInterval);
  stop.classList.add('noneDisplay');
  play.classList.remove('noneDisplay');
}


//////////////////////////////////////////////////////
// Pokreni rotaciju
const play = document.querySelector('.play');
play.addEventListener('click', () => {
  startRotation();
});


//////////////////////////////////////////////////////
// Stopiraj rotaciju
const stop = document.querySelector('.stop');
stop.addEventListener('click', () => {
  stopRotation();
});


//////////////////////////////////////////////////////
// Dodajte klik događaj za dugme za prethodnu ćeliju
const prevButton = document.querySelector('.previous-button');
prevButton.addEventListener('click', () => {
  selectedIndex--;
  changeCarousel();
  stopRotation();
});


//////////////////////////////////////////////////////
// Dodajte klik događaj za dugme za sledeću ćeliju
const nextButton = document.querySelector('.next-button');
nextButton.addEventListener('click', () => {
  selectedIndex++;
  changeCarousel();
  stopRotation();
});


///////////////////////////////////////////////////
// 
// const languageSetting = document.querySelector('.languageBox');
// const darkOpen = document.querySelector('.dark')

// function toggleAlertTheme() {
//   // setting_box.classList.toggle('translateX');
//   // alertThemeElement.classList.toggle('settingBoxOpen');
//   darkOpen.classList.toggle('visibility');
//   // languageBox.classList.remove("noneDisplay");
//   // languageBox.classList.add("noneDisplay");

//   /*  stop.classList.add('noneDisplay');
//    play.classList.remove('noneDisplay');
//    stopRotation();
//    selectFirstCell(); */
// }

// // darkOpen.addEventListener('click', toggleAlertTheme);
// languageSetting.addEventListener('click', toggleAlertTheme);

// // languageSetting.addEventListener('click', () => {
// //   darkOpen.classList.toggle('visibility');
// // });


///////////////////////////////////////////////////////
//
headerLogo.addEventListener('click', function () {
  cells.forEach(function (cell) {
    cell.classList.remove('active');
  });

  // Očistimo sadržaj kontejnera
  const dataContainer = document.getElementById('data');
  dataContainer.classList.add('noneDisplay');
  dataContainer.innerHTML = '';

  const infoDiv = document.querySelector('.info');
  infoDiv.classList.remove('noneDisplay');

  // Ponovo proverite i prikažite/uklonite "Izaberite kategoriju" info div
  // checkAndDisplayInfo();
});


//////////////////////////////////////////////////////
//
/* function checkAndDisplayInfo() {
  const activeCells = document.querySelectorAll('.active');
  let infoDiv = document.querySelector('.info');

  if (activeCells.length === 0) {
    // Nijedna ćelija nema klasu "active", prikažite poruku
    if (!infoDiv) {
      infoDiv = document.createElement('div');
      infoDiv.classList.add('info');
      infoDiv.innerHTML = '<p class="category" data-translation-key="category">Choose category</p>';
      infoDiv.innerHTML += '<p class="logo" data-translation-key="logo">Logo</p>';
      infoDiv.innerHTML += '<p class="info_content" data-translation-key="info_content">Informacije</p>';

      dataContainer.appendChild(infoDiv);
    }
  } else {
    // Postoji ćelija sa klasom "active", uklonite poruku
    if (infoDiv) {
      infoDiv.remove();
    }
  }
}

// Pozovite funkciju kada se stranica učita
checkAndDisplayInfo(); */


///////////////////////////////////////////////////////
//
let isDragging = false;
let startX, diffX, previousX;

// Determine the event names based on whether it's a carousel or not
const startEvent = carousel ? 'touchstart' : 'mousedown';
const moveEvent = carousel ? 'touchmove' : 'mousemove';
const endEvent = carousel ? 'touchend' : 'mouseup';

// Add event listener for the start event
carousel.addEventListener(startEvent, function (e) {
  isDragging = true;
  startX = carousel ? e.touches[0].clientX : e.clientX;
  previousX = startX;
});

// Add event listener for the move event
carousel.addEventListener(moveEvent, function (e) {
  if (isDragging) {
    const clientX = carousel ? e.changedTouches[0].clientX : e.clientX;
    diffX = clientX - startX;

    // Change selectedIndex based on mouse movement
    if (Math.abs(diffX) > cellWidth / 2) {
      if (diffX < 0) {
        selectedIndex += 1;
        console.log('aaa');
      } else {
        selectedIndex -= 1;
        console.log('bbb');
      }
      startX = clientX;
      changeCarousel();
    }

    stopRotation();
  }
});

