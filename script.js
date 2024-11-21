let currentLanguage = "ru"; // По умолчанию русский

// Функция для загрузки внешнего HTML (Header и Footer)
function loadHTML(component, containerId) {
    fetch(component)
        .then((response) => response.text())
        .then((html) => {
            document.getElementById(containerId).innerHTML = html;
        })
        .catch((error) => {
            console.error("Ошибка при загрузке компонента:", error);
        });
}

// Загружаем Header и Footer
loadHTML("header.html", "header-container");
loadHTML("footer.html", "footer-container");

// Функция для загрузки переводов
function loadTranslations(language) {
    fetch("translations.json")
        .then((response) => response.json())
        .then((translations) => {
            const langData = translations[language];

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
        });
}

// Инициализация с текущим языком
loadTranslations(currentLanguage);

// Функция для смены языка
function changeLanguage(language) {
    currentLanguage = language;
    loadTranslations(language);
}

// Пример каталога (временная заглушка)
const figuresContainer = document.getElementById("figures-container");
figuresContainer.innerHTML = "<p>Каталог пока пуст...</p>";

// Пример переключателя языка
const langSwitcher = document.getElementById("language-switcher");
if (langSwitcher) {
    langSwitcher.addEventListener("change", (event) => {
        changeLanguage(event.target.value);
    });
}
