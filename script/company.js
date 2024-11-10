document.addEventListener("DOMContentLoaded", function () {
  const swiperContainers = document.querySelectorAll(".swiper-container");
  const progressBars = document.querySelectorAll(".progress-indicators");
  let swipers = [];

  function initializeSwipers() {
    swiperContainers.forEach((swiperContainer, index) => {
      let swiper = swipers[index];

      if (window.innerWidth <= 48 * 16) {
        if (!swiper) {
          swiper = new Swiper(swiperContainer, {
            slidesPerView: 'auto',
            spaceBetween: 8,
            slidesPerGroup: 1,
            loop: false,
            speed: 300,
            pagination: {
              el: swiperContainer.querySelector(".swiper-pagination"),
              type: "progressbar",
            },
            navigation: {
              nextEl: null,
              prevEl: null,
            },
            on: {
              slideChange: () => updateProgressBar(swiper, progressBars[index]),
              init: () => updateProgressBar(swiper, progressBars[index]),
            },
          });
          swipers[index] = swiper;
        }
      } else {
        if (swiper) {
          swiper.destroy();
          swipers[index] = null;
        }
        swiperContainer.style.overflow = "hidden";
      }
    });
  }

  function updateProgressBar(swiper, progressBar) {
    if (swiper && swiper.slides) {
      const totalSlides = swiper.slides.length;
      const currentSlide = swiper.activeIndex + 1;

      const progress = ((currentSlide - 1) / (totalSlides - 1)) * 100;
      progressBar.style.width = '${progress}%';
    }
  }

  // Инициализация слайдеров
  initializeSwipers();

  // Обработка события изменения размера окна
  window.addEventListener("resize", function () {
    initializeSwipers();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const smallButton = document.getElementById("smallButton");
  const photoContainer = document.getElementById("photoContainer");

  // Обработчик клика по маленькой кнопке (изображению)
  smallButton.addEventListener("click", () => {
    // Показать или скрыть контейнер с фотографиями
    photoContainer.style.display =
      photoContainer.style.display === "grid" ? "none" : "grid";
  });
});
const clientItems = document.querySelectorAll(".main-client_item");
clientItems.forEach((item) => {
  item.addEventListener("click", () => {
    const activeItem = document.querySelector(".main-client_item.active");

    if (item.classList.contains("active")) {
      item.classList.remove("active");
    } else {
      if (activeItem) {
        activeItem.classList.remove("active");
      }
      item.classList.add("active");
    }
  });
});

const advantagesItems = document.querySelectorAll(".main-advantages_item");
advantagesItems.forEach((item) => {
  item.addEventListener("click", () => {
    const advantagesActive = document.querySelector(
      ".main-advantages_item.active"
    );
    const img = item.querySelector("img");
    if (img) {
      if (item.classList.contains("active")) {
        // Если блок уже активен, можно сбросить изображение
        img.src = img.dataset.defaultSrc;
        item.classList.remove("active");
      } else {
        // Если блок неактивен, сбрасываем предыдущий активный блок
        if (advantagesActive) {
          const activeImg = advantagesActive.querySelector("img");
          if (activeImg) {
            activeImg.src = activeImg.dataset.defaultSrc;
          }
          advantagesActive.classList.remove("active");
        }
        // Устанавливаем новое изображение
        img.src = img.dataset.activeSrc;
        item.classList.add("active");
      }
    }
  });
});
``;

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
    noResultsMessage.style.display = "none"; // Скрыть сообщение
  } else {
    // Здесь должна быть логика проверки результатов поиска
    // Пример: если введенное значение не соответствует никаким результатам
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
      noResultsMessage.style.display = "none"; // Скрыть сообщение
    });
  }
});
burgerChk.addEventListener("change", function () {
  menu.style.display = "none";
  searchInps.value = "";
  resB.style.display = "none";
  noResultsMessage.style.display = "none";
});
