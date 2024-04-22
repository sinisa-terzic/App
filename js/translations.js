// Proverite da li postoji sačuvani jezik u localStorage
const savedLanguage = localStorage.getItem('selectedLanguage');

// Inicijalno postavite trenutni jezik na "sr" ako nije sačuvan
let currentLanguage = savedLanguage || 'sr';

const descriptionDiv = document.createElement('div');
descriptionDiv.classList.add('description_content')

const slogan = document.createElement('div');
slogan.classList.add('slogan')

// Funkcija za učitavanje prevoda za odabrani jezik
function loadTranslations(language) {
    const jsonFileName = `js/translations_${language}.json`;
    fetch(jsonFileName)
        .then(response => response.json())
        .then(data => {
            // Poziv funkcije za postavljanje prevoda
            setTranslations(data);
        })
        .catch(error => console.error('Greška pri preuzimanju prevoda:', error));
}


function setTranslations(translations) {
    const elementsWithTranslationKey = document.querySelectorAll('[data-translation-key]');

    elementsWithTranslationKey.forEach(element => {
        const translationKey = element.getAttribute('data-translation-key');

        if (translations.hasOwnProperty(translationKey)) {
            element.innerHTML = translations[translationKey];
        } else if (translations.hasOwnProperty('category') && translations.category.hasOwnProperty(translationKey)) {
            element.innerHTML = translations.category[translationKey];
        } else if (translations.hasOwnProperty('info') && translations.info.hasOwnProperty(translationKey)) {
            element.innerHTML = translations.info[translationKey];
        } else {
            console.warn(`Translation not found for key: ${translationKey}`);
            // console.log('Translations object:', translations);
        }
    });

    cells.forEach(function (cell, index) {
        cell.addEventListener('click', function () {

            cells.forEach(function (cell) {
                cell.classList.remove('active');
            });


            // Izvlačimo ime ćelije iz atributa data-translation-key
            const cellName = cell.querySelector('.food').getAttribute('data-translation-key');

            // Ažuriramo URL sa imenom ćelije
            window.location.hash = `#${cellName}`;


            dataContainer.style.opacity = 0;

            setTimeout(function () {
                dataContainer.style.opacity = 1;
                dataContainer.style.transition = 'all 0.05s ease';
            }, 250);


            // description_content.classList.remove('noneDisplay');
            categoy_description_box.classList.add('noneDisplay');
            cell.classList.add('active');
            selectedIndex = index;
            changeCarousel();
            stopRotation();

            dataContainer.scrollTop = 0;

            /* const activeCell = document.querySelector('.carousel__cell.active');
            if (activeCell) {
                dataContainer.style.opacity = 1;
                console.log('aktivna ćelija')
            } */


            // console.log('Klik na ćeliju sa indeksom:', index);


            infoDiv.classList.add('noneDisplay');

            call_us.classList.remove('noneDisplay');

            dataContainer.classList.remove('noneDisplay');
            dataItem.innerHTML = '';

            // Access data for the current index (index + 1 because indices in JavaScript start from 0)
            const currentData = translations['cat' + (index + 1)];


            // Postavljamo podatke u HTML unutar novog div-a
            descriptionDiv.innerHTML = `
                <div class="flex">
                    <img class="rotateImg" src="img/food/play.svg" alt="play">
                    <p class="summary">${currentData.details}</p>
                    <img class="dotsImg" src="img/menu/menu-icon_dots.svg" alt="play">
                </div>
                <p class="description noneDisplay">${currentData.description}</p>
            `;

            dataContainer.appendChild(descriptionDiv);


            // Iteriramo kroz sve objekte u currentData.menu
            currentData.translations.forEach((data, index) => {

                // Kreiramo novi div za svaki podatak
                const dataDiv = document.createElement('div');
                dataDiv.classList.add('itemDiv');

                // Postavljamo podatke u HTML unutar novog div-a
                dataDiv.innerHTML = `
                    <img class="dataImg" src="${data.imageSrc}" alt="${data.title_key}">
                    <div class="textContainerDiv">
                        
                        <div class="titleBox flex between">
                            <p class="title" data-translation-key="title_key">${data.title_key}</p>
                            
                            <!-- mjesto za čekboks -->
                            <svg class="plus" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 10 10" xml:space="preserve">
                                    <path class="st0" d="M10,5c0,0.5-0.5,1-1,1H6v3c0,0.5-0.5,1-1,1S4,9.5,4,9V6H1C0.5,6,0,5.5,0,5s0.5-1,1-1h3V1c0-0.5,0.5-1,1-1  s1,0.5,1,1v3h3C9.5,4,10,4.5,10,5z"></path>
                            </svg>

                        </div>
                        
                        <p class="periphrasis" data-translation-key="text_key">${data.text_key}</p>

                        <div class="costBox_1 flex x_end">
                            
                             <!-- mjesto za brojač -->
                        
                            <p class="cost" data-translation-key="cost_key">${data.cost_key}</p>
                        </div>
                    </div>
                `;

                // Dodajemo novi div u kontejner
                dataItem.appendChild(dataDiv);

                dataContainer.appendChild(dataItem);

                // Pozovite onDataContainerCreated nakon što su slike dodate u dataContainer. Kreirano u active.js 198
                onDataContainerCreated();

                // Kreiranje novog div-a za overlay
                const overlay = document.createElement('div');
                overlay.classList.add('overlay');
                overlay.classList.add('noneDisplay');

                overlay.innerHTML = `
                    <div class="backgroundDiv"></div>
                    <div class="descriptionDiv" data-id="uniqueId">

                        <div class="topDiv">
                            <img src="${data.imageSrc}" alt="${data.title_key}">
                        </div>

                        <div class="bottomDiv">

                            <!-- titleBox -->
                            <div class="flex between_center mtb-10">
                                <h1 class="title">${data.title_key}</h1>
                                <!-- costBox -->
                                <div class="costBox_2 flex between_center g-20">

                                    <!-- quantity
                                     <div class="flex between_center g-10">
                                        <button title="decrease font" class="quantity" data-action="decrease">
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 10 10" xml:space="preserve">
                                                <path d="M9,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h8c0.6,0,1,0.4,1,1S9.6,6,9,6z"></path>
                                            </svg>
                                        </button>
                                        <p class="quantityValue">0</p>
                                        <button title="increase font" class="quantity" data-action="increase">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 10 10" xml:space="preserve">
                                                    <path d="M10,5c0,0.5-0.5,1-1,1H6v3c0,0.5-0.5,1-1,1S4,9.5,4,9V6H1C0.5,6,0,5.5,0,5s0.5-1,1-1h3V1c0-0.5,0.5-1,1-1  s1,0.5,1,1v3h3C9.5,4,10,4.5,10,5z"></path>
                                                </svg>
                                        </button>
                                    </div> end quantity -->

                                    <p class="cost" data-translation-key="cost_key">${data.cost_key}</p>
                                </div> <!-- end costBox -->
                                <!--
                                <div class="article-check">
                                    <input type="checkbox" class="select_item">
                                    <span class="choose">ja</span>
                                    <span class="unchoose noneDisplay">ti</span>
                                </div>
                                -->
                            </div> <!-- end titleBox -->
                            
                            <p class="periphrasis">${data.text_key}</p>
                            <h2 class="reference">${data.hereWith}:</h2>
                            <ul id="drinkList"></ul> 

                            
                            <div class="bottomDiv_button grid g-10 ta-c mtb-10">
                                <button class="back" title="stop">${data.back}</button> 
                            </div>
                            
                            <!--
                             <div class="bottomDiv_button grid g_2_1 g-10 ta-c mtb-10">
                                <button class="basket" title="basket">Ubaci u korpu</button> 
                                <button class="back" title="back">Nazad</button> 
                            </div> 
                            -->
                        </div>
                    </div>
                `;

                dataDiv.appendChild(overlay);


                // Dobijanje referenci na <ul> element
                const drinkList = overlay.querySelector('#drinkList');

                // Iteriranje kroz vrednosti objekta drink i dodavanje <li> elemenata
                Object.values(data.drink).forEach(drinkValue => {
                    const drinkItem = document.createElement('li');
                    drinkItem.textContent = drinkValue;
                    drinkItem.classList.add('periphrasis');
                    drinkList.appendChild(drinkItem);
                });

                // Dodajte event listener za prikazivanje opisa na klik
                const back = dataDiv.querySelector('.back');
                back.addEventListener('click', function () {
                    overlay.classList.add('noneDisplay');
                    // descriptionDiv.classList.remove('noneDisplay');
                });


                const dataImg = dataDiv.querySelector('.dataImg');
                const textContainerDiv = dataDiv.querySelector('.textContainerDiv');
                dataImg.addEventListener('click', function () {
                    overlay.classList.remove('noneDisplay');
                    // descriptionDiv.classList.remove('noneDisplay');
                    // console.log('slika: ' + index);
                });

                textContainerDiv.addEventListener('click', function () {
                    overlay.classList.remove('noneDisplay');
                    // descriptionDiv.classList.remove('noneDisplay');
                    // console.log('slika: ' + index);
                });


                const backgroundDiv = overlay.querySelector('.backgroundDiv');
                backgroundDiv.addEventListener('click', function () {
                    overlay.classList.add('noneDisplay');
                    // descriptionDiv.classList.add('noneDisplay');
                    // console.log('neće da radi');
                });

            });



            const costs = document.querySelectorAll('.cost');
            costs.forEach(cost => {
                if (switcherHeader.classList.contains('switcher_dark')) {
                    cost.classList.add('switcher_dark');
                } else if (switcherHeader.classList.contains('switcher_blue')) {
                    cost.classList.add('switcher_blue');
                } else if (switcherHeader.classList.contains('switcher_brown')) {
                    cost.classList.add('switcher_brown');
                } else if (switcherHeader.classList.contains('switcher_middle')) {
                    cost.classList.add('switcher_middle');
                }
            });


            const summary = document.querySelectorAll('.description_content');
            const rotate = document.querySelector('.rotateImg');
            const description = descriptionDiv.querySelector('.description');
            summary.forEach(cost => {
                if (switcherHeader.classList.contains('switcher_dark')) {
                    cost.classList.add('switcher_dark');
                } else if (switcherHeader.classList.contains('switcher_blue')) {
                    cost.classList.add('switcher_blue');
                } else if (switcherHeader.classList.contains('switcher_brown')) {
                    cost.classList.add('switcher_brown');
                } else if (switcherHeader.classList.contains('switcher_middle')) {
                    cost.classList.add('switcher_middle');
                }
            });

            summary.forEach(summary => {
                summary.addEventListener('click', () => {
                    description.classList.toggle('noneDisplay');
                    rotate.classList.toggle('rotate');
                });
            });


            // Postavljamo podatke u HTML unutar novog div-a
            slogan.innerHTML = `
                <p>${translations.slogan}</p>
            `;

            dataContainer.appendChild(slogan);

        });

    });

    window.dispatchEvent(new Event('data'));
}


