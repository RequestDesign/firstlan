document.querySelector(".form").addEventListener("input", function (event) {
  const input = event.target;
  const errorMessage = document.getElementById(`${input.id}-error`);

  if (!input.checkValidity()) {
    errorMessage.textContent = "Поле заполнено неверно";
    errorMessage.style.display = "block";
  } else {
    errorMessage.textContent = "";
    errorMessage.style.display = "none";
  }
});
document.querySelector(".form").addEventListener("submit", function (event) {
  const formInputs = document.querySelectorAll(".form-input");
  let isValid = true;

  formInputs.forEach(function (input) {
    if (!input.checkValidity()) {
      isValid = false;
    }
  });

  if (!isValid) {
    event.preventDefault();
    // Показать сообщения об ошибках для всех невалидных полей
    formInputs.forEach(function (input) {
      if (!input.checkValidity()) {
        document.getElementById(`${input.id}-error`).style.display = "block";
      }
    });
  }
});
