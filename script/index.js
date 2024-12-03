
const btngray = document.querySelectorAll(".btn-gray");

btngray.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    const img = element.querySelector("img");
    if (img && !element.classList.contains("active")) {
      img.src = img.dataset.activeSrc;
      element.classList.add("active");
    }
  });

  element.addEventListener("mouseleave", () => {
    const img = element.querySelector("img");
    if (img && element.classList.contains("active")) {
      img.src = img.dataset.defaultSrc;
      element.classList.remove("active");
    }
  });
});
const heartItem = document.querySelectorAll(".heart-block");
heartItem.forEach((element) => {
  element.addEventListener("click", () => {
    const advantagesActive = document.querySelector(".heart-block.active");
    const img = element.querySelector("img");
    if (img) {
      if (element.classList.contains("active")) {
        img.src = img.dataset.defaultSrc;
        element.classList.remove("active");
      } else {
        img.src = img.dataset.activeSrc;
        element.classList.add("active");
      }
    }
  });
});

const btnBasket = document.querySelectorAll(".btn-blue-basket");
btnBasket.forEach((bottom) => {
  bottom.addEventListener("click", () => {
    const advantagesActive = document.querySelector(".btn-blue-basket.active");
    const img = bottom.querySelector("img");
    if (img) {
      if (bottom.classList.contains("active")) {
        img.src = img.dataset.defaultSrc;
        bottom.classList.remove("active");
      } else {
        img.src = img.dataset.activeSrc;
        bottom.classList.add("active");
      }
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

// слайдер
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".main-sales_items");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const items = Array.from(container.querySelectorAll(".sales_item"));
  let scrollAmount = getItemWidth();
  let isDragging = false;
  let startX;
  let scrollLeft;
  let deltaX = 0;
  function getItemWidth() {
    return items[0].offsetWidth + parseInt(getComputedStyle(container).gap);
  }
  function updateButtonState() {
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    prevButton.disabled = scrollLeft <= 0;
    nextButton.disabled = scrollLeft + clientWidth >= scrollWidth - 8;
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
  function scrollToSlide(index) {
    const scrollPosition = Math.max(
      0,
      Math.min(
        index * scrollAmount,
        container.scrollWidth - container.clientWidth
      )
    );
    container.scrollTo({ left: scrollPosition, behavior: "smooth" });
    setTimeout(updateButtonState, 300);
  }
  // Режим кнопок для прокрутки (экран больше 440px)
  function enableButtonMode() {
    prevButton.style.display = "block";
    nextButton.style.display = "block";
    prevButton.addEventListener("click", handlePrevClick);
    nextButton.addEventListener("click", handleNextClick);
    container.removeEventListener("mousedown", handleMouseDown);
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseup", handleMouseUp);
    container.removeEventListener("touchstart", handleTouchStart);
    container.removeEventListener("touchmove", handleTouchMove);
    container.removeEventListener("touchend", handleTouchEnd);
  }
  // Режим прокрутки пальцем/мышью (экран меньше или равен 440px)
  function enableScrollMode() {
    prevButton.style.display = "none";
    nextButton.style.display = "none";
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", handleTouchEnd);
  }
  function handlePrevClick() {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    setTimeout(updateButtonState, 300);
  }
  function handleNextClick() {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    setTimeout(updateButtonState, 300);
  }
  function handleMouseDown(e) {
    isDragging = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    container.classList.add("active");
  }
  function handleMouseMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    deltaX = x - startX;
    container.scrollLeft = scrollLeft - deltaX;
  }
  function handleMouseUp() {
    isDragging = false;
    container.classList.remove("active");
    const movedBy = Math.abs(deltaX);
    if (movedBy > scrollAmount / 4) {
      if (deltaX < 0) {
        scrollToSlide(currentIndex + 1);
      } else {
        scrollToSlide(currentIndex - 1);
      }
    } else {
      scrollToSlide(currentIndex);
    }
  }
  function handleTouchStart(e) {
    startX = e.touches[0].clientX;
    scrollLeft = container.scrollLeft;
  }
  function handleTouchMove(e) {
    const x = e.touches[0].clientX;
    deltaX = x - startX;
    container.scrollLeft = scrollLeft - deltaX;
  }
  function handleTouchEnd() {
    const movedBy = Math.abs(deltaX);
    if (movedBy > scrollAmount / 4 && innerWidth <= 48 * 16) {
      if (deltaX < 0) {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  }
  function isMobile() {
    return window.innerWidth <= 48 * 16;
  }
  function updateMode() {
    if (isMobile()) {
      enableScrollMode();
      container.style.cursor = "grab";
    } else {
      enableButtonMode();
      container.style.cursor = "default";
    }
  }
  window.addEventListener("resize", () => {
    scrollAmount = getItemWidth();
    updateMode();
    updateButtonState();
  });
  // Инициализация при загрузке страницы
  scrollAmount = getItemWidth();
  requestAnimationFrame(() => {
    updateMode();
    updateButtonState();
    showItemsInView();
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
  let startX = 0;
  let scrollLeft = 0;
  let isDragging = false;

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
  NextBtn.addEventListener("click", function () {
    if (currentSlide == totalSlides - 2) {
      NextBtn.style.opacity = "0.5";
    }
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
    if (window.innerWidth <= 48 * 16) {
      PrevBtn.style.display = "none";
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

  //исчезновение кнопки назад
  if (currentSlide == 0) {
    PrevBtn.style.display = "none";
  } else {
    PrevBtn.style.display = "flex";
  }
  //прозрачность кнопки вперед
  if (currentSlide == totalSlides - 2) {
    NextBtn.style.opacity = "0.5";
  }
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

document.addEventListener("DOMContentLoaded", function () {
  const swiperContainer = document.querySelector(".swiper-container");
  const progressBar = document.querySelector(".progress-indicators");
  let swiper;

  function initializeSwiper() {
    if (window.innerWidth <= 48 * 16) {
      if (!swiper) {
        swiper = new Swiper(".swiper-container", {
          slidesPerView: "auto",
          spaceBetween: 16,
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

