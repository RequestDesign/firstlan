// document.addEventListener("DOMContentLoaded", function () {
//   const buttons = document.querySelectorAll(".swiper-slide");
//   const contentBoxes = document.querySelectorAll(
//     ".description-block_content .content-box"
//   );

//   buttons.forEach((button) => {
//     button.addEventListener("click", () => {
//       const targetId = button.getAttribute("data-target");
//       const targetContent = document.getElementById(targetId);

//       buttons.forEach((btn) => btn.classList.remove("active-btn"));
//       button.classList.add("active-btn");

//       contentBoxes.forEach((box) => box.classList.remove("active-block"));
//       targetContent.classList.add("active-block");
//     });
//   });
// });


document.addEventListener("DOMContentLoaded", function () {
  const modalButton = document.querySelectorAll(".modal-vis");
  const modal = document.getElementById("modal-window");
  const form = modal.querySelector("form");
  const modalBlock = modal.querySelector(".modal-block");
  const thankYouBlock = document.querySelector(".thank-you-block");

  // Обработчик для открытия модального окна
  modalButton.forEach(button => {
    button.addEventListener("click", function () {
        modal.classList.add("active-mod"); // Добавляем класс для отображения модального окна
        modalBlock.style.display = 'grid'; // Показываем блок с формой
        thankYouBlock.style.display = 'none'; // Скрываем блок благодарности
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы
  
    // Заменяем содержимое modal-block на thank-you-block
    modalBlock.innerHTML = thankYouBlock.innerHTML;
  });
  
  // Обработчик для закрытия блока благодарности и модального окна
  modal.addEventListener("click", function (event) {
      if (event.target.id === "close-thank-you") {
          thankYouBlock.style.display = 'none'; // Скрываем блок с благодарностью
          modal.classList.remove("active-mod"); // Закрываем модальное окно
          form.reset(); // Сбрасываем поля формы, если нужно
      }
  });

  // Обработчик для закрытия модального окна (например, по кнопке "Закрыть")
  const closeModalButton = document.getElementById("close-modal"); // Предполагается, что у вас есть кнопка закрытия с id "close-modal"
  closeModalButton.addEventListener("click", function () {
      modal.classList.remove("active-mod"); // Убираем класс для скрытия модального окна
      modalBlock.style.display = 'block'; // Показываем блок с формой
      thankYouBlock.style.display = 'none'; // Скрываем блок благодарности
  });
});



