document.addEventListener('DOMContentLoaded', () => {
    const categoryBoxes = document.querySelectorAll('.catagories-box');

    categoryBoxes.forEach(box => {
        box.addEventListener('click', () => {
            // Убираем активные классы у всех элементов
            categoryBoxes.forEach(b => {
                const boxElement = b.querySelector('.catagories-box_element');
                const boxText = b.querySelector('.catagories-box_text');

                boxElement.classList.remove('box-active');
                boxText.classList.remove('active-blue');
            });

            // Добавляем активные классы к текущему элементу
            const currentBoxElement = box.querySelector('.catagories-box_element');
            const currentBoxText = box.querySelector('.catagories-box_text');

            currentBoxElement.classList.add('box-active');
            currentBoxText.classList.add('active-blue');
        });
    });
});
