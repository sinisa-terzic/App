document.addEventListener("DOMContentLoaded", function () {
    let currentLanguage = 'sr';

    // Function to load translations for the selected language
    function loadTranslations(language) {
        const jsonFileName = `js/translations_${language}.json`;
        fetch(jsonFileName)
            .then(response => response.json())
            .then(data => {
                // Call function to set translations
                setTranslations(data);
            })
            .catch(error => console.error('Error loading translations:', error));
    }

    // Function to set translations
    function setTranslations(translations) {
        const scrollWrapper = document.getElementById('data');

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

        // Clear existing content
        scrollWrapper.innerHTML = '';

        // Count the number of category keys
        let categoryCount = 0;
        for (const key in translations) {
            if (key.startsWith('cat')) {
                categoryCount++;
            }
        }

        console.log('Number of category keys:', categoryCount - 2);

        // Iterate over keys of translations and create div elements for each category
        for (let i = 1; i <= categoryCount; i++) {
            const categoryKey = `cat${i}`;
            if (translations.hasOwnProperty(categoryKey)) {
                const category = translations[categoryKey];
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'item';
                const descriptionDiv = document.createElement('div');
                descriptionDiv.classList.add('description_content');
                const slogan = document.createElement('div');
                slogan.classList.add('slogan')

                // Generisanje jedinstvenog ID-a za summary element
                let uniqueId = `summary_${i}`;

                // Postavljamo podatke u HTML unutar novog div-a
                descriptionDiv.innerHTML = `
                    <div id="${uniqueId}" class="flex">
                        <img class="rotateImg" src="img/food/play.svg" alt="play">
                        <p class="summary">${category.details}</p>
                        <img class="dotsImg" src="img/menu/menu-icon_dots.svg" alt="circle">
                    </div>
                    <p class="description noneDisplay">${category.description}</p>
                `;

                // Dodajte descriptionDiv u categoryDiv
                categoryDiv.appendChild(descriptionDiv);

                // Iterate over each translation object within the translations array
                const translationsHTML = category.translations.map(translation => {
                    return `
                        <div class="itemDiv">
                            <img class="dataImg" src="${translation.imageSrc}" alt="${translation.title_key}">
                            <div class="textContainerDiv">
                                <div class="titleBox flex between">
                                    <p class="title" data-translation-key="title_key">${translation.title_key}</p>
                                    <!-- Place for checkbox -->
                                    <svg class="plus" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 10 10" xml:space="preserve">
                                        <path class="st0" d="M10,5c0,0.5-0.5,1-1,1H6v3c0,0.5-0.5,1-1,1S4,9.5,4,9V6H1C0.5,6,0,5.5,0,5s0.5-1,1-1h3V1c0-0.5,0.5-1,1-1  s1,0.5,1,1v3h3C9.5,4,10,4.5,10,5z"></path>
                                    </svg>
                                </div>
                                <p class="periphrasis" data-translation-key="text_key">${translation.text_key}</p>
                                <div class="costBox_1 flex x_end">
                                    <!-- Place for counter -->
                                    <p class="cost" data-translation-key="cost_key">${translation.cost_key}</p>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');

                // Postavljamo podatke u HTML unutar novog div-a
                slogan.innerHTML = `
                            <p> ${translations.slogan}</p>
                        `;


                // Dodajte translationsHTML u categoryDiv
                categoryDiv.innerHTML += translationsHTML;
                // Dodajte descriptionDiv u categoryDiv
                categoryDiv.appendChild(slogan);


                // Dodajte categoryDiv u scrollWrapper
                scrollWrapper.appendChild(categoryDiv);

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
                const rotate = document.querySelectorAll('.rotateImg');
                const description = document.querySelectorAll('.description');
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

                // Dodavanje funkcije događaja za svaki ID
                document.getElementById(uniqueId).addEventListener('click', () => {
                    const description = document.getElementById(uniqueId).closest('.item').querySelector('.description');
                    const rotate = document.getElementById(uniqueId).closest('.item').querySelector('.rotateImg');

                    // Logika za dodavanje/uklanjanje klasa
                    description.classList.toggle('noneDisplay');
                    rotate.classList.toggle('rotate');
                });
            }

        }
    }

    // Initially load translations for the current language
    loadTranslations(currentLanguage);
});
