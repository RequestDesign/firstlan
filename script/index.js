document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.getElementById("searchIcon");
  const searchBox = document.getElementById("searchBox");
  const closeSearch = document.getElementById("closeSearch");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const body = document.querySelector("body");

  searchIcon.addEventListener("click", (event) => {
    searchBox.classList.add("active");
    searchInput.focus();
    event.stopPropagation();
  });

  closeSearch.addEventListener("click", (event) => {
    searchInput.value = "";
    searchResults.classList.remove("active");
    ("<p>К сожалению, по вашему запросу ничего не найдено</p>");
    searchInput.focus();
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

    if (query.length > 0) {
      searchResults.classList.add("active");
      searchResults.innerHTML = `<p>Результаты поиска по запросу "${query}"</p>`;
    } else {
      searchResults.innerHTML =
        "<p>К сожалению, по вашему запросу ничего не найдено</p>";
    }
  });
  searchBox.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});
document.querySelectorAll(".heart").forEach(function (element) {
  element.addEventListener("click", function () {
    this.classList.toggle("active");
  });
});
document.querySelectorAll(".btn-blue-basket").forEach(function (button) {
  button.addEventListener("click", function () {
    this.classList.toggle("active");
  });
});

// слайдер
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".main-sales_items");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const items = Array.from(container.querySelectorAll(".sales_item"));
  

  function getItemWidth() {
    return items[0].offsetWidth + parseInt(getComputedStyle(container).gap);
  }
  let scrollAmount = getItemWidth();

  function updateButtonState() {
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    prevButton.disabled = scrollLeft === 0;
    nextButton.disabled = scrollLeft + clientWidth >= scrollWidth - 2.4;
  }

  function showItemsInView() {
    const containerRect = container.getBoundingClientRect();
    items.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const isInView =
        itemRect.left < containerRect.right &&
        itemRect.right > containerRect.left;
      if (isInView) {
        item.classList.add("show");
      } else {
        item.classList.remove("show");
      }
    });
  }
  
  prevButton.addEventListener("click", () => {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    setTimeout(updateButtonState, 300);
  });

  nextButton.addEventListener("click", () => {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    setTimeout(updateButtonState, 300);
  });

  container.addEventListener("scroll", () => {
    updateButtonState();
    showItemsInView();
  });

  window.addEventListener("resize", () => {
    scrollAmount = getItemWidth();
    updateButtonState();
  });

  updateButtonState();
  showItemsInView();
  
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
            activeImg.src = activeImg.dataset.defaultSrc; // Возвращаем исходное изображение
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

