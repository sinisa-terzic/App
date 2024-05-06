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

        // HEADER
        const manu_icon_open = document.querySelector('.setIcon')
        const setting_box = document.querySelector('.setting');
        const languageBox = document.querySelector('.languageBox');
        const languageImg = document.getElementById('languageImg');
        const language = document.querySelector('.language');
        const darkOpen = document.querySelector('.dark');
        const headerLogo = document.querySelector('.headerLogo');

        const carousel_control = document.querySelector('.carousel_control');

        // INFO
        const infoDiv = document.querySelector('.info');

        // DATA
        const description_content = document.querySelector('.description_content');
        const chooseBox = document.querySelector('.chooseBox');
        const dataContainer = document.querySelector('.data-container');
        const rotate = document.querySelector('.rotateImg');
        const description = document.querySelector('.description');

        // const dataContainer = document.getElementById('data');

        // CALL US
        const call_us = document.querySelector('.call_us');
        const callUs_btnList = document.querySelector('.callUs_btnList');

        function toggleAlertTheme() {
            setting_box.classList.toggle('noneDisplay');
            darkOpen.classList.toggle('noneDisplay');
            language.classList.add('noneDisplay');
        }


        function closeDescrition() {
            const rotateImages = document.querySelectorAll('.rotateImg');
            const descriptions = document.querySelectorAll('.description');
            rotateImages.forEach((rotateImg, index) => {
                // Pronalaženje odgovarajućeg description elementa na osnovu indeksa
                const description = descriptions[index];

                // Logika za dodavanje/uklanjanje klasa
                description.classList.add('noneDisplay');
                rotateImg.classList.remove('rotate');
            });
        }


        function clossAll() {
            darkOpen.classList.add('noneDisplay');
            setting_box.classList.add('noneDisplay');
            infoDiv.classList.remove('translateY');
            // dataContainer.classList.remove('translateY');
            chooseBox.classList.remove('noneDisplay');
            carousel_control.classList.remove('box-shadow');

            closeDescrition();

            stopCarousel();
            // Pokrenite rotaciju nakon kratkog vremenskog intervala
            setTimeout(function () {
                startCarousel();
            }, 10);
        }



        // CLOSE ALL ELEMENTS END START CAROUSEL
        headerLogo.addEventListener('click', () => {
            clossAll();
        });

        manu_icon_open.addEventListener('click', toggleAlertTheme);
        darkOpen.addEventListener('click', toggleAlertTheme);

        languageImg.addEventListener('click', () => {
            language.classList.toggle('noneDisplay');
        });


        ///////////////////////////////////////////////////////
        // CAROUSEL
        let carousel = document.querySelector('.carousel');
        const cells = document.querySelectorAll('.carousel__cell');
        const imageURLPrefix = 'img/food/cat/'; // Prefiks putanje do slika
        let selectedIndex = 0;
        const cellWidth = carousel.offsetWidth;
        let theta;
        const numCategories = 9;

        let intervalId; // Id intervala za automatsko pokretanje karausela

        const prevButton = document.querySelectorAll('.previous-button');
        const nextButton = document.querySelectorAll('.next-button');
        const startButton = document.querySelector('.start-button');
        const stopButton = document.querySelector('.stop-button');


        // ROTIRANjE KARAUSELA
        function rotateCarousel() {
            let angle = theta * selectedIndex * -1;
            carousel.style.transform = 'rotateY(' + angle + 'deg)';
        }



        // za normalan tok karausela
        function cellClickHandler() {
            let clickedIndex = parseInt(this.getAttribute('data-index'), 10); // Dohvaćamo indeks kliknute ćelije
            let difference = clickedIndex - selectedIndex % numCategories; // Računamo razliku između kliknutog indeksa i trenutnog indeksa

            if (difference > numCategories / 2) {
                difference -= numCategories; // Ako je razlika veća od pola broja kategorija, smanjujemo je za broj kategorija kako bismo se približili kraju
            } else if (difference < -numCategories / 2) {
                difference += numCategories; // Ako je razlika manja od minus pola broja kategorija, povećavamo je za broj kategorija kako bismo se približili početku
            }

            selectedIndex += difference; // Povećavamo ili smanjujemo trenutni indeks na osnovu izračunate razlike

            changeCarousel();
            stopCarousel();

            // Pozivamo funkcije updatePrevSlide() i updateNextSlide() u zavisnosti od razlike
            if (difference > 0) {
                updateNextSlide();
            } else if (difference < 0) {
                updatePrevSlide();
            }
        }



        // Funkcija za generiranje CSS pravila za pozadinske slike
        function generateBackgroundCSS() {
            let css = '';
            for (let i = 1; i <= numCategories; i++) {
                css += `.carousel__cell:nth-child(${numCategories}n+${i}) {
        background-image: url('${imageURLPrefix}${i}.jpg');
      }`;
            }
            return css;
        }
        // Kreiranje <style> elementa i dodavanje generiranih CSS pravila u njega
        const styleElement = document.createElement('style');
        styleElement.textContent = generateBackgroundCSS();
        document.head.appendChild(styleElement);


        function changeCarousel() {
            const cellElements = Array.from(carousel.querySelectorAll('.carousel__cell'));
            const cellCount = cellElements.length;
            const rotateFn = 'rotateY'; // Smjer rotacije (Y osa)
            let cellSize = 44; // Širina ili visina pojedinačnog elementa
            const gapSize = 1.4; // Razmak između elemenata

            theta = 360 / cellCount;
            let radius = Math.round((cellSize / 2 + gapSize) / Math.tan(Math.PI / cellCount));

            for (let i = 0; i < cellCount; i++) {
                const cell = cellElements[i];
                const cellAngle = theta * i;
                cell.style.transform = `${rotateFn}(${cellAngle}deg) translateZ(${radius}vw)`;
                cell.style.opacity = 1;
            }

            let middleIndex = (selectedIndex % cellCount + cellCount) % cellCount;

            // Dodajemo aktivnu klasu samo središnjoj ćeliji
            cellElements.forEach((cell, index) => {
                if (index === middleIndex) {
                    cell.classList.add('active');
                    cell.removeEventListener('click', cellClickHandler);
                    cell.addEventListener('click', stopCarousel);
                    cell.addEventListener('click', handleCellClick);
                    infoDiv.addEventListener('touchmove', handleCellClick);
                    console.log('index je: ' + index)
                } else {
                    cell.classList.remove('active');
                    cell.removeEventListener('click', stopCarousel);
                    cell.addEventListener('click', cellClickHandler);
                    cell.addEventListener('click', handleCellClick);
                    dataContainer.scrollTop = 0;
                    // console.log('index je: ' + index)
                }

                function handleCellClick(index) {
                    // Pronađite aktivnu ćeliju
                    const activeCell = document.querySelector('.carousel__cell.active');
                    infoDiv.classList.add('translateY');
                    // dataContainer.classList.add('translateY');
                    chooseBox.classList.add('noneDisplay');
                    closeDescrition();
                    stopCarousel();
                    // dataContainer.classList.remove('noneDisplay');

                    // Ako postoji aktivna ćelija, simulirajte klik na njoj
                    if (activeCell) {
                        carousel_control.classList.add('box-shadow');
                        dataContainer.scrollTo({
                            top: 0,
                            behavior: 'smooth' // Dodajte ovu opciju za glatki efekat
                        });
                    }
                }

            });

            rotateCarousel();
        }


        // Kreiranje ćelija
        Array.from({ length: numCategories }).forEach((_, index) => {
            const cell = document.createElement("div");
            cell.className = "carousel__cell";
            cell.setAttribute('data-index', index);
            const p = document.createElement("p");
            p.className = "food";
            p.setAttribute("data-translation-key", `category_${index + 1}`);
            cell.appendChild(p);
            carousel.appendChild(cell);
        });




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


        // za rotiranje podataka kategorije
        let activeSlide = 0;
        const slides = document.querySelectorAll('.item');
        slides.forEach((slide, index) => {
            if (index === 0) {
                slide.classList.add('activeData');
            }
            if (index === 1) {
                slide.classList.add('nextData');
            }
            if (index === 8) {
                slide.classList.add('prevData');
            }
        });

        function updateNextSlide() {
            slides[activeSlide].classList.add("prevData");
            let nextSlide = (activeSlide < slides.length - 1) ? activeSlide + 1 : 0;
            slides[nextSlide].classList.remove("prevData");
            slides[nextSlide].classList.remove("nextData");
            slides[nextSlide].classList.add("activeData");

            if (nextSlide < slides.length - 1) {
                slides[nextSlide + 1].classList.add("nextData");
                slides[nextSlide + 1].classList.remove("prevData");
            }
            else {
                slides[0].classList.remove("prevData");
                slides[0].classList.add("nextData");
            }
            activeSlide = nextSlide;
            console.log(activeSlide)
        }

        function updatePrevSlide() {
            slides[activeSlide].classList.add("nextData");
            let prevSlide = (activeSlide > 0) ? activeSlide - 1 : slides.length - 1;
            slides[prevSlide].classList.remove("nextData");
            slides[prevSlide].classList.remove("prevData");
            slides[prevSlide].classList.add("activeData");

            if (prevSlide > 0) {
                slides[prevSlide - 1].classList.add("prevData");
                slides[prevSlide - 1].classList.remove("nextData");
            }
            else {
                slides[slides.length - 1].classList.remove("nextData");
                slides[slides.length - 1].classList.add("prevData");
            }

            activeSlide = prevSlide;
            console.log(activeSlide)
        }

        // DUGMAD NAPRED / NAZAD
        function handleButtonClick(direction) {
            selectedIndex += direction;
            changeCarousel();
            stopCarousel();
            infoDiv.classList.add('translateY');
            // dataContainer.classList.add('translateY');
            chooseBox.classList.add('noneDisplay');
            carousel_control.classList.add('box-shadow');
            closeDescrition();
        }

        prevButton.forEach(prevButton => {
            prevButton.addEventListener('click', () => {
                handleButtonClick(-1)
                updatePrevSlide()
            });
        });

        nextButton.forEach(nextButton => {
            nextButton.addEventListener('click', () => {
                handleButtonClick(1)
                updateNextSlide()
            });
        });


        // kako bismo omogućili pomeranje karausela prstom na ekranu
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', function (event) {
            touchStartX = event.touches[0].clientX;
        });

        carousel.addEventListener('touchend', function (event) {
            touchEndX = event.changedTouches[0].clientX;
            handleSwipe();
        });

        // pomeranje karausela prstom
        function handleSwipe() {
            let swipeDistance = touchEndX - touchStartX;
            if (swipeDistance > 50) {
                // Swipe to the right
                handleButtonClick(-1); // Move to previous cell
                updatePrevSlide()
            } else if (swipeDistance < -50) {
                // Swipe to the left
                handleButtonClick(1); // Move to next cell
                updateNextSlide()
            }
        }


        // Minimalna udaljenost za pomeranje prsta kako bi se aktiviralo pomeranje kontejnera
        const minSwipeDistance = 150;

        // Pomeranje prsta na dataContainer elementu
        dataContainer.addEventListener('touchstart', function (event) {
            touchStartX = event.touches[0].clientX;
        });

        dataContainer.addEventListener('touchend', function (event) {
            touchEndX = event.changedTouches[0].clientX;
            handleSwipeOnDataContainer();
        });

        // Funkcija za obradu pomeranja prsta na dataContainer elementu
        function handleSwipeOnDataContainer() {
            let swipeDistance = touchEndX - touchStartX;
            if (swipeDistance > minSwipeDistance) {
                // Swipe to the right
                handleButtonClick(-1); // Move to previous cell
                updatePrevSlide();
            } else if (swipeDistance < -minSwipeDistance) {
                // Swipe to the left
                handleButtonClick(1); // Move to next cell
                updateNextSlide();
            }
        }



        // POKRETANjE KARAUSELA
        function startCarousel() {
            selectedIndex++;
            changeCarousel();
            updateNextSlide()
            stopButton.classList.remove('noneDisplay');
            startButton.classList.add('noneDisplay');
            intervalId = setInterval(function () {
                selectedIndex++;
                changeCarousel();
                updateNextSlide()
            }, 3500); // Promijenite ovo na željeni interval automatskog pokretanja (u milisekundama)
        }
        startButton.addEventListener('click', startCarousel);


        // ZAUSTAVLjANjE KARAUSELA
        function stopCarousel() {
            stopButton.classList.add('noneDisplay');
            startButton.classList.remove('noneDisplay');
            clearInterval(intervalId);
        }
        stopButton.addEventListener('click', stopCarousel);

        // startCarousel();
        changeCarousel()
    }

    // Initially load translations for the current language
    loadTranslations(currentLanguage);

})