// Funkcija za postavljanje teksta u zavisnosti od jezika
function setLanguageText(language) {
    const languageText = document.getElementById("language");
    const srButton = document.getElementById("srButton");
    const cyrillic_latin = document.querySelector(".cyrillic_latin");
    const enButton = document.getElementById("enButton");
    const ruButton = document.getElementById("ruButton");

    const buttonMappings = {
        'en': {
            // image: '<img id="language" src="img/menu/language+.svg" alt="English" width="35" height="22">',
            // show: [srButton, ruButton, enButton],
            // hide: []
        },
        'sr': {
            // image: '<img id="language" src="img/menu/language+.svg" alt="English" width="35" height="22">',
            // show: [srButton, enButton, ruButton, cyrillic_latin],
            // hide: []
        },
        'sr_cyrillic': {
            // image: '<img id="language" src="img/menu/language+.svg" alt="English" width="35" height="22">',
            // show: [srButton, enButton, ruButton, cyrillic_latin],
            // hide: []
        },
        'ru': {
            // image: '<img id="language" src="img/menu/language+.svg" alt="English" width="35" height="22">',
            // show: [enButton, srButton, ruButton],
            // hide: []
        }
    };

    const buttonConfig = buttonMappings[language];

    if (buttonConfig) {
        // languageText.innerHTML = buttonConfig.image;
        // buttonConfig.show.forEach(button => button.classList.remove('noneDisplay'));
        // buttonConfig.hide.forEach(button => button.classList.add('noneDisplay'));

        // Uklonite klasu cyrillic_latin_color ako je jezik 'en' ili 'ru'
        if (language === 'en' || language === 'ru') {
            cyrillic_latin.classList.remove('cyrillic_latin_color');
        } else if (language === 'sr') {
            latinLabel.classList.add('cyrillic_latin_color');
        }
    }

}


