// Proverite da li postoji sačuvani jezik u localStorage
const savedLanguage = localStorage.getItem('selectedLanguage');

// Inicijalno postavite trenutni jezik na "sr" ako nije sačuvan
let currentLanguage = savedLanguage || 'sr';
const descriptionDiv = document.createElement('div');

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
        } else if (translationKey.startsWith('cat') && translations.hasOwnProperty(translationKey) && translations[translationKey].hasOwnProperty('description')) {
            console.log('Found category with description:', translations[translationKey].description);
            element.textContent = translations[translationKey].description;
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

            // description_content.classList.remove('noneDisplay');
            categoy_description_box.classList.add('noneDisplay');
            cell.classList.add('active');
            selectedIndex = index;
            rotateCarousel();
            stopRotation();

            dataContainer.scrollTop = 0;

            console.log('Klik na ćeliju sa indeksom:', index);

            const infoDiv = document.querySelector('.info');
            infoDiv.classList.add('noneDisplay');


            dataContainer.classList.remove('noneDisplay');
            dataItem.innerHTML = '';
            // descriptionDiv = descriptionDiv

            // Access data for the current index (index + 1 because indices in JavaScript start from 0)
            const currentData = translations['cat' + (index + 1)];


            // Iteriraj kroz svaki element
            descriptions.forEach((description, index) => {
                // Postavi tekst za trenutni element
                if (currentData && currentData.description) {
                    description.innerHTML = currentData.description;
                } else {
                    console.warn(`Description not found for category: ${currentData}`);
                }
            });

            function resetAnimation() {
                descriptions.forEach((description) => {
                    description.style.animation = 'none';
                    description.offsetHeight;
                    description.style.animation = null;
                    description.style.paddingLeft = '25%';
                    description.style.animationPlayState = 'running';

                    const textLength = description.innerText.length;

                    if (textLength > 60) {
                        description.style.animationDuration = '15s';
                    } else if (textLength > 50) {
                        description.style.animationDuration = '12s';
                    } else if (textLength > 30) {
                        description.style.animationDuration = '9s';
                    } else {
                        description.style.animationDuration = '6s';
                    }
                });
            }

            resetAnimation();


            // Kreiramo novi div za opis kategorije

            // Postavljamo podatke u HTML unutar novog div-a
            descriptionDiv.innerHTML = `
                        <div class="description_content flex y_center">
                            <details>
                                <summary class="flex"><p>${currentData.details}</p></summary>
                                <p class="description">${currentData.description}</p>
                            </details>
                        </div>
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
                        <p class="title" data-translation-key="title_key">${data.title_key}</p>
                        <p class="periphrasis" data-translation-key="text_key">${data.text_key}</p>
                        <p class="cost" data-translation-key="cost_key">${data.cost_key}</p>
                    </div>
                `;

                // Dodajemo novi div u kontejner
                dataItem.appendChild(dataDiv);

                dataContainer.appendChild(dataItem);

                // Kreiranje novog div-a za overlay
                const overlay = document.createElement('div');
                overlay.classList.add('overlay');
                overlay.classList.add('noneDisplay');

                overlay.innerHTML = `
                    <div class="backgroundDiv"></div>
                    <div class="descriptionDiv">

                        <div class="topDiv">
                            <img src="${data.imageSrc}" alt="${data.title_key}">
                        </div>

                        <div class="bottomDiv">
                            <div class="flex between_center mtb-10">
                                <h1 class="title">${data.title_key}</h1>
                                <p class="cost">${data.cost_key}</p>
                            </div>
                            
                            <p class="periphrasis">${data.text_key}</p>
                            <h2 class="reference">${data.hereWith}:</h2>
                            <ul id="drinkList"></ul> 


                            <div class="bottomDiv_button grid fg-10 ta-c mtb-10">
                                <button class="back" title="stop">${data.back}</button> 
                            </div>

                            <!--
                             <div class="bottomDiv_button grid g_2_1 fg-10 ta-c mtb-10">
                                <button class="basket" title="stop">Ubaci u korpu</button> 
                                <button class="back" title="stop">Nazad</button> 
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
                dataImg.addEventListener('click', function () {
                    overlay.classList.remove('noneDisplay');
                    // descriptionDiv.classList.remove('noneDisplay');
                    console.log('slika: ' + index);
                });


                const backgroundDiv = overlay.querySelector('.backgroundDiv');
                backgroundDiv.addEventListener('click', function () {
                    overlay.classList.add('noneDisplay');
                    // descriptionDiv.classList.add('noneDisplay');
                    console.log('neće da radi');
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


            const summary = document.querySelectorAll('summary');
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
    checkbox_2.click();
});



