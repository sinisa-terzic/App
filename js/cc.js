const jsonFileName = `js/translations_${language}.json`;
fetch(jsonFileName)
    .then(response => response.json())
    .then(data => {

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
                } else if (translationKey.startsWith('cat') && translations.hasOwnProperty(translationKey) && translations[translationKey].hasOwnProperty('description')) {
                    // Ako prevod nije pronađen u opštem skupu, kategoriji, info delu ili cat1, proverite za ključ "description" unutar te kategorije
                    element.innerHTML = translations[translationKey].description;
                } else {
                    // Ako ne postoji prevod, možete postaviti podrazumevani tekst
                    console.warn(`Translation not found for key: ${translationKey}`);
                }

            });
        }
    })