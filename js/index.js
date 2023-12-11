// let currentLanguage = 'sr';

document.addEventListener("DOMContentLoaded", function () {
    // Učitavanje podrazumevanog jezika (na primer, engleski)
    loadTranslations(currentLanguage);
});

function loadTranslations(language) {

    const jsonFileName = `js/translations_${language}.json`;
    fetch(jsonFileName)
        .then(response => response.json())
        .then(data => {

            // Kreiranje description paragrpaph van funkcije kako bi bio globalno dostupan
            const description = document.querySelector('.description')

            // Poziv funkcije za postavljanje prevoda
            setTranslations(data);

            function setTranslations(translations) {

                const elementsWithTranslationKey = document.querySelectorAll('[data-translation-key]');

                elementsWithTranslationKey.forEach(element => {
                    const translationKey = element.getAttribute('data-translation-key');

                    // Provera postojanja prevoda u opštem skupu
                    if (translations.hasOwnProperty(translationKey)) {
                        // Postavite prevedeni tekst
                        element.innerHTML = translations[translationKey];
                    } else if (translations.hasOwnProperty('category') && translations.category.hasOwnProperty(translationKey)) {
                        // Ako prevod nije pronađen u opštem skupu, proverite u kategoriji
                        element.innerHTML = translations.category[translationKey];
                    } else if (translations.hasOwnProperty('info') && translations.info.hasOwnProperty(translationKey)) {
                        // Ako prevod nije pronađen ni u opštem skupu ni u kategoriji, proverite u info delu
                        element.innerHTML = translations.info[translationKey];
                    } else if (translationKey.startsWith('cat') && translations.hasOwnProperty(translationKey) && translations[translationKey].hasOwnProperty('description')) {
                        // Ako prevod nije pronađen u opštem skupu, kategoriji, info delu ili cat1, proverite za ključ "description" unutar te kategorije
                        element.innerHTML = translations[translationKey].description;
                    } else {
                        // Ako ne postoji prevod, možete postaviti podrazumevani tekst
                        console.warn(`Translation not found for key: ${translationKey}`);
                    }

                });

                for (const categoryKey in translations) {
                    if (translations.hasOwnProperty(categoryKey)) {
                        const category = translations[categoryKey];

                        const itemDiv = document.querySelector('.data-container')
                        const cells = document.querySelectorAll('.carousel__cell');
                        const descriptionElements = document.querySelectorAll('.description');

                        // Dodavanje Event Listener-a na svaku ćeliju karusela
                        cells.forEach((cell, index) => {
                            cell.addEventListener('click', () => handleCellClick(index));
                        });

                        function handleCellClick(index) {
                            const categoryKey = 'cat' + (index + 1);
                            console.log('Klik na ćeliju sa indeksom:', index);

                            resetAnimation();
                            itemDiv.scrollTop = 0;

                            // Prikazivanje podataka za odabranu kategoriju
                            displayCategoryData(translations[categoryKey]);
                        }

                        function resetAnimation() {
                            descriptionElements.forEach((description) => {
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



                        // Funkcija za prikazivanje podataka kategorije
                        function displayCategoryData(category) {

                            // Uklanjanje prethodno dodatih itemDiv elemenata
                            container.querySelectorAll('.itemDiv').forEach(function (itemDiv) {
                                itemDiv.remove();
                            });


                            descriptionElements.forEach(function (description) {
                                description.innerHTML = category.description;
                            });


                            // Dodavanje novih itemDiv elemenata za svaki objekat unutar translations niza
                            category.translations.forEach(function (item, index) {
                                // Kreiranje novog div-a za svaki objekat
                                const itemDiv = document.createElement('div');
                                itemDiv.classList.add('itemDiv');

                                // Kreiranje novog div-a za h1 i dva p taga
                                const textContainerDiv = document.createElement('div');
                                textContainerDiv.classList.add('textContainerDiv');

                                // Kreiranje novih elemenata za svaki objekat
                                const image = document.createElement('img');
                                const title = document.createElement('h1');
                                title.classList.add('title');
                                const periphrasis = document.createElement('p');
                                periphrasis.classList.add('periphrasis');
                                const cost = document.createElement('p');
                                cost.classList.add('cost');
                                // Proverite postojeće klase u dokumentu i primenite odgovarajuću boju
                                if (switcherHeader.classList.contains('switcher_dark')) {
                                    cost.classList.add('switcher_dark');
                                } else if (switcherHeader.classList.contains('switcher_light')) {
                                    cost.classList.add('switcher_light');
                                } else if (switcherHeader.classList.contains('switcher_middle')) {
                                    cost.classList.add('switcher_middle');
                                }

                                // Postavljanje atributa i teksta za trenutni objekat
                                image.src = item.imageSrc;
                                title.textContent = item.title_key;
                                periphrasis.textContent = item.text_key;
                                cost.textContent = item.cost_key;

                                // Dodavanje h1 i dva p taga u poseban div
                                textContainerDiv.appendChild(title);
                                textContainerDiv.appendChild(periphrasis);
                                textContainerDiv.appendChild(cost);

                                // Dodavanje novih elemenata u div
                                itemDiv.appendChild(image);
                                itemDiv.appendChild(textContainerDiv);



                                // Kreiranje novog div-a za overlay
                                const overlay = document.createElement('div');
                                overlay.classList.add('overlay');
                                overlay.classList.add('noneDisplay');

                                // Kreiranje novog div-a za background
                                const backgroundDiv = document.createElement('div');
                                backgroundDiv.classList.add('backgroundDiv');

                                // Kreiranje novog div-a za opis itemDiv-a
                                const descriptionDiv = document.createElement('div');
                                descriptionDiv.classList.add('descriptionDiv');
                                descriptionDiv.classList.add('noneDisplay');

                                // Kreiranje gornjeg div-a sa slikom
                                const topDiv = document.createElement('div');
                                topDiv.classList.add('topDiv');

                                // Dodavanje slike u gornji div
                                const topImage = document.createElement('img');
                                topImage.src = item.imageSrc;
                                topDiv.appendChild(topImage);

                                // Dodavanje gornjeg div-a u descriptionDiv
                                descriptionDiv.appendChild(topDiv);

                                // Kreiranje donjeg div-a sa h1, h2 i paragrafima
                                const bottomDiv = document.createElement('div');
                                bottomDiv.classList.add('bottomDiv');

                                // Dodavanje h1, p i h2, p, p u donji div
                                const h1 = document.createElement('h1');
                                h1.textContent = item.title_key;
                                h1.classList.add('title');

                                const p1 = document.createElement('p');
                                p1.classList.add('periphrasis');
                                p1.textContent = item.text_key;

                                const h2 = document.createElement('h2');
                                h2.textContent = 'preporučujemo uz ovo:';
                                h2.classList.add('reference');

                                // Kreiranje liste (ul elementa)
                                const list = document.createElement('ul');

                                // Provera da li postoji drink objekat
                                if (item.drink && typeof item.drink === 'object') {
                                    // Iteracija kroz podatke u drink objektu i dodavanje svake vrednosti u listu
                                    for (const drinkKey in item.drink) {
                                        if (item.drink.hasOwnProperty(drinkKey)) {
                                            const listItem = document.createElement('li');
                                            listItem.textContent = item.drink[drinkKey];
                                            list.appendChild(listItem);
                                        }
                                    }
                                } else {
                                    console.error('Error: Missing or invalid drink data for item:', item);
                                }

                                const p4 = document.createElement('p');
                                p4.textContent = item.cost_key;
                                p4.classList.add('cost');
                                if (switcherHeader.classList.contains('switcher_dark')) {
                                    p4.classList.add('switcher_dark');
                                } else if (switcherHeader.classList.contains('switcher_light')) {
                                    p4.classList.add('switcher_light');
                                } else if (switcherHeader.classList.contains('switcher_middle')) {
                                    p4.classList.add('switcher_middle');
                                }

                                // Dodavanje elemenata u donji div
                                bottomDiv.appendChild(h1);
                                bottomDiv.appendChild(p1);
                                bottomDiv.appendChild(h2);
                                bottomDiv.appendChild(list);
                                bottomDiv.appendChild(p4);

                                // Dodavanje donjeg div-a u descriptionDiv
                                descriptionDiv.appendChild(bottomDiv);

                                // Dodajte event listener za prikazivanje opisa na klik
                                image.addEventListener('click', function () {
                                    overlay.classList.remove('noneDisplay');
                                    descriptionDiv.classList.remove('noneDisplay');
                                    console.log('slika: ' + index);
                                });

                                // Dodajte event listener za sakrivanje opisa na klik
                                backgroundDiv.addEventListener('click', function () {
                                    overlay.classList.add('noneDisplay');
                                    // descriptionDiv.classList.add('noneDisplay');
                                });

                                // Dodavanje opisnog div-a za svaki objekat unutar kategorije
                                overlay.appendChild(backgroundDiv);
                                overlay.appendChild(descriptionDiv);
                                itemDiv.appendChild(overlay);

                                // Dodavanje div-a za svaki objekat unutar kategorije
                                container.appendChild(itemDiv);
                            });

                        }
                    }
                }
                // Pronalaženje aktivne ćelije
                const activeCell = document.querySelector('.carousel__cell.active');

                // Provera da li postoji aktivna ćelija
                if (activeCell) {
                    // Dobavljanje indeksa aktivne ćelije
                    const activeIndex = Array.from(activeCell.parentElement.children).indexOf(activeCell);

                    // Provera da li je indeks pronađen
                    if (activeIndex !== -1) {
                        // Postavljanje početnog indeksa
                        const currentSelectedIndex = activeIndex;
                        const initialCategoryKey = 'cat' + (currentSelectedIndex + 1);

                        // Prikazivanje početne kategorije
                        displayCategoryData(translations[initialCategoryKey]);
                    } else {
                        console.error('Error: Could not determine index of active cell.');
                    }
                } else {
                    // console.error('Error: No active cell found.');
                }

            }


            tags = document.querySelectorAll('.food, #digitalMenu, .logo, .category, .textContainerDiv');
            tags.forEach(tag => {
                tag.style.opacity = "0";
                tag.style.transform = "translateY(100%)";
            });
            // Sačekajte trenutak pre nego što postavite nove podatke
            setTimeout(() => {

                tags.forEach(tag => {
                    tag.style.opacity = "1";
                    tag.style.transform = "translateY(0%)";
                });

            }, 50); // Promenite vreme prelaza prema potrebi

        })
        .catch(error => console.error('Error loading data:', error));


    // Poziv funkcije za postavljanje teksta u zavisnosti od jezika
    setLanguageText(language);
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
            image: '<img id="language" src="img/flag/eng.svg" alt="English">',
            show: [srButton, ruButton],
            hide: [enButton]
        },
        'sr': {
            image: '<img id="language" src="img/flag/yu.svg" alt="English">',
            show: [srButton, enButton, ruButton, cyrillic_latin],
            hide: []
        },
        'sr_cyrillic': {
            image: '<img id="language" src="img/flag/yu.svg" alt="English">',
            show: [srButton, enButton, ruButton, cyrillic_latin],
            hide: []
        },
        'ru': {
            image: '<img id="language" src="img/flag/rus.svg" alt="Русский">',
            show: [enButton, srButton],
            hide: [ruButton]
        }
    };

    const buttonConfig = buttonMappings[language];

    if (buttonConfig) {
        languageText.innerHTML = buttonConfig.image;
        buttonConfig.show.forEach(button => button.classList.remove('noneDisplay'));
        buttonConfig.hide.forEach(button => button.classList.add('noneDisplay'));
    }
}


// Dodajte event listenere za dugmad
document.getElementById("srButton").addEventListener("click", function () {
    changeLanguage('sr');
});

document.getElementById("enButton").addEventListener("click", function () {
    changeLanguage('en');
    resetStyling();
    cyrillicLabel.classList.remove('cyrillic_latin_color');
    latinLabel.classList.remove('cyrillic_latin_color');
    setting_box.classList.remove('translateX');
    darkOpen.classList.remove('visibility');
    localStorage.setItem('selectedLanguage', 'en');
});

document.getElementById("ruButton").addEventListener("click", function () {
    changeLanguage('ru');
    resetStyling();
    cyrillicLabel.classList.remove('cyrillic_latin_color');
    latinLabel.classList.remove('cyrillic_latin_color');
    setting_box.classList.remove('translateX');
    darkOpen.classList.remove('visibility');
    localStorage.setItem('selectedLanguage', 'ru');
});


function resetStyling() {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
    localStorage.clear('checkedRadio', 'cyrillic');
    latinLabel.classList.add('cyrillic_latin_color');
    cyrillicLabel.classList.remove('cyrillic_latin_color');
}


// Dodavanje latinice ili ćiričice
const latinLabel = document.getElementById('latinLabel');
const latinRadio = document.getElementById('latin');
const cyrillicLabel = document.getElementById('cyrillicLabel');
const cyrillicRadio = document.getElementById('cyrillic');

latinLabel.classList.add('cyrillic_latin_color');

latinRadio.addEventListener('change', function () {
    if (latinRadio.checked) {
        latinLabel.classList.add('cyrillic_latin_color');
        cyrillicLabel.classList.remove('cyrillic_latin_color');
        changeLanguage('sr'); // Postavi jezik na srpski latinica
        // localStorage.setItem('checkedRadio', 'latin');
        localStorage.removeItem('checkedRadio', 'cyrillic');
        setting_box.classList.remove('translateX');
        darkOpen.classList.remove('visibility');
    }
});

cyrillicRadio.addEventListener('change', function () {
    cyrillicRadio.checked = true;
    if (cyrillicRadio.checked) {
        cyrillicLabel.classList.add('cyrillic_latin_color');
        latinLabel.classList.remove('cyrillic_latin_color');
        changeLanguage('sr_cyrillic'); // Postavi jezik na srpski ćirilica
        localStorage.setItem('checkedRadio', 'cyrillic');
        setting_box.classList.remove('translateX');
        darkOpen.classList.remove('visibility');
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
    }
}


// Funkcija za promenu jezika
function changeLanguage(newLanguage) {
    currentLanguage = newLanguage;

    // Ažurirajte prikaz jezika
    loadTranslations(currentLanguage);

    // Sačuvajte trenutni jezik u localStorage
    localStorage.setItem('selectedLanguage', currentLanguage);
}

// Proverite da li postoji prethodno odabrani jezik u localStorage
const storedLanguage = localStorage.getItem('selectedLanguage');

// Ako postoji, postavite ga kao trenutni jezik
if (storedLanguage) {
    currentLanguage = storedLanguage;
} else {
    // Ako ne postoji, postavite podrazumevani jezik
    currentLanguage = 'sr'; // Postavite podrazumevani jezik ovisno o vašim potrebama
}

const languageText = document.getElementById("language");
const languageBox = document.querySelector(".language");
// const chooseLanguage = document.getElementById("chooseLanguage");
function toggleButtons() {
    languageBox.classList.toggle("noneDisplay");
    console.log("click")
}
languageText.addEventListener("click", toggleButtons);
languageBox.addEventListener("click", toggleButtons);
latinRadio.addEventListener("click", toggleButtons);
cyrillicRadio.addEventListener("click", toggleButtons);