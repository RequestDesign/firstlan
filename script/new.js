const clientItems = document.querySelectorAll('.main-client_item');

clientItems.forEach(item => {
  item.addEventListener('click', () => {
    // Находим активный элемент
    const activeItem = document.querySelector('.main-client_item.active');

    // Если кликнутый элемент уже активен, просто удаляем класс у него
    if (item.classList.contains('active')) {
      item.classList.remove('active');
    } else {
      // Если активный элемент существует, удаляем у него класс
      if (activeItem) {
        activeItem.classList.remove('active');
      }
      // Добавляем класс актив к текущему элементу
      item.classList.add('active');
    }
  });
});
