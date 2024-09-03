document.querySelectorAll('.heart').forEach(function(element) {
    element.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});
document.querySelectorAll('.btn-blue-basket').forEach(function(button) {
    button.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});
// слайдер
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.main-sales_items');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const items = Array.from(container.querySelectorAll('.sales_item'));
    const itemWidth = items[0].offsetWidth;
    const scrollAmount = itemWidth + parseInt(getComputedStyle(container).gap);
    
    function updateButtonState() {
        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;

        prevButton.disabled = scrollLeft === 0;
        nextButton.disabled = scrollLeft + clientWidth >= scrollWidth - 1; // Оставляем небольшой зазор для точности
    }

    function showItemsInView() {
        const containerRect = container.getBoundingClientRect();
        items.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const isInView = itemRect.left < containerRect.right && itemRect.right > containerRect.left;
            if (isInView) {
                item.classList.add('show');
            } else {
                item.classList.remove('show');
            }
        });
    }

    prevButton.addEventListener('click', () => {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        setTimeout(updateButtonState, 300); // Задержка для учета времени прокрутки
    });

    nextButton.addEventListener('click', () => {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        setTimeout(updateButtonState, 300); // Задержка для учета времени прокрутки
    });

    container.addEventListener('scroll', () => {
        updateButtonState();
        showItemsInView();
    });

    // Изначально обновляем состояние кнопок и видимость элементов
    updateButtonState();
    showItemsInView();
});
