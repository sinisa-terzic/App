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

    stop.classList.add('noneDisplay');
    play.classList.remove('noneDisplay');
    stopRotation();
    selectFirstCell();
}

manu_icon_open.addEventListener('click', toggleAlertTheme);
// settingButtonClose.addEventListener('click', toggleAlertTheme);
darkOpen.addEventListener('click', toggleAlertTheme);
settingTitle.addEventListener('click', toggleAlertTheme);


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
});


///////////////////////////////////////////////////////////
// stop selected image
document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
});