document.addEventListener("DOMContentLoaded", function () {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const slideNumber = document.querySelector(".slide-number");
  const arrowUp = document.querySelector(".arrow.up");
  const arrowDown = document.querySelector(".arrow.down");
  const slider = document.querySelector(".slider");
  const totalSlides = slides.length;
  const NextBtn = document.querySelector(".nextBtn");
  const PrevBtn = document.querySelector(".prevBtn");

  // Полоса прогресса
  const progressIndicator = document.querySelector(".progress-indicator");

  // Переменные для скроллинга мышью/пальцем
  let startX = 0;
  let scrollLeft = 0;
  let isDragging = false;

  // Обновление слайдов
  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.remove("active");
      if (index === currentSlide) {
        slide.classList.add("active");
      }
    });
    slideNumber.textContent = (currentSlide + 1).toString().padStart(3, "0");
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateSlideVisibility();
    updateProgressBar();
  }

  function updateSlideVisibility() {
    slides.forEach((slide, index) => {
      const slideTextElements = slide.querySelectorAll(
        ".slide-text, .slide_signature, .slide_title, .slide_title-small, .slide-social"
      );
      if (index === currentSlide) {
        slideTextElements.forEach((element) => {
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        });
      } else {
        slideTextElements.forEach((element) => {
          element.style.opacity = "0";
          element.style.transform = "translateY(20px)";
        });
      }
    });
  }

  function updateProgressBar() {
    const progressWidth = (100 / (totalSlides - 1)) * (currentSlide + 1);
    progressIndicator.style.width = `${progressWidth}%`;
  }

  arrowDown.addEventListener("click", function () {
    if (currentSlide > 0) {
      currentSlide--;
    } else {
      currentSlide = totalSlides - 2;
    }
    updateSlides();
    localStorage.setItem("currentSlide", currentSlide);
  });

  arrowUp.addEventListener("click", function () {
    if (currentSlide < totalSlides - 2) {
      currentSlide++;
    } else {
      currentSlide = 0;
    }
    updateSlides();
    localStorage.setItem("currentSlide", currentSlide);
  });

  PrevBtn.addEventListener("click", function () {
    if (currentSlide > 0) {
      currentSlide--;
      NextBtn.style.opacity = "1";
    }
    updateSlides();
    localStorage.setItem("currentSlide", currentSlide);
  });

  NextBtn.addEventListener("click", function () {
    if (currentSlide < totalSlides - 2) {
      currentSlide++;
      PrevBtn.style.display = "flex";
    } else {
      currentSlide = totalSlides - 2;
    }
    updateSlides();
    localStorage.setItem("currentSlide", currentSlide);
  });

  // Скрытие кнопки назад при необходимости
  PrevBtn.addEventListener("click", function () {
    if (currentSlide == 0) {
      PrevBtn.style.display = "none";
    } else {
      PrevBtn.style.display = "flex";
    }
  });

  // Логика скроллинга мышью или пальцем (для мобильных устройств)
  function enableSwipe() {
    slider.addEventListener("mousedown", startDrag);
    slider.addEventListener("touchstart", startDrag);

    slider.addEventListener("mousemove", drag);
    slider.addEventListener("touchmove", drag);

    slider.addEventListener("mouseup", stopDrag);
    slider.addEventListener("mouseleave", stopDrag);
    slider.addEventListener("touchend", stopDrag);
  }

  function startDrag(e) {
    isDragging = true;
    startX = e.pageX || e.touches[0].pageX;
    scrollLeft = currentSlide * slider.offsetWidth;
  }

  function drag(e) {
    if (!isDragging) return;
    const x = e.pageX || e.touches[0].pageX;
    const walk = (x - startX) / slider.offsetWidth;
    currentSlide = Math.round(scrollLeft / slider.offsetWidth - walk);
    if (currentSlide < 0) currentSlide = 0;
    if (currentSlide >= totalSlides - 2) currentSlide = totalSlides - 2;
    updateSlides();
  }

  function stopDrag() {
    isDragging = false;
    localStorage.setItem("currentSlide", currentSlide);
  }

  // Включение скроллинга только на мобильных устройствах
  function toggleSwipeBehavior() {
    if (window.innerWidth <= 420) {
      enableSwipe();
    } else {
      slider.removeEventListener("mousedown", startDrag);
      slider.removeEventListener("touchstart", startDrag);
      slider.removeEventListener("mousemove", drag);
      slider.removeEventListener("touchmove", drag);
      slider.removeEventListener("mouseup", stopDrag);
      slider.removeEventListener("mouseleave", stopDrag);
      slider.removeEventListener("touchend", stopDrag);
    }
  }

  const savedSlide = localStorage.getItem("currentSlide");
  if (savedSlide !== null) {
    currentSlide = parseInt(savedSlide);
  }

  updateSlides();

  toggleSwipeBehavior();

  window.addEventListener("resize", toggleSwipeBehavior);

  window.addEventListener("scroll", function () {
    slides.forEach((slide, index) => {
      const slideRect = slide.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (slideRect.top < windowHeight && slideRect.bottom >= 0) {
        if (index === currentSlide) {
          const slideTextElements = slide.querySelectorAll(
            ".slide-text, .slide_signature, .slide_title, .slide_title-small, .slide-social"
          );
          slideTextElements.forEach((element) => {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
          });
        }
      } else {
        if (index === currentSlide) {
          const slideTextElements = slide.querySelectorAll(
            ".slide-text, .slide_signature, .slide_title, .slide_title-small, .slide-social"
          );
          slideTextElements.forEach((element) => {
            element.style.opacity = "0";
            element.style.transform = "translateY(20px)";
          });
        }
      }
    });
  });
});

document.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  const logo = document.querySelector(".logo_white");
  const search = document.querySelector(".search");
  const heart = document.querySelector(".heart-icon");
  const shopping = document.querySelector(".shopping");
  const scrollPosition = window.scrollY;

  if (scrollPosition > 10) {
    header.classList.add("header-scrolled");
    search.src = "image/header/search_black.png";
    heart.src = "image/header/heart_black.png";
    shopping.src = "image/header/shopping_black.png";
    if (logo) {
      logo.src = "image/footer/FL_logo.png";
      console.log("Logo updated to new image.");
    }
  } else {
    header.classList.remove("header-scrolled");
    search.src = "image/header/24.png";
    heart.src = "image/header/heart.png";
    shopping.src = "image/header/shopping.png";
    if (logo) {
      logo.src = "image/header/FL_logowhite.png";
      console.log("Logo reverted to original image.");
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const swiperContainer = document.querySelector(".swiper-container");
  const progressBar = document.querySelector(".progress-indicators");
  let swiper;

  function initializeSwiper() {
    if (window.innerWidth <= 420) {
      if (!swiper) {
        swiper = new Swiper(".swiper-container", {
          slidesPerView: 1,
          spaceBetween: 0,
          slidesPerGroup: 1,
          loop: false,
          speed: 300,
          pagination: {
            el: ".swiper-pagination",
            type: "progressbar",
          },
          navigation: {
            nextEl: null,
            prevEl: null,
          },
          on: {
            slideChange: updateProgressBar,
            init: updateProgressBar,
          },
        });
      }
    } else {
      if (swiper) {
        swiper.destroy();
        swiper = null;
      }
      swiperContainer.style.overflow = "hidden";
    }
  }

  function updateProgressBar() {
    if (swiper && swiper.slides) {
      const totalSlides = swiper.slides.length;
      const currentSlide = swiper.activeIndex + 1;

      const progress = ((currentSlide - 1) / (totalSlides - 1)) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }

  initializeSwiper();

  window.addEventListener("resize", function () {
    initializeSwiper();
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   const smallButton = document.getElementById("smallButton");
//   const photoContainer = document.getElementById("photoContainer");

//   // Обработчик клика по маленькой кнопке (изображению)
//   smallButton.addEventListener("click", () => {
//     // Показать или скрыть контейнер с фотографиями
//     photoContainer.style.display =
//       photoContainer.style.display === "block" ? "none" : "block";
//   });
// });
