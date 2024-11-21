let currentLanguage = "en"; // Язык по умолчанию: английский

// Функция для загрузки внешнего HTML (Header и Footer)
function loadHTML(component, containerId) {
    fetch(component)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Ошибка при загрузке компонента: ${response.statusText}`);
            }
            return response.text();
        })
        .then((html) => {
            document.getElementById(containerId).innerHTML = html;
        })
        .catch((error) => {
            console.error("Ошибка при загрузке компонента:", error);
            document.getElementById(containerId).innerHTML = `<p>Ошибка при загрузке ${component}</p>`;
        });
}

// Загружаем Header и Footer
loadHTML("header.html", "header-container");
loadHTML("footer.html", "footer-container");

// Функция для загрузки переводов
function loadTranslations(language) {
    fetch("translations.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Ошибка при загрузке переводов: ${response.statusText}`);
            }
            return response.json();
        })
        .then((translations) => {
            const langData = translations[language];
            if (!langData) {
                throw new Error(`Переводы для языка ${language} не найдены`);
            }

            // Обновляем title
            document.title = langData.title;

            // Обновляем содержимое Header
            document.getElementById("site-title").textContent = langData.header.welcome;

            // Обновляем содержимое Footer
            document.getElementById("footer-text").innerHTML = langData.footer.copyright;

            // Обновляем фильтры
            document.getElementById("filters-title").textContent = langData.filters.series;
            document.getElementById("series-label").textContent = langData.filters.series;

            // Обновляем каталог
            document.getElementById("catalog-title").textContent = langData.catalog.title;
        })
        .catch((error) => {
            console.error("Ошибка при загрузке переводов:", error);
            // Устанавливаем стандартные значения в случае ошибки
            document.title = "AllFigs - LEGO Minifigures Collection";
            document.getElementById("site-title").textContent = "Welcome to AllFigs!";
            document.getElementById("footer-text").innerHTML = "© 2024 AllFigs. All rights reserved.";
            document.getElementById("filters-title").textContent = "Select Series";
            document.getElementById("series-label").textContent = "Select Series";
            document.getElementById("catalog-title").textContent = "Catalog";
        });
}

// Инициализация с текущим языком (по умолчанию английский)
loadTranslations(currentLanguage);

// Функция для смены языка
function changeLanguage(language) {
    currentLanguage = language;
    loadTranslations(language);
}

// Пример каталога (временная заглушка)
const figuresContainer = document.getElementById("figures-container");
figuresContainer.innerHTML = "<p>Catalog is empty...</p>";

// Пример переключателя языка
const langSwitcher = document.getElementById("language-switcher");
if (langSwitcher) {
    langSwitcher.addEventListener("change", (event) => {
        changeLanguage(event.target.value);
    });
}

// Пример фильтрации минифигурок
document.getElementById("series").addEventListener("change", (event) => {
    const selectedSeries = event.target.value;
    filterFiguresBySeries(selectedSeries);
});

// Пример фильтрации фигурок (в реальном проекте данные будут загружаться динамически)
const allFigures = [
    { name: "Ninjago - Zane", series: "Ninjago" },
    { name: "Star Wars - Luke", series: "Star Wars" },
    { name: "City - Policeman", series: "City" },
    { name: "Ninjago - Kai", series: "Ninjago" },
    // Добавь остальные фигурки
];

function filterFiguresBySeries(series) {
    let filteredFigures = allFigures;
    
    if (series !== "all") {
        filteredFigures = allFigures.filter(figure => figure.series === series);
    }
    
    figuresContainer.innerHTML = "";
    filteredFigures.forEach(figure => {
        const figureElement = document.createElement("div");
        figureElement.classList.add("figure");
        figureElement.innerHTML = `<p>${figure.name}</p>`;
        figuresContainer.appendChild(figureElement);
    });
}

// Изначальная фильтрация по умолчанию (показывать все)
filterFiguresBySeries("all");
