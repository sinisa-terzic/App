///////////////////////////////////////////////////////////
// OPEN SETTING BOX
const manu_icon_open = document.querySelector('.manu_icon')
const setting_box = document.querySelector('.setting');
const settingTitle = document.querySelector('.settingTitle');
const manu_icon_clode = document.querySelector('.manu_icon_clode')
const darkOpen = document.querySelector('.dark')

function toggleAlertTheme() {
    setting_box.classList.toggle('translateX');
    // alertThemeElement.classList.toggle('settingBoxOpen');
    darkOpen.classList.toggle('visibility');
    languageBox.classList.add("noneDisplay");

    stop.classList.add('noneDisplay');
    play.classList.remove('noneDisplay');
    stopRotation();
    selectFirstCell();
}

manu_icon_open.addEventListener('click', toggleAlertTheme);
// settingButtonClose.addEventListener('click', toggleAlertTheme);
darkOpen.addEventListener('click', toggleAlertTheme);
settingTitle.addEventListener('click', toggleAlertTheme);



///////////////////////////////////////////////////////////
// change color
const switcherHeader = document.querySelector('.header');
const switcherInfo = document.querySelector('.info');
const switcher_dark = document.querySelector('#switcher_dark');
const switcher_light = document.querySelector('#switcher_light');
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
    switcherHeader.classList.remove('switcher_dark', 'switcher_light', 'switcher_middle');
    switcherInfo.classList.remove('switcher_dark', 'switcher_light', 'switcher_middle');

    switch (color) {
        case 'dark':
            switcherHeader.classList.add('switcher_dark');
            switcherInfo.classList.add('switcher_dark');
            break;
        case 'light':
            switcherHeader.classList.add('switcher_light');
            switcherInfo.classList.add('switcher_light');
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
    setting_box.classList.remove('translateX');
    darkOpen.classList.remove('visibility');
});

switcher_light.addEventListener('click', function () {
    saveColorPreference('light');
    setColorPreference('light');
    changeBackgroundColors();
    setting_box.classList.remove('translateX');
    darkOpen.classList.remove('visibility');
});

switcher_middle.addEventListener('click', function () {
    saveColorPreference('middle');
    setColorPreference('middle');
    changeBackgroundColors();
    setting_box.classList.remove('translateX');
    darkOpen.classList.remove('visibility');
});


// Funkcija za promenu boje pozadine svih p tagova sa klasom 'cost'
function changeBackgroundColors() {
    // Izaberite sve p tagove sa klasom 'cost'
    const costElements = document.querySelectorAll('.cost');

    // Proverite izabranu boju i primenite odgovarajuću klasu na svaki element
    const savedColorPreference = loadColorPreference();

    costElements.forEach(function (costElement) {
        // Uklonite sve prethodne klase boje
        costElement.classList.remove('switcher_dark', 'switcher_light', 'switcher_middle');

        switch (savedColorPreference) {
            case 'dark':
                costElement.classList.add('switcher_dark');
                break;
            case 'light':
                costElement.classList.add('switcher_light');
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


///////////////////////////////////////////////////////
// Funkcija za postavljanje karusela na prvu ćeliju i za druge ćelije
function selectFirstCell() {
    const cells = document.querySelectorAll('.carousel__cell');

    /* if (cells.length > 0) {
        cells[0].click(); // Kliknite na prvu ćeliju
        console.log('Radi za prvu ćeliju');
    } */

    cells.forEach((cell, index) => {
        // cells[0].click(); // Kliknite na prvu ćeliju
        cell.addEventListener('click', () => {
            // console.log(`Kliknuli ste na ćeliju ${index + 1}`);
        });
    });

    // console.log('Radi');
}



const container = document.querySelector('.content-container');
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




