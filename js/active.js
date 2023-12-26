///////////////////////////////////////////////////////////
// change color
const switcherHeader = document.querySelector('.header');
const switcherInfo = document.querySelector('.info');
const callUs_btnList = document.querySelector('.callUs_btnList');
const callUs_btnImg = document.querySelector('.callUs_btnImg');
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
    changeDescriptionColors();
    switcher.classList.remove('translateX');
    darkOpen.classList.add('noneDisplay');
    checkbox_2.checked = false;
});

switcher_blue.addEventListener('click', function () {
    saveColorPreference('blue');
    setColorPreference('blue');
    changeBackgroundColors();
    changeDescriptionColors();
    switcher.classList.remove('translateX');
    darkOpen.classList.add('noneDisplay');
    checkbox_2.checked = false;
});

switcher_brown.addEventListener('click', function () {
    saveColorPreference('brown');
    setColorPreference('brown');
    changeBackgroundColors();
    changeDescriptionColors();
    switcher.classList.remove('translateX');
    darkOpen.classList.add('noneDisplay');
    checkbox_2.checked = false;
});

switcher_middle.addEventListener('click', function () {
    saveColorPreference('middle');
    setColorPreference('middle');
    changeBackgroundColors();
    changeDescriptionColors();
    switcher.classList.remove('translateX');
    darkOpen.classList.add('noneDisplay');
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


function changeDescriptionColors() {
    // Izaberite sve p tagove sa klasom 'cost'
    const costElements = document.querySelectorAll('.description_content');

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

// Funkcija koja se poziva kada se klikne na ćeliju i kreira se dataContainer
function onDataContainerCreated() {
    // Odabir svih slika unutar dataContainer-a
    const imagesInDataContainer = document.querySelectorAll('.itemDiv img');

    // Postavljanje event listenera za svaku sliku
    imagesInDataContainer.forEach(function (img) {
        img.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });

        // Kreiranje nove slike da bi se dobile stvarne dimenzije
        var temporaryImage = new Image();
        temporaryImage.src = img.src;

        // Postavljanje dimenzija nakon što se slika učita
        temporaryImage.onload = function () {
            // Postavljanje width i height atributa za sliku
            img.setAttribute('width', temporaryImage.width);
            img.setAttribute('height', temporaryImage.height);
        };
    });
}

// Ovo pozivamo kada se kreira dataContainer
// onDataContainerCreated();