// Dodajte event listenere za dugmad
document.getElementById("srButton").addEventListener("click", function () {
    changeLanguage('sr');
});

document.getElementById("enButton").addEventListener("click", function () {
    changeLanguage('en');
    resetStyling();
    enButton.classList.add('cyrillic_latin_color');
    localStorage.setItem('selectedLanguage', 'en');
    localStorage.setItem('checkedRadio', 'en');
    // localStorage.setItem('colorPreference', color);
});

document.getElementById("ruButton").addEventListener("click", function () {
    changeLanguage('ru');
    resetStyling();
    ruButton.classList.add('cyrillic_latin_color');
    localStorage.setItem('selectedLanguage', 'ru');
    localStorage.setItem('checkedRadio', 'ru');
});


function resetStyling() {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
    localStorage.clear('checkedRadio', 'cyrillic');
    latinLabel.classList.remove('cyrillic_latin_color');
    cyrillicLabel.classList.remove('cyrillic_latin_color');
    enButton.classList.remove('cyrillic_latin_color');
    ruButton.classList.remove('cyrillic_latin_color');
}


// Dodavanje latinice ili ćiričice
const latinLabel = document.getElementById('latinLabel');
const latinRadio = document.getElementById('latin');
const cyrillicLabel = document.getElementById('cyrillicLabel');
const cyrillicRadio = document.getElementById('cyrillic');

// latinLabel.classList.add('cyrillic_latin_color');

