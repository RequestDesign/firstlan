function initFooterLinks() {
    document.querySelectorAll('.main-categories_title').forEach((title, index) => {
        const currentLinks = title.nextElementSibling; 
        const arrowUp = title.querySelector('.arrow-drop-up');
        const arrowDown = title.querySelector('.arrow-drop-down');

        // Устанавливаем состояние по умолчанию для "Категории", "Фильтры Бренды" и "Бренды"
        const isActive = (index === 0 || index === 1 || index === 2); // Предположим, что 0 - "Категории", 1 - "Фильтры Бренды", 2 - "Бренды"

        currentLinks.classList.toggle('categories_content-active', isActive);
        currentLinks.style.display = isActive ? 'grid' : 'none'; 
        arrowUp.style.display = isActive ? 'block' : 'none'; 
        arrowDown.style.display = isActive ? 'none' : 'block'; 

        title.addEventListener('click', () => {
            // Переключаем состояние текущего блока
            const isActive = currentLinks.classList.toggle('categories_content-active');
            currentLinks.style.display = isActive ? 'grid' : 'none'; 
            arrowUp.style.display = isActive ? 'block' : 'none'; 
            arrowDown.style.display = isActive ? 'none' : 'block'; 
        });

    });
}

function checkWidth() {
    if (window.innerWidth > 768) { 
        initFooterLinks(); 
    } else {
        // Убираем обработчики событий, если ширина меньше или равна 48em (768px)
        document.querySelectorAll('.main-categories_title').forEach(title => {
            const currentLinks = title.nextElementSibling;
            title.removeEventListener('click', currentLinks);
        });

        // Скрываем стрелки, но оставляем блоки открытыми
        document.querySelectorAll('.brands-content, .brands-content_box').forEach(links => {
            links.style.display = 'grid'; // Оставляем содержимое открытым
            links.classList.add('categories_content-active'); // Убедитесь, что класс активен
        });

        // Скрываем стрелки
        document.querySelectorAll('.arrow-drop-up, .arrow-drop-down').forEach(arrow => {
            arrow.style.display = 'none'; // Скрываем стрелки
        });
    }
}

// Инициализация при загрузке
checkWidth();

// Обновление при изменении размера окна
window.addEventListener('resize', checkWidth);
