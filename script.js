// Функция для загрузки внешнего HTML
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

// Функция для извлечения заголовка из sta.txt
function getTitleFromText(text) {
    const lines = text.split('\n');
    let title = '';

    // Ищем строку с нужным заголовком
    for (let line of lines) {
        if (line.startsWith("title:")) {
            title = line.replace("title:", "").trim();
            break;
        }
    }

    return title;
}

// Загружаем данные из sta.txt
fetch("sta.txt")
    .then((response) => response.text())
    .then((data) => {
        const title = getTitleFromText(data); // Получаем заголовок из текста
        document.title = title; // Устанавливаем заголовок страницы
        document.getElementById("site-title").textContent = title; // Устанавливаем заголовок на странице
    })
    .catch((error) => {
        console.error("Ошибка загрузки заголовка:", error);
    });

// Пример каталога (временный заглушка)
const figuresContainer = document.getElementById("figures-container");
figuresContainer.innerHTML = "<p>Каталог пока пуст...</p>";