latinRadio.addEventListener('change', function () {
    if (latinRadio.checked) {
        latinLabel.classList.add('cyrillic_latin_color');
        cyrillicLabel.classList.remove('cyrillic_latin_color');
        changeLanguage('sr'); // Postavi jezik na srpski latinica
        // localStorage.setItem('checkedRadio', 'latin');
        localStorage.removeItem('checkedRadio', 'cyrillic');
    }
});

cyrillicRadio.addEventListener('change', function () {
    // cyrillicRadio.checked = true;
    if (cyrillicRadio.checked) {
        cyrillicLabel.classList.add('cyrillic_latin_color');
        latinLabel.classList.remove('cyrillic_latin_color');
        changeLanguage('sr_cyrillic'); // Postavi jezik na srpski ćirilica
        localStorage.setItem('checkedRadio', 'cyrillic');
    }
});


// Provera lokalnog skladišta za čekirano dugme
const checkedRadio = localStorage.getItem('checkedRadio');
if (checkedRadio) {
    if (checkedRadio === 'latin') {
        latinRadio.checked = true;
        latinLabel.classList.add('cyrillic_latin_color');
        cyrillicLabel.classList.remove('cyrillic_latin_color');
    } else if (checkedRadio === 'cyrillic') {
        cyrillicRadio.checked = true;
        cyrillicLabel.classList.add('cyrillic_latin_color');
        latinLabel.classList.remove('cyrillic_latin_color');
    } else if (checkedRadio === 'en') {
        enButton.classList.add('cyrillic_latin_color');
    } else if (checkedRadio === 'ru') {
        ruButton.classList.add('cyrillic_latin_color');
    }
}

// Pozovite funkciju da postavite početni tekst
setLanguageText(currentLanguage);

// Funkcija za promenu jezika
const changeLanguage = (newLanguage, colorPreference) => {
    currentLanguage = newLanguage;

    // Sačuvajte trenutni jezik u localStorage
    localStorage.setItem('selectedLanguage', currentLanguage);

    // Sačuvajte izabranu boju u localStorage
    saveColorPreference(colorPreference);

    // Ažurirajte prikaz jezika
    // setLanguageText(currentLanguage);

    loadTranslations(currentLanguage);
    location.reload();
};

// Učitajte prevode za trenutni jezik
loadTranslations(currentLanguage);


///////////////////////////////////////////////////////
//
const language = document.querySelector('#Layer_1_checkbox');
const checkboxIcon_1 = document.querySelector('#language');
const languageBox = document.querySelector(".language");

// Kreirajte čekboks element
const checkbox_1 = document.createElement('input');
checkbox_1.type = 'checkbox';
// checkbox_1.id = 'language';

language.parentNode.replaceChild(checkbox_1, language);


// Dodajte event listener za praćenje promena
checkbox_1.addEventListener('change', () => {
    if (checkbox_1.checked) {
        languageBox.classList.add('translateX');
        switcher.classList.remove('translateX');
        darkOpen.classList.remove('noneDisplay');
        checkbox_2.checked = false;
        // console.log('Čekboks je označen.');
    } else {
        languageBox.classList.remove('translateX');
        darkOpen.classList.add('noneDisplay');
        // console.log('Čekboks nije označen.');
    }
});

// Dodajte event listener na ikonicu kako biste simulirali klik na čekboks
checkboxIcon_1.addEventListener('click', () => {
    // window.location.hash = `languageBox`;
    checkbox_1.click();
});



const languageButtons = document.querySelectorAll('.changeLanguageButton');
languageButtons.forEach(button => {
    button.addEventListener('click', function () {
        const newLanguage = button.getAttribute('data-language');
        changeLanguage(newLanguage);
    });
});


///////////////////////////////////////////////////////
//
const layout = document.querySelector('#Layer_2_checkbox');
const checkboxIcon_2 = document.querySelector('#Layer_1');
const switcher = document.querySelector('.switcher');

// Kreirajte čekboks element
const checkbox_2 = document.createElement('input');
checkbox_2.type = 'checkbox';
// checkbox_2.id = 'Layer_1';

layout.parentNode.replaceChild(checkbox_2, layout);

// Dodajte event listener za praćenje promena
checkbox_2.addEventListener('change', () => {
    if (checkbox_2.checked) {
        switcher.classList.add('translateX');
        languageBox.classList.remove('translateX');
        darkOpen.classList.remove('noneDisplay');
        checkbox_1.checked = false;
        // console.log('Čekboks je označen.');
    } else {
        switcher.classList.remove('translateX');
        darkOpen.classList.add('noneDisplay');
        // console.log('Čekboks nije označen.');
    }
});

// Dodajte event listener na ikonicu kako biste simulirali klik na čekboks
checkboxIcon_2.addEventListener('click', () => {
    // window.location.hash = `switcher`;
    checkbox_2.click();
});



