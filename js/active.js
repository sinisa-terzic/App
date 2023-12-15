///////////////////////////////////////////////////////////
// change color
const switcherHeader = document.querySelector('.header');
const switcherInfo = document.querySelector('.info');
const switcher_dark = document.querySelector('#switcher_dark');
const switcher_blue = document.querySelector('#switcher_blue');
const switcher_brown = document.querySelector('#switcher_brown');
const switcher_middle = document.querySelector('#switcher_middle');


// Funkcija za postavljanje izabrane boje u lokalnom skladištu
function saveColorPreference(color) {
    localStorage.setItem('colorPreference', color);
}

// Funkcija za učitavanje izabrane boje iz lokalnog skladišta
function loadColorPreference() {
    return localStorage.getItem('colorPreference');
}

// Funkcije za postavljanje boje na osnovu izabrane vrednosti
function setColorPreference(color) {
    switcherHeader.classList.remove('switcher_dark', 'switcher_blue', 'switcher_brown', 'switcher_middle');
    switcherInfo.classList.remove('switcher_dark', 'switcher_blue', 'switcher_brown', 'switcher_middle');

    switch (color) {
        case 'dark':
            switcherHeader.classList.add('switcher_dark');
            switcherInfo.classList.add('switcher_dark');
            break;
        case 'blue':
            switcherHeader.classList.add('switcher_blue');
            switcherInfo.classList.add('switcher_blue');
            break;
        case 'brown':
            switcherHeader.classList.add('switcher_brown');
            switcherInfo.classList.add('switcher_brown');
            break;
        case 'middle':
            switcherHeader.classList.add('switcher_middle');
            switcherInfo.classList.add('switcher_middle');
            break;
        default:
            // Ako nema odgovarajuće vrednosti, možete postaviti podrazumevanu boju
            setColorPreference('dark');
            break;
    }
}

// Dodajte Event Listener-e na dugmad za promenu boje
switcher_dark.addEventListener('click', function () {
    saveColorPreference('dark');
    setColorPreference('dark');
    changeBackgroundColors();
    switcher.classList.remove('translateX');
    darkOpen.classList.remove('visibility');
    checkbox_2.checked = false;
});

switcher_blue.addEventListener('click', function () {
    saveColorPreference('blue');
    setColorPreference('blue');
    changeBackgroundColors();
    switcher.classList.remove('translateX');
    darkOpen.classList.remove('visibility');
    checkbox_2.checked = false;
});

switcher_brown.addEventListener('click', function () {
    saveColorPreference('brown');
    setColorPreference('brown');
    changeBackgroundColors();
    switcher.classList.remove('translateX');
    darkOpen.classList.remove('visibility');
    checkbox_2.checked = false;
});

switcher_middle.addEventListener('click', function () {
    saveColorPreference('middle');
    setColorPreference('middle');
    changeBackgroundColors();
    switcher.classList.remove('translateX');
    darkOpen.classList.remove('visibility');
    checkbox_2.checked = false;
});


// Funkcija za promenu boje pozadine svih p tagova sa klasom 'cost'
function changeBackgroundColors() {
    // Izaberite sve p tagove sa klasom 'cost'
    const costElements = document.querySelectorAll('.cost');

    // Proverite izabranu boju i primenite odgovarajuću klasu na svaki element
    const savedColorPreference = loadColorPreference();

    costElements.forEach(function (costElement) {
        // Uklonite sve prethodne klase boje
        costElement.classList.remove('switcher_dark', 'switcher_blue', 'switcher_brown', 'switcher_middle');

        switch (savedColorPreference) {
            case 'dark':
                costElement.classList.add('switcher_dark');
                break;
            case 'blue':
                costElement.classList.add('switcher_blue');
                break;
            case 'brown':
                costElement.classList.add('switcher_brown');
                break;
            case 'middle':
                costElement.classList.add('switcher_middle');
                break;
            default:
                // Ako nema odgovarajuće vrednosti, možete postaviti podrazumevanu boju
                costElement.classList.add('switcher_dark');
                break;
        }
    });
}


// Pozovite funkciju prilikom promene boje ili drugih relevantnih događaja
// Na primer, možete je pozvati prilikom promene boje klikom na dugmad switcher_dark, switcher_light, switcher_middle itd.



// Učitajte izabrane boje prilikom pokretanja skripte
document.addEventListener("DOMContentLoaded", function () {
    const savedColorPreference = loadColorPreference();
    if (savedColorPreference) {
        setColorPreference(savedColorPreference);
        // Ostavite poziv funkcije za promenu boje ovdje kako biste primenili boje prilikom učitavanja skripte
        // changeBackgroundColors();
    }
});


/* const container = document.querySelector('.content-container');
const description = document.querySelector('.description_content');
const category = document.querySelector('.category');
const info = document.querySelector('.info');

///////////////////////////////////////////////////////
//
const headerLogo = document.querySelector('.headerLogo')
headerLogo.addEventListener('click', function () {
    cells.forEach(function (cell) {
        cell.classList.remove('active');
    });
    // Obrišite sve prethodne <div> elemente sa podacima
    const existingDataDivs = container.querySelectorAll('.descriptionParagraph');
    existingDataDivs.forEach(function (element) {
        element.innerHTML = '';
    });

    container.classList.add('opacity');
    description.classList.add('noneDisplay');
    category.classList.remove('noneDisplay');
    info.classList.remove('translateY');
    setting_box.classList.remove('translateX');
    darkOpen.classList.remove('visibility');
}); */


///////////////////////////////////////////////////////////
// stop selected image
document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
    // Create a new image to get the real dimensions
    var temporaryImage = new Image();
    temporaryImage.src = img.src;

    // Set dimensions after the image is loaded
    temporaryImage.onload = function () {
        // Set width and height attributes for the image
        img.setAttribute('width', temporaryImage.width);
        img.setAttribute('height', temporaryImage.height);
    };

});




