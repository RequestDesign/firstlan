document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.getElementById("searchIcon");
  const searchBox = document.getElementById("searchBox");
  const closeSearch = document.getElementById("closeSearch");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const menuSearch = document.getElementById("menuSearch");
  const noResultsMessag = document.getElementById("noResultsMessag");
  const body = document.querySelector("body");

  // Пример доступных результатов
  const availableResults = [
    "пример",
    "поиск",
    "результат",
    "категория",
    "функция",
    "данные",
  ];

  searchIcon.addEventListener("click", (event) => {
    searchBox.classList.add("active");
    searchInput.focus();
    event.stopPropagation();
  });

  closeSearch.addEventListener("click", (event) => {
    searchInput.value = "";
    searchResults.classList.remove("active");
    menuSearch.innerHTML = ""; // Убираем предыдущие результаты
    noResultsMessag.style.display = "none"; // Скрываем сообщение о отсутствии результатов
    event.stopPropagation();
  });

  body.addEventListener("click", (event) => {
    if (
      !searchBox.contains(event.target) &&
      !searchIcon.contains(event.target)
    ) {
      searchBox.classList.remove("active");
      searchResults.classList.remove("active");
    }
  });

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim();

    // Очистка предыдущих результатов и сообщения
    menuSearch.innerHTML = ""; // Очищаем предыдущие результаты
    noResultsMessag.style.display = "none"; // Скрываем сообщение о отсутствии результатов

    if (query.length > 0) {
      const filteredResults = availableResults.filter((result) =>
        result.includes(query.toLowerCase())
      );

      searchResults.classList.add("active");

      
      if (filteredResults.length > 0) {
        // Создаем элементы для каждого найденного результата
        filteredResults.forEach((result) => {
          const resultItem = document.createElement("div");
          resultItem.classList.add("menu-search_item"); // Изменяем класс на menu-search_item
          resultItem.textContent = result;
          menuSearch.appendChild(resultItem);
          console.log("блоков есть");
        });
      } else {
        // Если нет результатов, отображаем сообщение
        noResultsMessag.style.display = "grid"; // Показываем сообщение о отсутствии результатов
        console.log("блок показывается");
      }
    } 
    else {
      searchResults.classList.remove("active"); // Убираем результаты, если пустой ввод
      noResultsMessag.style.display = "none"; // Скрываем сообщение
    }
  });

  searchBox.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});




// Поиск мобилка
let searchInp = document.getElementById("searchInputm");
let searchInps = document.getElementById("searchInputs");
const burgerChk = document.getElementById("burger-checkbox");
const menu = document.querySelector(".menu-search");
let resB = document.getElementById("resInpS");
const menuSearchText = document.getElementById("menuSearchText");
let noResultsMessage = document.getElementById("noResultsMessage");

searchInp.addEventListener("click", function () {
  if (burgerChk.checked != true) {
    burgerChk.checked = true;
    searchInps.focus();
  }
});
searchInps.addEventListener("input", function () {
  menu.style.display = "flex";
  menu.style.position = "absolute";
  menu.style.zindex = "0";
  menu.style.top = "25vh";
  menu.style.left = "0px";
  menuSearchText.innerHTML = "";
  noResultsMessage.style.display = "none";

  if (searchInps.value == "") {
    menu.style.display = "none";
    resB.style.display = "none";
    noResultsMessage.style.display = "none";
  } else {
    const searchTerm = searchInps.value.toLowerCase();
    const availableResults = ["пример", "поиск", "результат"]; // Пример доступных результатов
    const filteredResults = availableResults.filter((result) =>
      result.includes(searchTerm)
    );

    if (filteredResults.length > 0) {
      filteredResults.forEach((result) => {
        const resultItem = document.createElement("div");
        resultItem.textContent = result;
        menuSearchText.appendChild(resultItem);
      });
    } else {
      noResultsMessage.style.display = "block"; // Показываем сообщение, если результатов нет
    }

    resB.style.display = "flex";
    resB.addEventListener("click", function () {
      searchInps.value = "";
      menu.style.display = "none";
      resB.style.display = "none";
      noResultsMessage.style.display = "none";
    });
  }
});
burgerChk.addEventListener("change", function () {
  menu.style.display = "none";
  searchInps.value = "";
  resB.style.display = "none";
  noResultsMessage.style.display = "none";
});
