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

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.main-advantages_item');
    const wrapD3Cube = document.querySelector('#wrapD3Cube');
    const D3Cube = document.querySelector('#D3Cube');
  
    items.forEach(item => {
      item.addEventListener('click', () => {
        // Удаляем активный класс у всех элементов
        items.forEach(i => {
          i.classList.remove('active');
          // Отключаем анимацию для всех кубов
          D3Cube.classList.add('no-animation');
        });
  
        // Добавляем активный класс к текущему элементу
        item.classList.add('active');
  
        // Включаем анимацию для куба
        D3Cube.classList.remove('no-animation');
      });
    });
  });
    
  
